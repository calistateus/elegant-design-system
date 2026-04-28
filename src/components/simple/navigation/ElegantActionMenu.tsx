'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { MoreVertical, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SubMenuItem {
  label: string;
  danger?: boolean;
  onSelect: () => void;
}

export interface ActionMenuItem {
  label: string;
  /** Whether to render an icon beside the label */
  icon?: boolean;
  /** Lucide icon name, e.g. "Pencil", "Trash2", "Copy" */
  iconName?: string;
  onSelect: () => void;
  variant?: 'default' | 'danger';
  /** Sub-menu items — renders a flyout when provided */
  subItems?: SubMenuItem[];
}

// Enforce: trigger must have icon:true, a label string, or both
type WithIcon  = { icon: true;   label?: string };
type WithLabel = { icon?: false; label: string  };

export type ActionMenuProps = (WithIcon | WithLabel) & {
  items: ActionMenuItem[];
  /** Lucide icon name for the trigger button — defaults to MoreVertical (⋮) */
  triggerIconName?: string;
};

// ─── Placement ────────────────────────────────────────────────────────────────

const GAP  = 6;  // px between trigger/item and menu
const EDGE = 8;  // min distance from viewport edge

interface MenuPos { top: number; left: number }

function computeMenuPosition(trigger: DOMRect, menuW: number, menuH: number): MenuPos {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const openAbove = (vh - trigger.bottom) < menuH + GAP && trigger.top >= menuH + GAP;
  const top  = openAbove ? trigger.top - menuH - GAP : trigger.bottom + GAP;

  // Right-align to trigger; flip left-align if it would clip
  let left = trigger.right - menuW;
  if (left < EDGE) left = trigger.left;
  left = Math.max(EDGE, Math.min(left, vw - menuW - EDGE));

  return { top, left };
}

function computeSubPosition(
  itemRect: DOMRect,
  mainMenuRect: DOMRect,
  subW: number,
  subH: number,
): MenuPos {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Prefer right of main menu; flip left if no space
  let left = mainMenuRect.right + GAP;
  if (left + subW > vw - EDGE) left = mainMenuRect.left - subW - GAP;
  left = Math.max(EDGE, left);

  // Align top with the hovered item; clamp to viewport
  let top = itemRect.top;
  top = Math.max(EDGE, Math.min(top, vh - subH - EDGE));

  return { top, left };
}

// ─── Icon helper ──────────────────────────────────────────────────────────────

function DynamicIcon({ name, size = 14 }: { name: string; size?: number }) {
  const registry = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>;
  const Icon = registry[name];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={1.5} />;
}

// ─── Sub-menu item button ─────────────────────────────────────────────────────

