import { forwardRef } from 'react';
import { cn } from '../../utils';
import { Search } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, iconPosition = 'left', className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-secondary-700 mb-1.5">{label}</label>}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">{icon}</div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 bg-white border rounded-lg text-secondary-800 placeholder-secondary-400',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              error && 'border-error-500 focus:ring-error-500',
              !error && 'border-secondary-300',
              icon && iconPosition === 'left' ? 'pl-10' : '',
              icon && iconPosition === 'right' ? 'pr-10' : '',
              className
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400">{icon}</div>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-error-600">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-sm text-secondary-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface SearchInputProps extends Omit<InputProps, 'icon' | 'iconPosition'> {
  onSearch?: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        icon={<Search className="w-5 h-5" />}
        placeholder="Search..."
        className={className}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch?.((e.target as HTMLInputElement).value);
          }
        }}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';
