import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { cn } from '../../utils';
import { ChevronDown } from 'lucide-react';

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown compound components must be used within a Dropdown');
  }
  return context;
}

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export function Dropdown({ children, className }: DropdownProps) {
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

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={containerRef} className={cn('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
  const { isOpen, setIsOpen } = useDropdown();

  return (
    <button
      type="button"
      className={cn('flex items-center gap-2', className)}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {children}
      <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
    </button>
  );
}

interface DropdownMenuProps {
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  width?: string | number;
}

export function DropdownMenu({ children, align = 'left', className, width }: DropdownMenuProps) {
  const { isOpen } = useDropdown();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'absolute z-50 mt-2 min-w-[160px] bg-white rounded-lg shadow-dropdown border border-secondary-200 py-1 overflow-hidden animate-fade-in',
        align === 'right' ? 'right-0' : 'left-0',
        className
      )}
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
      role="menu"
    >
      {children}
    </div>
  );
}

interface DropdownItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  active?: boolean;
  className?: string;
}

export function DropdownItem({ children, icon, onClick, disabled, danger, active }: DropdownItemProps) {
  const { setIsOpen } = useDropdown();

  return (
    <button
      type="button"
      className={cn(
        'w-full px-4 py-2 flex items-center gap-2 text-sm transition-colors',
        disabled && 'opacity-50 cursor-not-allowed',
        danger && 'text-error-600 hover:bg-error-50',
        !disabled && !danger && active && 'bg-primary-50 text-primary-700',
        !disabled && !danger && !active && 'text-secondary-700 hover:bg-secondary-50'
      )}
      onClick={() => {
        if (!disabled) {
          onClick?.();
          setIsOpen(false);
        }
      }}
      disabled={disabled}
      role="menuitem"
    >
      {icon && <span className="w-5">{icon}</span>}
      {children}
    </button>
  );
}

interface DropdownDividerProps {
  className?: string;
}

export function DropdownDivider({ className }: DropdownDividerProps) {
  return <div className={cn('my-1 border-t border-secondary-200', className)} />;
}

interface DropdownLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <div className={cn('px-4 py-1.5 text-xs font-medium text-secondary-500 uppercase', className)}>
      {children}
    </div>
  );
}