function SubMenuItemButton({
  item,
  btnRef,
  onSelect,
}: {
  item: SubMenuItem;
  btnRef: (el: HTMLButtonElement | null) => void;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const textColor = item.danger ? 'var(--color-error-text)' : 'var(--color-text-body)';
  const hoverBg   = item.danger ? 'var(--primitive-red-100)' : 'var(--color-bg-surface)';

  return (
    <button
      ref={btnRef}
      role="menuitem"
      type="button"
      tabIndex={-1}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="elegant-menu-item"
      style={{
        color: textColor,
        backgroundColor: hovered ? hoverBg : 'transparent',
      }}
    >
      {item.label}
    </button>
  );
}

// ─── Main menu item button ────────────────────────────────────────────────────

function ActionMenuItemButton({
  item,
  btnRef,
  onSelect,
  subOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  item: ActionMenuItem;
  btnRef: (el: HTMLButtonElement | null) => void;
  onSelect: () => void;
  subOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const hasSub  = (item.subItems?.length ?? 0) > 0;
  const isDanger = item.variant === 'danger';
  const textColor = isDanger ? 'var(--color-error-text)' : 'var(--color-text-body)';
  const hoverBg   = isDanger ? 'var(--primitive-red-100)' : 'var(--color-bg-surface)';
  const isActive  = hovered || subOpen;

  return (
    <button
      ref={btnRef}
      role="menuitem"
      type="button"
      tabIndex={-1}
      aria-haspopup={hasSub ? 'menu' : undefined}
      aria-expanded={hasSub ? subOpen : undefined}
      onClick={hasSub ? undefined : onSelect}
      onMouseEnter={() => { setHovered(true); onMouseEnter(); }}
      onMouseLeave={() => { setHovered(false); onMouseLeave(); }}
      className="elegant-menu-item"
      style={{
        justifyContent: 'space-between',
        gap: 'var(--size-btn-icon-gap)',
        color: textColor,
        backgroundColor: isActive ? hoverBg : 'transparent',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-btn-icon-gap)' }}>
        {item.icon && item.iconName && (
          <span style={{ display: 'flex', alignItems: 'center', color: textColor, flexShrink: 0 }}>
            <DynamicIcon name={item.iconName} size={14} />
          </span>
        )}
        {item.label}
      </span>
      {hasSub && (
        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)', flexShrink: 0 }}>
          <ChevronRight size={14} strokeWidth={1.5} />
        </span>
      )}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ElegantActionMenu(props: ActionMenuProps) {
  const { items, triggerIconName } = props;
  const p = props as { icon?: boolean; label?: string };
  const showIcon  = p.icon === true;
  const labelText = p.label;

  const [open,          setOpen]          = useState(false);
  const [menuPos,       setMenuPos]       = useState<MenuPos | null>(null);
  const [focusedIndex,  setFocusedIndex]  = useState<number>(-1);

  // Sub-menu state
  const [openSubIndex,   setOpenSubIndex]   = useState<number | null>(null);
  const [subMenuPos,     setSubMenuPos]     = useState<MenuPos | null>(null);
  const [focusedSubIdx,  setFocusedSubIdx]  = useState<number>(-1);
  const [inSubMenu,      setInSubMenu]      = useState(false);

  const triggerRef   = useRef<HTMLButtonElement>(null);
  const menuRef      = useRef<HTMLDivElement>(null);
  const subMenuRef   = useRef<HTMLDivElement>(null);
  const itemRefs     = useRef<Array<HTMLButtonElement | null>>([]);
  const subItemRefs  = useRef<Array<HTMLButtonElement | null>>([]);
  const closeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Close sub-menu helpers ──────────────────────────────────────────────────
  const scheduleCloseSub = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setOpenSubIndex(null);
      setInSubMenu(false);
    }, 120);
  }, []);

  const cancelCloseSub = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // ── Close everything on outside click ──────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (
        !menuRef.current?.contains(t) &&
        !subMenuRef.current?.contains(t) &&
        !triggerRef.current?.contains(t)
      ) {
        setOpen(false);
        setOpenSubIndex(null);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  // ── Close sub when main menu closes ────────────────────────────────────────
  useEffect(() => {
    if (!open) { setMenuPos(null); setOpenSubIndex(null); setInSubMenu(false); }
  }, [open]);

  // ── Compute main menu position after mount ──────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current?.getBoundingClientRect();
    const menu    = menuRef.current?.getBoundingClientRect();
    if (trigger && menu) setMenuPos(computeMenuPosition(trigger, menu.width, menu.height));
  }, [open]);

  // ── Recompute main menu on scroll / resize ──────────────────────────────────
  useEffect(() => {
    if (!open) return;
    function recompute() {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const menu    = menuRef.current?.getBoundingClientRect();
      if (trigger && menu) setMenuPos(computeMenuPosition(trigger, menu.width, menu.height));
    }
    window.addEventListener('scroll', recompute, true);
    window.addEventListener('resize', recompute);
    return () => { window.removeEventListener('scroll', recompute, true); window.removeEventListener('resize', recompute); };
  }, [open]);

  // ── Compute sub-menu position after it mounts ───────────────────────────────
  useEffect(() => {
    if (openSubIndex === null) { setSubMenuPos(null); return; }
    const itemEl  = itemRefs.current[openSubIndex];
    const mainEl  = menuRef.current;
    const subEl   = subMenuRef.current;
    if (!itemEl || !mainEl || !subEl) return;
    const itemRect = itemEl.getBoundingClientRect();
    const mainRect = mainEl.getBoundingClientRect();
    const subRect  = subEl.getBoundingClientRect();
    setSubMenuPos(computeSubPosition(itemRect, mainRect, subRect.width, subRect.height));
  }, [openSubIndex]);

  // ── Focus management — main menu ────────────────────────────────────────────
  useEffect(() => {
    if (open) setFocusedIndex(0);
    else      setFocusedIndex(-1);
  }, [open]);

  useEffect(() => {
    if (open && !inSubMenu && focusedIndex >= 0) itemRefs.current[focusedIndex]?.focus();
  }, [focusedIndex, open, inSubMenu]);

  // ── Focus management — sub menu ─────────────────────────────────────────────
  useEffect(() => {
    if (inSubMenu && focusedSubIdx >= 0) subItemRefs.current[focusedSubIdx]?.focus();
  }, [focusedSubIdx, inSubMenu]);

  // ── Keyboard — trigger ──────────────────────────────────────────────────────
  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault(); setOpen(true);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault(); setOpen(true);
      setTimeout(() => setFocusedIndex(items.length - 1), 0);
    }
  }, [items.length]);

  // ── Keyboard — main menu ────────────────────────────────────────────────────
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (inSubMenu) return; // let sub-menu handle its own keys
    const currentItem = items[focusedIndex];
    const hasSub = (currentItem?.subItems?.length ?? 0) > 0;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(items.length - 1);
        break;
      case 'ArrowRight':
        if (hasSub) {
          e.preventDefault();
          setOpenSubIndex(focusedIndex);
          setInSubMenu(true);
          setFocusedSubIdx(0);
        }
        break;
    }
  }, [items, focusedIndex, inSubMenu]);

  // ── Keyboard — sub menu ─────────────────────────────────────────────────────
  const handleSubMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    const subItems = openSubIndex !== null ? (items[openSubIndex]?.subItems ?? []) : [];
    switch (e.key) {
      case 'Escape':
      case 'ArrowLeft':
        e.preventDefault();
        setOpenSubIndex(null);
        setInSubMenu(false);
        setFocusedSubIdx(-1);
        // Return focus to parent item
        if (openSubIndex !== null) itemRefs.current[openSubIndex]?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedSubIdx(prev => Math.min(prev + 1, subItems.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedSubIdx(prev => Math.max(prev - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setFocusedSubIdx(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedSubIdx(subItems.length - 1);
        break;
    }
  }, [items, openSubIndex]);

  const [triggerHovered, setTriggerHovered] = useState(false);
  const isIconOnly = showIcon && !labelText;

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top:  menuPos?.top  ?? 0,
    left: menuPos?.left ?? 0,
    visibility: menuPos ? 'visible' : 'hidden',
    zIndex: 9999,
    minWidth: '180px',
    backgroundColor: 'var(--color-bg-main)',
    border: '1px solid var(--color-border-default)',
    borderRadius: 'var(--size-card-radius)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    padding: 'var(--primitive-scale-1) 0',
    outline: 'none',
  };

  const subMenuStyle: React.CSSProperties = {
    position: 'fixed',
    top:  subMenuPos?.top  ?? 0,
    left: subMenuPos?.left ?? 0,
    visibility: subMenuPos ? 'visible' : 'hidden',
    zIndex: 10000,
    minWidth: '160px',
    backgroundColor: 'var(--color-bg-main)',
    border: '1px solid var(--color-border-default)',
    borderRadius: 'var(--size-card-radius)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    padding: 'var(--primitive-scale-1) 0',
    outline: 'none',
  };

  const currentSubItems = openSubIndex !== null ? (items[openSubIndex]?.subItems ?? []) : [];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        onKeyDown={handleTriggerKeyDown}
        onMouseEnter={() => setTriggerHovered(true)}
        onMouseLeave={() => setTriggerHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: showIcon && labelText ? 'var(--size-btn-icon-gap)' : undefined,
          padding: isIconOnly ? 'var(--size-btn-py) var(--size-btn-py)' : 'var(--size-btn-py) var(--size-btn-px)',
          fontSize: 'var(--primitive-font-size-sm)',
          fontWeight: 'var(--primitive-font-weight-medium)',
          color: 'var(--color-text-body)',
          backgroundColor: open || triggerHovered ? 'var(--color-interactive-hover-bg)' : 'transparent',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--size-btn-radius)',
          cursor: 'pointer',
          outline: 'none',
          lineHeight: 1,
          transition: 'var(--motion-dropdown-trigger)',
          userSelect: 'none',
        }}
      >
        {showIcon && (
          triggerIconName
            ? <DynamicIcon name={triggerIconName} size={16} />
            : <MoreVertical size={16} strokeWidth={1.5} />
        )}
        {labelText && <span>{labelText}</span>}
      </button>

      {/* Main menu */}
      {open && (
        <div ref={menuRef} role="menu" aria-orientation="vertical" onKeyDown={handleMenuKeyDown} style={menuStyle}>
          {items.map((item, index) => (
            <ActionMenuItemButton
              key={`${item.label}-${index}`}
              item={item}
              btnRef={el => { itemRefs.current[index] = el; }}
              subOpen={openSubIndex === index}
              onMouseEnter={() => {
                cancelCloseSub();
                if ((item.subItems?.length ?? 0) > 0) {
                  setOpenSubIndex(index);
                  setInSubMenu(false);
                  setFocusedSubIdx(-1);
                } else {
                  setOpenSubIndex(null);
                }
              }}
              onMouseLeave={() => {
                if ((item.subItems?.length ?? 0) > 0) scheduleCloseSub();
              }}
              onSelect={() => {
                item.onSelect();
                setOpen(false);
                setOpenSubIndex(null);
                triggerRef.current?.focus();
              }}
            />
          ))}
        </div>
      )}

      {/* Sub menu */}
      {open && openSubIndex !== null && currentSubItems.length > 0 && (
        <div
          ref={subMenuRef}
          role="menu"
          aria-orientation="vertical"
          onKeyDown={handleSubMenuKeyDown}
          onMouseEnter={() => { cancelCloseSub(); setInSubMenu(true); if (focusedSubIdx < 0) setFocusedSubIdx(0); }}
          onMouseLeave={scheduleCloseSub}
          style={subMenuStyle}
        >
          {currentSubItems.map((subItem, idx) => (
            <SubMenuItemButton
              key={`sub-${idx}`}
              item={subItem}
              btnRef={el => { subItemRefs.current[idx] = el; }}
              onSelect={() => {
                subItem.onSelect();
                setOpen(false);
                setOpenSubIndex(null);
                triggerRef.current?.focus();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
