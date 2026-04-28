'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ElegantPaginationProps {
  /** Total number of pages. */
  totalPages: number;
  /** Currently active page (1-based). */
  currentPage: number;
  /** Called when the user selects a page. */
  onPageChange: (page: number) => void;
  /** Number of page buttons shown on each side of the current page. Defaults to 1. */
  siblings?: number;
  className?: string;
}

function getPageRange(current: number, total: number, siblings: number): (number | '...')[] {
  const windowSize = 2 * siblings + 1;

  // Stay flush-left until current reaches the last page of the flush-left window.
  // Stay flush-right until current reaches the first page of the flush-right window.
  // Only center in between.
  let windowStart: number;
  if (current <= windowSize + 1) {
    windowStart = 2;
  } else if (current >= total - windowSize) {
    windowStart = total - windowSize;
  } else {
    windowStart = current - siblings;
  }
  windowStart = Math.max(2, Math.min(windowStart, Math.max(2, total - windowSize)));
  const windowEnd = windowStart + windowSize - 1;

  const pages: (number | '...')[] = [1];
  if (windowStart > 2) pages.push('...');
  for (let i = windowStart; i <= Math.min(windowEnd, total - 1); i++) pages.push(i);
  if (windowEnd < total - 1) pages.push('...');
  if (total > 1) pages.push(total);

  return pages;
}

export function ElegantPagination({
  totalPages,
  currentPage,
  onPageChange,
  siblings = 1,
  className = '',
}: ElegantPaginationProps) {
  const pages = getPageRange(currentPage, totalPages, siblings);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const navBtnStyle = (enabled: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--primitive-scale-8)',
    height: 'var(--primitive-scale-8)',
    border: '1px solid var(--color-border-default)',
    borderRadius: 'var(--size-input-radius)',
    background: 'none',
    cursor: enabled ? 'pointer' : 'default',
    color: enabled ? 'var(--color-text-body)' : 'var(--color-border-input)',
    transition: 'color var(--primitive-duration-fast) var(--primitive-easing-default), border-color var(--primitive-duration-fast) var(--primitive-easing-default)',
  });

  const pageBtnStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'var(--primitive-scale-8)',
    height: 'var(--primitive-scale-8)',
    padding: '0 var(--primitive-scale-2)',
    border: isActive ? '1px solid var(--color-interactive-primary-bg)' : '1px solid transparent',
    borderRadius: 'var(--size-input-radius)',
    background: isActive ? 'var(--color-interactive-primary-bg)' : 'none',
    color: isActive ? 'var(--color-interactive-primary-fg)' : 'var(--color-text-body)',
    cursor: isActive ? 'default' : 'pointer',
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: isActive ? 'var(--primitive-font-weight-medium)' : 'var(--primitive-font-weight-regular)',
    transition: 'background-color var(--primitive-duration-fast) var(--primitive-easing-default), color var(--primitive-duration-fast) var(--primitive-easing-default), border-color var(--primitive-duration-fast) var(--primitive-easing-default)',
  });

  return (
    <nav
      aria-label="Pagination"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--primitive-scale-1)',
      }}
    >
      {/* Prev */}
      <button
        aria-label="Previous page"
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        style={navBtnStyle(canPrev)}
        onMouseEnter={e => {
          if (!canPrev) return;
          e.currentTarget.style.borderColor = 'var(--color-border-input-focus)';
          e.currentTarget.style.color = 'var(--color-text-title)';
        }}
        onMouseLeave={e => {
          if (!canPrev) return;
          e.currentTarget.style.borderColor = 'var(--color-border-default)';
          e.currentTarget.style.color = 'var(--color-text-body)';
        }}
      >
        <ChevronLeft size={14} strokeWidth={1.5} />
      </button>

      {/* Pages */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span
            key={`ellipsis-${i}`}
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 'var(--primitive-scale-8)',
              height: 'var(--primitive-scale-8)',
              fontSize: 'var(--primitive-font-size-sm)',
              color: 'var(--color-text-muted)',
              userSelect: 'none',
            }}
          >
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => page !== currentPage && onPageChange(page)}
            style={pageBtnStyle(page === currentPage)}
            onMouseEnter={e => {
              if (page === currentPage) return;
              e.currentTarget.style.borderColor = 'var(--color-border-default)';
              e.currentTarget.style.color = 'var(--color-text-title)';
            }}
            onMouseLeave={e => {
              if (page === currentPage) return;
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-body)';
            }}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        aria-label="Next page"
        disabled={!canNext}
        onClick={() => canNext && onPageChange(currentPage + 1)}
        style={navBtnStyle(canNext)}
        onMouseEnter={e => {
          if (!canNext) return;
          e.currentTarget.style.borderColor = 'var(--color-border-input-focus)';
          e.currentTarget.style.color = 'var(--color-text-title)';
        }}
        onMouseLeave={e => {
          if (!canNext) return;
          e.currentTarget.style.borderColor = 'var(--color-border-default)';
          e.currentTarget.style.color = 'var(--color-text-body)';
        }}
      >
        <ChevronRight size={14} strokeWidth={1.5} />
      </button>
    </nav>
  );
}
