'use client';

import { useRef, useState, useCallback, DragEvent, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { ElegantChip } from '@/components/simple/ElegantChip';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export type FileUploadVariant = 'button' | 'dropzone';

export type ChipLayout = 'stacked' | 'horizontal';

export interface ElegantFileUploadProps {
  variant?: FileUploadVariant;
  /** Maximum number of files the user may select in total. */
  maxFiles?: number;
  /**
   * Allowed file extensions including the dot, e.g. ['.pdf', '.png'].
   * If empty or omitted every file type is accepted.
   */
  allowedTypes?: string[];
  label?: string;
  showLabel?: boolean;
  description?: string;
  showDescription?: boolean;
  /** Button variant only. 'stacked' places chips inline; 'horizontal' places them below. */
  chipLayout?: ChipLayout;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
}

function getExtension(filename: string): string {
  const idx = filename.lastIndexOf('.');
  return idx === -1 ? '' : filename.slice(idx).toLowerCase();
}

export function ElegantFileUpload({
  variant = 'button',
  maxFiles = 5,
  allowedTypes = [],
  label,
  showLabel = true,
  description,
  showDescription = true,
  chipLayout = 'stacked',
  disabled = false,
  onFilesChange,
}: ElegantFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  /* ── helpers ─────────────────────────────────────── */

  const MAX_FILES_HARD_LIMIT = 20;
  const effectiveMaxFiles = Math.min(maxFiles, MAX_FILES_HARD_LIMIT);
  const hasTypeFilter = allowedTypes.length > 0;

  /** Returns an error string or null if the file is acceptable. */
  function validate(file: File, currentCount: number): string | null {
    if (hasTypeFilter) {
      const ext = getExtension(file.name);
      if (!allowedTypes.map((t) => t.toLowerCase()).includes(ext)) {
        return `${ext || 'This file type'} is not allowed. Accepted: ${allowedTypes.join(', ')}`;
      }
    }
    if (currentCount >= effectiveMaxFiles) {
      return `Maximum ${effectiveMaxFiles} file${effectiveMaxFiles === 1 ? '' : 's'} allowed.`;
    }
    return null;
  }

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      let nextFiles = [...files];
      let firstError: string | null = null;

      for (const file of list) {
        const err = validate(file, nextFiles.length);
        if (err) {
          firstError = err;
          break;
        }
        nextFiles = [...nextFiles, file];
      }

      setFiles(nextFiles);
      setError(firstError);
      onFilesChange?.(nextFiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files, effectiveMaxFiles, allowedTypes, onFilesChange],
  );

  const removeFile = useCallback(
    (index: number) => {
      const next = files.filter((_, i) => i !== index);
      setFiles(next);
      setError(null);
      onFilesChange?.(next);
    },
    [files, onFilesChange],
  );

  /* ── native input change ─────────────────────────── */

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(e.target.files);
    // reset so the same file can be re-picked after removal
    e.target.value = '';
  }

  /* ── drag handlers (dropzone only) ──────────────── */

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  }

  /* ── accept attribute ────────────────────────────── */

  const acceptAttr = hasTypeFilter ? allowedTypes.join(',') : undefined;

  /* ── shared: hidden input + chip strip ──────────── */

  const hiddenInput = (
    <input
      ref={inputRef}
      type="file"
      multiple={effectiveMaxFiles > 1}
      accept={acceptAttr}
      disabled={disabled}
      style={{ display: 'none' }}
      onChange={handleInputChange}
      aria-hidden="true"
      tabIndex={-1}
    />
  );

  const liveAnnouncement = (
    <span
      aria-live="polite"
      aria-atomic="true"
      style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
    >
      {files.length === 0 ? '' : `${files.length} file${files.length === 1 ? '' : 's'} selected`}
    </span>
  );

  const chipStrip = files.length > 0 && (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--size-fileupload-chip-gap)',
        marginTop: 'var(--size-fileupload-chip-gap)',
      }}
    >
      {files.map((file, i) => (
        <ElegantChip
          key={`${file.name}-${i}`}
          label={file.name}
          color="neutral"
          onDismiss={() => removeFile(i)}
        />
      ))}
    </div>
  );

  const errorRow = error && (
    <div style={{ marginTop: 'var(--size-chip-gap)' }}>
      <ElegantErrorMessage message={error} />
    </div>
  );

  /* ── label + description block ───────────────────── */

  const headerBlock = ((label && showLabel) || (description && showDescription)) && (
    <div style={{ marginBottom: 'var(--size-form-group-gap)' }}>
      {label && showLabel && (
        <p
          style={{
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-body)',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </p>
      )}
      {description && showDescription && (
        <p
          style={{
            fontSize: 'var(--primitive-font-size-xs)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            color: 'var(--color-text-muted)',
            margin: 0,
            marginTop: label && showLabel ? 'var(--size-label-to-description)' : 0,
            letterSpacing: '-0.01em',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );

  /* ─────────────────────────────────────────────────
     BUTTON VARIANT
  ───────────────────────────────────────────────── */

  if (variant === 'button') {
    const uploadBtn = (
      <button
        type="button"
        disabled={disabled}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : () => inputRef.current?.click()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--size-btn-icon-gap-sm)',
          padding: 'var(--size-btn-py-sm) var(--size-btn-px-sm)',
          backgroundColor: 'var(--color-interactive-primary-bg)',
          color: 'var(--color-interactive-primary-fg)',
          border: '1px solid var(--color-interactive-primary-bg)',
          borderRadius: 'var(--size-btn-radius)',
          fontSize: 'var(--primitive-font-size-xs)',
          fontWeight: 'var(--primitive-font-weight-regular)',
          letterSpacing: '-0.01em',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 'var(--opacity-disabled)' : 1,
          flexShrink: 0,
          transition: 'background-color 150ms ease, color 150ms ease',
        }}
        onMouseEnter={(e) => {
          if (disabled) return;
          e.currentTarget.style.backgroundColor = 'var(--color-bg-main)';
          e.currentTarget.style.color = 'var(--color-interactive-primary-bg)';
        }}
        onMouseLeave={(e) => {
          if (disabled) return;
          e.currentTarget.style.backgroundColor = 'var(--color-interactive-primary-bg)';
          e.currentTarget.style.color = 'var(--color-interactive-primary-fg)';
        }}
      >
        <Upload size={12} strokeWidth={1.5} />
        Upload{files.length > 0 ? ' more' : ''}
      </button>
    );

    const chipStrip = files.length > 0 && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--size-fileupload-chip-gap)' }}>
        {files.map((file, i) => (
          <ElegantChip
            key={`${file.name}-${i}`}
            label={file.name}
            color="neutral"
            onDismiss={() => removeFile(i)}
          />
        ))}
      </div>
    );

    /* horizontal: label left + button right on same row, chips + error below */
    if (chipLayout === 'horizontal') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
          {liveAnnouncement}
          {hiddenInput}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--size-fileupload-chip-gap)',
            marginBottom: (chipStrip || errorRow) ? 'var(--size-form-group-gap)' : 0,
          }}>
            <div>
              {label && showLabel && (
                <p style={{
                  fontSize: 'var(--primitive-font-size-sm)',
                  fontWeight: 'var(--primitive-font-weight-medium)',
                  color: 'var(--color-text-body)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}>
                  {label}
                </p>
              )}
              {description && showDescription && (
                <p style={{
                  fontSize: 'var(--primitive-font-size-xs)',
                  fontWeight: 'var(--primitive-font-weight-regular)',
                  color: 'var(--color-text-muted)',
                  margin: 0,
                  marginTop: label && showLabel ? 'var(--size-label-to-description)' : 0,
                  letterSpacing: '-0.01em',
                }}>
                  {description}
                </p>
              )}
            </div>
            {uploadBtn}
          </div>
          {chipStrip}
          {errorRow}
        </div>
      );
    }

    /* stacked (default): header above, button + chips inline */
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}>
        {liveAnnouncement}
        {hiddenInput}
        {headerBlock}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--size-fileupload-chip-gap)' }}>
          {uploadBtn}
          {chipStrip}
        </div>
        {errorRow}
      </div>
    );
  }

  /* ─────────────────────────────────────────────────
     DROPZONE VARIANT
  ───────────────────────────────────────────────── */

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      {liveAnnouncement}
      {hiddenInput}
      {headerBlock}

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="File upload drop zone. Click or drag files here."
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : () => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={disabled ? undefined : handleDragOver}
        onDragLeave={disabled ? undefined : handleDragLeave}
        onDrop={disabled ? undefined : handleDrop}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--size-chip-gap)',
          padding: 'var(--size-fileupload-dropzone-padding)',
          backgroundColor: disabled
            ? 'var(--color-interactive-disabled-bg)'
            : isDragOver
            ? 'var(--color-fileupload-dropzone-border)'
            : 'var(--color-fileupload-dropzone-bg)',
          border: `1.5px dashed ${
            disabled
              ? 'var(--color-interactive-disabled-border)'
              : isDragOver
              ? 'var(--color-fileupload-dropzone-active-border)'
              : 'var(--color-fileupload-dropzone-border)'
          }`,
          borderRadius: 'var(--size-fileupload-dropzone-radius)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 'var(--opacity-disabled)' : 1,
          transition: 'background-color 150ms ease, border-color 150ms ease',
          width: '100%',
          textAlign: 'center',
          outline: 'none',
        }}
        onFocus={(e) => {
          if (disabled) return;
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-interactive-primary-bg)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <Upload
          size={24}
          strokeWidth={1.5}
          style={{ color: 'var(--color-fileupload-dropzone-text)' }}
        />
        <p
          style={{
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-body)',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {isDragOver ? 'Drop to upload' : 'Click or drag files here'}
        </p>
        {hasTypeFilter && (
          <p
            style={{
              fontSize: 'var(--primitive-font-size-xs)',
              fontWeight: 'var(--primitive-font-weight-regular)',
              color: 'var(--color-fileupload-dropzone-text)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {allowedTypes.join(', ')} · max {effectiveMaxFiles} file{effectiveMaxFiles === 1 ? '' : 's'}
          </p>
        )}
      </div>

      {chipStrip}
      {errorRow}
    </div>
  );
}
