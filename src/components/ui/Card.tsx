import React from 'react';
import { cn } from '../../utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, className, hoverable = false, padding = 'md', onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-secondary-200 shadow-card',
        hoverable && 'hover:shadow-card-hover hover:border-secondary-300 transition-all duration-200 cursor-pointer',
        paddingStyles[padding],
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between mb-4', className)}>
      <div>
        <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
        {subtitle && <p className="text-sm text-secondary-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: number[];
  format?: 'currency' | 'percent' | 'number';
  onClick?: () => void;
  className?: string;
}

export function formatStatValue(value: string | number, format?: 'currency' | 'percent' | 'number'): string {
  if (typeof value === 'string') return value;

  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case 'percent':
      return `${value}%`;
    default:
      return new Intl.NumberFormat('en-US').format(value);
  }
}

export function StatCard({
  label,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  onClick,
  className,
}: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card
      hoverable={!!onClick}
      padding="md"
      onClick={onClick}
      className={className}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-secondary-500">{label}</p>
          <p className="text-2xl font-semibold text-secondary-900 mt-1">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive ? 'text-success-600' : 'text-error-600'
                )}
              >
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-secondary-400">{changeLabel}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
