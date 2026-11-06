import { useEffect, useId, useRef, useState } from 'react';
import './Dropdown.css';

export type DropdownVariant = 'multi-select' | 'single-select';
export type DropdownValue = string | string[];

export interface DropdownProps {
  label: string;
  options: string[];
  variant?: DropdownVariant;
  value: DropdownValue;
  onChange: (value: DropdownValue) => void;
  placeholder?: string;
  className?: string;
}

export function Dropdown({
  label,
  options,
  variant = 'single-select',
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
}: DropdownProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = variant === 'multi-select'
    ? (Array.isArray(value) ? value : [])
    : (typeof value === 'string' ? value : '');

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        rootRef.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleOption = (option: string) => {
    if (variant === 'multi-select') {
      const next = selected as string[];
      onChange(next.includes(option)
        ? next.filter((item) => item !== option)
        : [...next, option]);
      return;
    }
    onChange(option === selected ? '' : option);
    setOpen(false);
  };

  const triggerSummary = variant === 'multi-select'
    ? (selected as string[]).length
      ? `${label} · ${(selected as string[]).length}`
      : label
    : (selected as string) ? `${label}: ${selected as string}` : label || placeholder;

  return (
    <div className={`jakpot-dropdown jakpot-dropdown--${variant} ${className}`.trim()} ref={rootRef}>
      <button
        type="button"
        className="jakpot-dropdown__trigger button button-secondary"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{triggerSummary || placeholder}</span>
        <svg className="jakpot-dropdown__chevron" viewBox="0 0 16 16" aria-hidden="true">
          <path d="m3.5 6 4.5 4 4.5-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="jakpot-dropdown__panel" id={id} hidden={!open}>
          {variant === 'multi-select' && (
            <div className="jakpot-dropdown__actions">
              <button type="button" onClick={() => onChange([...options])}>Select all</button>
              <button type="button" onClick={() => onChange([])}>Unselect all</button>
            </div>
          )}
          <div className="jakpot-dropdown__options" role="group" aria-label={label}>
            {options.map((option) => {
              const isSelected = variant === 'multi-select'
                ? (selected as string[]).includes(option)
                : selected === option;
              return (
                <button
                  type="button"
                  key={option}
                  className={`jakpot-dropdown__option ${variant === 'multi-select' ? 'jakpot-dropdown__option--tag' : ''} ${isSelected ? 'is-selected' : ''}`.trim()}
                  aria-pressed={isSelected}
                  onClick={() => toggleOption(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
      </div>
    </div>
  );
}
