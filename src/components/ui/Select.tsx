import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  error,
  className,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('w-full', className)} ref={containerRef}>
      {label && <label className="block text-sm font-medium text-secondary-700 mb-1.5">{label}</label>}
      <div className="relative">
        <button
          type="button"
          className={cn(
            'w-full px-4 py-2.5 bg-white border rounded-lg text-left transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            error && 'border-error-500',
            !error && 'border-secondary-300',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={cn(selectedOption ? 'text-secondary-800' : 'text-secondary-400')}>
            {selectedOption ? (
              <span className="flex items-center gap-2">
                {selectedOption.icon}
                {selectedOption.label}
              </span>
            ) : (
              placeholder
            )}
          </span>
          <ChevronDown
            className={cn('absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400', isOpen && 'rotate-180')}
          />
        </button>

        {isOpen && (
          <div
            className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-dropdown border border-secondary-200 py-1 overflow-hidden animate-fade-in"
            role="listbox"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'w-full px-4 py-2 text-left flex items-center justify-between',
                  'hover:bg-secondary-50 transition-colors',
                  option.value === value && 'bg-primary-50 text-primary-700'
                )}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={option.value === value}
              >
                <span className="flex items-center gap-2">
                  {option.icon}
                  <span className={option.value === value ? 'text-primary-700' : 'text-secondary-700'}>
                    {option.label}
                  </span>
                </span>
                {option.value === value && <Check className="w-4 h-4 text-primary-600" />}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-error-600">{error}</p>}
    </div>
  );
}

interface MultiSelectProps {
  options: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select...',
  label,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <div className={cn('w-full', className)} ref={containerRef}>
      {label && <label className="block text-sm font-medium text-secondary-700 mb-1.5">{label}</label>}
      <div className="relative">
        <button
          type="button"
          className="w-full px-4 py-2.5 bg-white border border-secondary-300 rounded-lg text-left "
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {selectedOptions.length === 0 ? (
                <span className="text-secondary-400">{placeholder}</span>
              ) : (
                selectedOptions.map((opt) => (
                  <span
                    key={opt.value}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {opt.label}
                  </span>
                ))
              )}
            </div>
            <ChevronDown className={cn('w-5 h-5 text-secondary-400', isOpen && 'rotate-180')} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-dropdown border border-secondary-200 py-1 overflow-hidden animate-fade-in">
            {options.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    'w-full px-4 py-2 text-left flex items-center gap-3',
                    'hover:bg-secondary-50 transition-colors'
                  )}
                  onClick={() => {
                    const newValue = isSelected
                      ? value.filter((v) => v !== option.value)
                      : [...value, option.value];
                    onChange?.(newValue);
                  }}
                >
                  <span
                    className={cn(
                      'w-4 h-4 rounded border flex items-center justify-center',
                      isSelected ? 'bg-primary-600 border-primary-600' : 'border-secondary-300'
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </span>
                  <span className={isSelected ? 'text-primary-700 font-medium' : 'text-secondary-700'}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
