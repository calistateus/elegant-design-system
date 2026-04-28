'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CheckCircle, X, XCircle, Info } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────

type ToastVariant = 'default' | 'success' | 'error';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

// ─── Context ──────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Hook ─────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

// ─── Single Toast Item ────────────────────────────────────────

const VARIANT_STYLES: Record<ToastVariant, React.CSSProperties> = {
  default: {
    borderColor: 'var(--color-border-default)',
    color: 'var(--color-text-body)',
  },
  success: {
    borderColor: 'var(--primitive-green-500)',
    color: 'var(--color-text-accent)',
  },
  error: {
    borderColor: 'var(--primitive-red-500)',
    color: 'var(--color-error-text)',
  },
};

const VARIANT_ICONS: Record<ToastVariant, React.ReactNode> = {
  default: <Info size={16} strokeWidth={1.5} />,
  success: <CheckCircle size={16} strokeWidth={1.5} />,
  error: <XCircle size={16} strokeWidth={1.5} />,
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animate in
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Auto-dismiss after 4 s
  useEffect(() => {
    timerRef.current = setTimeout(() => handleDismiss(), 4000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleDismiss() {
    setVisible(false);
    // Wait for exit transition before removing from DOM
    setTimeout(() => onDismiss(toast.id), 300);
  }

  const variantStyle = VARIANT_STYLES[toast.variant];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--size-notification-gap)',
        padding: 'var(--size-notification-padding)',
        backgroundColor: 'var(--color-bg-main)',
        border: `1px solid ${variantStyle.borderColor as string}`,
        borderRadius: 'var(--size-notification-radius)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        fontSize: 'var(--primitive-font-size-sm)',
        color: 'var(--color-text-body)',
        minWidth: '240px',
        maxWidth: '360px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(var(--toast-slide-from, 8px))',
        transition: `opacity var(--primitive-duration-relaxed) var(--primitive-easing-power2-out),
                     transform var(--primitive-duration-relaxed) var(--primitive-easing-power2-out)`,
      }}
      role="alert"
      aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
    >
      {/* Icon */}
      <span
        style={{
          color: variantStyle.color as string,
          flexShrink: 0,
          paddingTop: '1px',
        }}
      >
        {VARIANT_ICONS[toast.variant]}
      </span>

      {/* Message */}
      <span style={{ flex: 1, lineHeight: 1.5 }}>{toast.message}</span>

      {/* Dismiss */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          color: 'var(--color-text-muted)',
          flexShrink: 0,
          transition: 'var(--motion-interactive-color)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-body)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = 'default') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <style>{`
        .toast-viewport {
          bottom: var(--primitive-scale-6);
          right: var(--primitive-scale-6);
          --toast-slide-from: 8px;
        }
        @media (max-width: 599px) {
          .toast-viewport {
            bottom: auto;
            top: var(--primitive-scale-6);
            right: var(--primitive-scale-6);
            left: var(--primitive-scale-6);
            --toast-slide-from: -8px;
          }
        }
      `}</style>

      {/* Viewport */}
      <div
        aria-label="Notifications"
        className="toast-viewport"
        style={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--primitive-scale-2)',
          zIndex: 9999,
          pointerEvents: toasts.length === 0 ? 'none' : 'auto',
        }}
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
