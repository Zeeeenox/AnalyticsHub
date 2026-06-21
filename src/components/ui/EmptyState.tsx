import React from 'react';
import { cn } from '../../utils';
import { AlertCircle, RefreshCw, FileQuestion } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      {icon ? (
        <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
          <div className="text-secondary-400">{icon}</div>
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
          <FileQuestion className="w-8 h-8 text-secondary-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-secondary-800 mb-1">{title}</h3>
      {description && <p className="text-sm text-secondary-500 max-w-sm mb-4">{description}</p>}
      {action && <Button variant="primary" onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}

interface LoadingStateProps {
  text?: string;
  className?: string;
}

export function LoadingState({ text = 'Loading...', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4', className)}>
      <div className="w-10 h-10 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4" />
      <p className="text-sm text-secondary-500">{text}</p>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  retry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading the data. Please try again.',
  retry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="w-16 h-16 rounded-full bg-error-100 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-error-500" />
      </div>
      <h3 className="text-lg font-semibold text-secondary-800 mb-1">{title}</h3>
      <p className="text-sm text-secondary-500 max-w-sm mb-4">{message}</p>
      {retry && (
        <Button variant="secondary" onClick={retry}>
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'rectangular', width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-secondary-200 rounded animate-pulse-soft',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'rounded',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn('p-6 bg-white rounded-xl border border-secondary-200 shadow-card', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Skeleton width={80} height={20} className="mb-2" />
          <Skeleton width={120} height={32} className="mb-3" />
          <Skeleton width={100} height={18} />
        </div>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
    </div>
  );
}

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function SkeletonTable({ rows = 5, columns = 4, className }: SkeletonTableProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-secondary-200 overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-secondary-200">
            <tr>
              {Array.from({ length: columns }).map((_, idx) => (
                <th key={idx} className="px-4 py-3">
                  <Skeleton width={80} height={16} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-secondary-100">
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-4">
                    <Skeleton width={Math.random() * 60 + 60} height={14} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
