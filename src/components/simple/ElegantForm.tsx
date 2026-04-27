'use client';

import React, { createContext, useContext, useRef, useState } from 'react';

// ─── Context ──────────────────────────────────────────────────────────────────

interface FormState {
  isDirty: boolean;
  isDisabled: boolean;
  isResetting: boolean;
  isSubmitting: boolean;
}

const FormContext = createContext<FormState>({
  isDirty: false,
  isDisabled: false,
  isResetting: false,
  isSubmitting: false,
});

export function useFormState(): FormState {
  return useContext(FormContext);
}

// ─── ElegantForm ──────────────────────────────────────────────────────────────

export interface ElegantFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function ElegantForm({
  children,
  onSubmit,
  disabled = false,
  className = '',
  id,
}: ElegantFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setIsResetting(true);
    setIsDirty(false);
    // Let the reset paint, then clear the flag
    requestAnimationFrame(() => setIsResetting(false));
  }

  function handleChange() {
    if (!isDirty) setIsDirty(true);
  }

  return (
    <FormContext.Provider value={{ isDirty, isDisabled: disabled, isResetting, isSubmitting }}>
      <form
        ref={formRef}
        id={id}
        className={className}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onChange={handleChange}
        noValidate
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--primitive-font-sans)',
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

// ─── ElegantFormHeader ────────────────────────────────────────────────────────

export interface ElegantFormHeaderProps {
  title: string;
  description?: string;
  showDescription?: boolean;
}

export function ElegantFormHeader({
  title,
  description = '',
  showDescription = true,
}: ElegantFormHeaderProps) {
  return (
    <div
      style={{
        padding: 'var(--primitive-scale-6)',
        borderBottom: '1px solid var(--color-border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-heading-to-sub)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--primitive-font-sans)',
          fontSize: 'var(--primitive-font-size-lg)',
          fontWeight: 'var(--primitive-font-weight-bold)',
          color: 'var(--color-text-title)',
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        {title}
      </h2>
      {showDescription && description && (
        <p
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// ─── ElegantFormSection ───────────────────────────────────────────────────────

export interface ElegantFormSectionProps {
  children: React.ReactNode;
  title?: string;
  showTitle?: boolean;
}

export function ElegantFormSection({
  children,
  title = '',
  showTitle = false,
}: ElegantFormSectionProps) {
  return (
    <section
      style={{
        padding: 'var(--primitive-scale-6)',
        borderBottom: '1px solid var(--color-border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-stack-gap)',
      }}
    >
      {showTitle && title && (
        <h3
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-base)',
            fontWeight: 'var(--primitive-font-weight-bold)',
            color: 'var(--color-text-title)',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </section>
  );
}

// ─── ElegantFieldset ──────────────────────────────────────────────────────────

export interface ElegantFieldsetProps {
  children: React.ReactNode;
  legend?: string;
  showLegend?: boolean;
}

export function ElegantFieldset({
  children,
  legend = '',
  showLegend = true,
}: ElegantFieldsetProps) {
  return (
    <fieldset
      style={{
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--primitive-radius-md)',
        padding: 'var(--primitive-scale-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-form-group-gap)',
        margin: 0,
      }}
    >
      {showLegend && legend && (
        <legend
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-title)',
            lineHeight: 1.4,
            padding: '0 var(--primitive-scale-1)',
          }}
        >
          {legend}
        </legend>
      )}
      {children}
    </fieldset>
  );
}

// ─── ElegantField ─────────────────────────────────────────────────────────────

export interface ElegantFieldProps {
  children: React.ReactNode;
  className?: string;
}

export function ElegantField({ children, className = '' }: ElegantFieldProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-form-group-gap)',
      }}
    >
      {children}
    </div>
  );
}

// ─── ElegantFormFooter ────────────────────────────────────────────────────────

export interface ElegantFormFooterProps {
  children: React.ReactNode;
}

export function ElegantFormFooter({ children }: ElegantFormFooterProps) {
  return (
    <div
      style={{
        padding: 'var(--primitive-scale-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 'var(--primitive-scale-3)',
      }}
    >
      {children}
    </div>
  );
}
