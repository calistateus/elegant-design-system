'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { ElegantSearch } from '../forms/ElegantSearch';
import { ElegantCheckbox, CheckboxState } from '../forms/ElegantCheckbox';
import { ElegantRadio } from '../forms/ElegantRadio';
import { ToastProvider, useToast } from '../communications/ElegantToast';

// ─── Types ────────────────────────────────────────────────────

export interface ElegantDataTableProps {
  /** Max number of data rows (not counting header). Default: 10 */
  rows?: number;
  /** Max number of columns. Default: 5 */
  columns?: number;
  /** Alternate row background colours. Default: false */
  zebraStriping?: boolean;
  /** Enable ascending/descending column sort on header click. Default: false */
  columnSort?: boolean;
  /** Show a search bar that filters visible rows. Default: false */
  tableSearch?: boolean;
  /** Enable single-row selection via radio button. Default: false */
  rowSelect?: boolean;
  /** Enable multi-row selection via checkboxes. Takes precedence over rowSelect. Default: false */
  rowMultiSelect?: boolean;
  /** Pre-seed the table with data (e.g. for demos). Trimmed to rows × columns capacity. */
  initialData?: { headers: string[]; rows: string[][] };
}

type SortDir = 'asc' | 'desc' | null;

interface TableData {
  headers: string[];
  rows: string[][];
}

// ─── Helpers ──────────────────────────────────────────────────

/** Minimal RFC-4180 CSV line parser — handles double-quoted fields. */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

// ─── Sort icon ────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  const color = active ? 'var(--color-text-body)' : 'var(--color-text-muted)';
  if (active && dir === 'asc') return <ChevronUp size={12} strokeWidth={2} style={{ color, flexShrink: 0 }} />;
  if (active && dir === 'desc') return <ChevronDown size={12} strokeWidth={2} style={{ color, flexShrink: 0 }} />;
  return <ChevronsUpDown size={12} strokeWidth={1.5} style={{ color, flexShrink: 0 }} />;
}

// ─── Inner component (requires ToastProvider in tree) ─────────

