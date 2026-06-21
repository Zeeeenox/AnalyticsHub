import React from 'react';
import { cn } from '../../utils';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'accent';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  error: 'bg-error-100 text-error-700',
  accent: 'bg-accent-100 text-accent-700',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
};

const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
  accent: 'bg-accent-500',
};

export function Badge({ children, variant = 'primary', size = 'md', dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  active: { label: 'Active', variant: 'success' },
  trialing: { label: 'Trialing', variant: 'warning' },
  churned: { label: 'Churned', variant: 'error' },
  'closed-won': { label: 'Won', variant: 'success' },
  'closed-lost': { label: 'Lost', variant: 'error' },
  prospecting: { label: 'Prospecting', variant: 'primary' },
  qualification: { label: 'Qualification', variant: 'primary' },
  proposal: { label: 'Proposal', variant: 'accent' },
  negotiation: { label: 'Negotiation', variant: 'warning' },
  ready: { label: 'Ready', variant: 'success' },
  generating: { label: 'Generating', variant: 'warning' },
  scheduled: { label: 'Scheduled', variant: 'primary' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, variant: 'secondary' as BadgeVariant };
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