function ElegantDataTableInner({
  rows: maxRows = 10,
  columns: maxCols = 5,
  zebraStriping = false,
  columnSort = false,
  tableSearch = false,
  rowSelect = false,
  rowMultiSelect = false,
  initialData,
}: ElegantDataTableProps) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  function makeEmpty(): TableData {
    if (initialData) {
      const headers = initialData.headers.slice(0, maxCols);
      const paddedHeaders = [...headers];
      while (paddedHeaders.length < maxCols) paddedHeaders.push(`Column ${paddedHeaders.length + 1}`);

      const dataRows = initialData.rows.slice(0, maxRows).map((row) => {
        const cells = row.slice(0, maxCols);
        while (cells.length < maxCols) cells.push('');
        return cells;
      });
      while (dataRows.length < maxRows) dataRows.push(Array<string>(maxCols).fill(''));

      return { headers: paddedHeaders, rows: dataRows };
    }
    return {
      headers: Array.from({ length: maxCols }, (_, i) => `Column ${i + 1}`),
      rows: Array.from({ length: maxRows }, () => Array<string>(maxCols).fill('')),
    };
  }

  const [tableData, setTableData] = useState<TableData>(makeEmpty);
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // ─── File upload ────────────────────────────────────────────

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      e.target.value = '';

      const ext = file.name.split('.').pop()?.toLowerCase();
      const reader = new FileReader();

      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        let headers: string[] = [];
        let dataRows: string[][] = [];

        try {
          if (ext === 'json') {
            const parsed: unknown = JSON.parse(text);
            if (!Array.isArray(parsed)) {
              toast('JSON must be an array of objects.', 'error');
              return;
            }
            const allKeys = Array.from(
              new Set(
                (parsed as Record<string, unknown>[]).flatMap((obj) => Object.keys(obj))
              )
            );
            headers = allKeys;
            dataRows = (parsed as Record<string, unknown>[]).map((obj) =>
              allKeys.map((k) => String(obj[k] ?? ''))
            );
          } else if (ext === 'csv') {
            const lines = text.trim().split(/\r?\n/);
            if (lines.length === 0) {
              toast('CSV file is empty.', 'error');
              return;
            }
            headers = parseCSVLine(lines[0]);
            dataRows = lines
              .slice(1)
              .filter((l) => l.trim())
              .map(parseCSVLine);
          } else {
            toast('Unsupported file type. Upload a .json or .csv file.', 'error');
            return;
          }
        } catch {
          toast('Failed to parse file. Check the format and try again.', 'error');
          return;
        }

        const tooManyRows = dataRows.length > maxRows;
        const tooManyCols = headers.length > maxCols;

        if (tooManyRows || tooManyCols) {
          const parts: string[] = [];
          if (tooManyRows) parts.push(`${dataRows.length} rows (max ${maxRows})`);
          if (tooManyCols) parts.push(`${headers.length} columns (max ${maxCols})`);
          toast(
            `Data exceeds table capacity — ${parts.join(', ')}. Showing available space only.`,
            'error'
          );
        }

        // Trim to capacity
        const trimmedHeaders = headers.slice(0, maxCols);
        const trimmedRows = dataRows.slice(0, maxRows).map((row) => {
          const cells = row.slice(0, maxCols);
          while (cells.length < maxCols) cells.push('');
          return cells;
        });

        // Pad to full dimensions with empty rows
        while (trimmedRows.length < maxRows) {
          trimmedRows.push(Array<string>(maxCols).fill(''));
        }

        // Pad headers if data had fewer columns than capacity
        const paddedHeaders = [...trimmedHeaders];
        while (paddedHeaders.length < maxCols) {
          paddedHeaders.push(`Column ${paddedHeaders.length + 1}`);
        }

        setTableData({ headers: paddedHeaders, rows: trimmedRows });
        setSelectedRow(null);
        setSelectedRows(new Set());
        setSortCol(null);
        setSortDir(null);
        setSearchQuery('');
      };

      reader.readAsText(file);
    },
    [maxRows, maxCols, toast]
  );

  // ─── Column sort ─────────────────────────────────────────────

  function handleColumnSort(colIdx: number) {
    if (sortCol === colIdx) {
      if (sortDir === 'asc') {
        setSortDir('desc');
      } else {
        // desc → clear
        setSortCol(null);
        setSortDir(null);
      }
    } else {
      setSortCol(colIdx);
      setSortDir('asc');
    }
  }

  // ─── Derived display rows ─────────────────────────────────────

  // Attach stable original indices so selection tracks through sort/filter
  let indexed = tableData.rows.map((cells, origIdx) => ({ origIdx, cells }));

  // Sort: non-empty rows float up, empty rows pin to bottom
  if (sortCol !== null && sortDir !== null) {
    const nonEmpty = indexed.filter(({ cells }) => cells.some((c) => c !== ''));
    const empty = indexed.filter(({ cells }) => cells.every((c) => c === ''));
    nonEmpty.sort((a, b) => {
      const av = a.cells[sortCol] ?? '';
      const bv = b.cells[sortCol] ?? '';
      const cmp = av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' });
      return sortDir === 'asc' ? cmp : -cmp;
    });
    indexed = [...nonEmpty, ...empty];
  }

  // Filter by search query (hides non-matching AND empty rows)
  const displayed =
    searchQuery.trim()
      ? indexed.filter(({ cells }) =>
          cells.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : indexed;

  // ─── Select-all state (multi-select only) ────────────────────

  const selectableRows = displayed.filter(({ cells }) => cells.some((c) => c !== ''));
  const selectedVisibleCount = selectableRows.filter(({ origIdx }) =>
    selectedRows.has(origIdx)
  ).length;

  let headerCheckState: CheckboxState = 'unselected';
  if (selectableRows.length > 0 && selectedVisibleCount === selectableRows.length) {
    headerCheckState = 'selected';
  } else if (selectedVisibleCount > 0) {
    headerCheckState = 'indeterminate';
  }

  function toggleSelectAll() {
    if (headerCheckState === 'selected') {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(selectableRows.map(({ origIdx }) => origIdx)));
    }
  }

  const hasSelection = rowSelect || rowMultiSelect;

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div style={{ width: '100%' }}>

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 'var(--primitive-scale-3)',
          marginBottom: 'var(--primitive-scale-3)',
          flexWrap: 'wrap',
        }}
      >
        {tableSearch ? (
          <div style={{ flex: '1 1 240px', maxWidth: '320px' }}>
            <ElegantSearch
              value={searchQuery}
              onChange={setSearchQuery}
              showLabel={false}
              showDescription={false}
              placeholder="Search table…"
            />
          </div>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--primitive-scale-2)',
            padding: 'var(--size-btn-py-sm) var(--size-btn-px-sm)',
            backgroundColor: 'var(--color-interactive-primary-bg)',
            color: 'var(--color-interactive-primary-fg)',
            border: 'none',
            borderRadius: 'var(--size-btn-radius)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'var(--motion-btn-primary)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
        >
          <Upload size={14} strokeWidth={1.5} />
          Upload file
        </button>

        <input
          ref={fileRef}
          type="file"
          accept=".json,.csv"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>

      {/* Table */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--size-card-radius)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--primitive-font-size-sm)',
          }}
        >
          {/* Header */}
          <thead>
            <tr
              style={{
                borderBottom: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg-surface)',
              }}
            >
              {hasSelection && (
                <th
                  scope="col"
                  style={{
                    width: '2.5rem',
                    padding: 'var(--primitive-scale-3)',
                    verticalAlign: 'middle',
                    borderRight: '1px solid var(--color-border-subtle)',
                  }}
                >
                  {rowMultiSelect && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <ElegantCheckbox
                        label=""
                        checkboxState={headerCheckState}
                        onChange={toggleSelectAll}
                      />
                    </div>
                  )}
                </th>
              )}

              {tableData.headers.map((header, colIdx) => (
                <th
                  key={colIdx}
                  scope="col"
                  onClick={columnSort ? () => handleColumnSort(colIdx) : undefined}
                  style={{
                    padding: 'var(--primitive-scale-3) var(--primitive-scale-4)',
                    textAlign: 'left',
                    fontWeight: 'var(--primitive-font-weight-medium)',
                    color: 'var(--color-text-title)',
                    cursor: columnSort ? 'pointer' : 'default',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'middle',
                  }}
                  onMouseEnter={(e) => {
                    if (columnSort)
                      (e.currentTarget as HTMLTableCellElement).style.backgroundColor =
                        'var(--primitive-gray-100)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableCellElement).style.backgroundColor =
                      'var(--color-bg-surface)';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--primitive-scale-1)',
                    }}
                  >
                    <span>{header}</span>
                    {columnSort && (
                      <SortIcon
                        active={sortCol === colIdx}
                        dir={sortCol === colIdx ? sortDir : null}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {displayed.length === 0 ? (
              <tr>
                <td
                  colSpan={tableData.headers.length + (hasSelection ? 1 : 0)}
                  style={{
                    padding: 'var(--primitive-scale-8)',
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--primitive-font-size-sm)',
                  }}
                >
                  No results found.
                </td>
              </tr>
            ) : (
              displayed.map(({ origIdx, cells }, rowIdx) => {
                const isSelected = rowMultiSelect
                  ? selectedRows.has(origIdx)
                  : selectedRow === origIdx;
                const isEven = zebraStriping && rowIdx % 2 === 1;
                const isEmpty = cells.every((c) => c === '');

                const baseBg = isSelected
                  ? 'color-mix(in srgb, var(--primitive-green-500) 6%, var(--color-bg-main))'
                  : isEven
                  ? 'var(--color-bg-surface)'
                  : 'var(--color-bg-main)';

                return (
                  <tr
                    key={origIdx}
                    onClick={
                      hasSelection && !isEmpty
                        ? () => {
                            if (rowMultiSelect) {
                              setSelectedRows((prev) => {
                                const next = new Set(prev);
                                if (next.has(origIdx)) next.delete(origIdx);
                                else next.add(origIdx);
                                return next;
                              });
                            } else {
                              setSelectedRow(selectedRow === origIdx ? null : origIdx);
                            }
                          }
                        : undefined
                    }
                    style={{
                      borderBottom: '1px solid var(--color-border-subtle)',
                      backgroundColor: baseBg,
                      cursor: hasSelection && !isEmpty ? 'pointer' : 'default',
                      transition: `background-color var(--primitive-duration-instant) ease`,
                    }}
                    onMouseEnter={(e) => {
                      if (isEmpty) return;
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor = isSelected
                        ? 'color-mix(in srgb, var(--primitive-green-500) 10%, var(--color-bg-main))'
                        : isEven
                        ? 'var(--primitive-gray-100)'
                        : 'var(--color-bg-surface)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor = baseBg;
                    }}
                  >
                    {/* Selection cell — stopPropagation prevents double-toggle with row onClick */}
                    {hasSelection && (
                      <td
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          padding: 'var(--primitive-scale-3)',
                          verticalAlign: 'middle',
                          width: '2.5rem',
                          borderRight: '1px solid var(--color-border-subtle)',
                        }}
                      >
                        {!isEmpty && (
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {rowMultiSelect ? (
                              <ElegantCheckbox
                                label=""
                                checkboxState={
                                  selectedRows.has(origIdx) ? 'selected' : 'unselected'
                                }
                                onChange={() => {
                                  setSelectedRows((prev) => {
                                    const next = new Set(prev);
                                    if (next.has(origIdx)) next.delete(origIdx);
                                    else next.add(origIdx);
                                    return next;
                                  });
                                }}
                              />
                            ) : (
                              <ElegantRadio
                                label=""
                                radioState={
                                  selectedRow === origIdx ? 'selected' : 'unselected'
                                }
                                onClick={() =>
                                  setSelectedRow(selectedRow === origIdx ? null : origIdx)
                                }
                              />
                            )}
                          </div>
                        )}
                      </td>
                    )}

                    {/* Data cells */}
                    {cells.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        style={{
                          padding: 'var(--primitive-scale-3) var(--primitive-scale-4)',
                          color: cell ? 'var(--color-text-body)' : 'var(--color-text-muted)',
                          verticalAlign: 'middle',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '200px',
                        }}
                      >
                        {cell || '—'}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'var(--primitive-scale-2)',
          fontSize: 'var(--primitive-font-size-xs)',
          color: 'var(--color-text-muted)',
        }}
      >
        <span>
          {(() => {
            const count = displayed.filter(({ cells }) => cells.some((c) => c !== '')).length;
            return `${count} row${count !== 1 ? 's' : ''}${searchQuery.trim() ? ` matching "${searchQuery}"` : ''}`;
          })()}
        </span>

        {hasSelection && (
          <span>
            {rowMultiSelect
              ? `${selectedRows.size} selected`
              : selectedRow !== null
              ? '1 selected'
              : 'None selected'}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Public export — self-contained with ToastProvider ────────

export function ElegantDataTable(props: ElegantDataTableProps) {
  return (
    <ToastProvider>
      <ElegantDataTableInner {...props} />
    </ToastProvider>
  );
}
