import { useState, ReactNode } from 'react';
import { cn } from '../../utils';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  pageSizeOptionsLabels?: string[];
  showPageSize?: boolean;
    showPageSummary?: boolean;
  maxVisiblePages?: number;
  onPageChangeWithSize?: (page: number, size: number) => void;
  };
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
  className?: string;
  stickyHeader?: boolean;
  rowClassName?: string | ((row: T) => string);
}

const pageSizes = [10, 20, 50, 100];
const pageSizeLabels = ['10 / page', '20 / page', '50 / page', '100 / page'];

export function Table<T>({
  columns,
  data,
  keyExtractor,
  pagination,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  emptyIcon,
  className,
  stickyHeader = false,
  rowClassName,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = (a as Record<string, unknown>)[sortKey];
    const bVal = (b as Record<string, unknown>)[sortKey];
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    const aStr = String(aVal);
    const bStr = String(bVal);
    if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const isAllSelected = sortedData.length > 0 && sortedData.every((row) => selectedRows.includes(keyExtractor(row)));
  const isIndeterminate = selectedRows.length > 0 && !isAllSelected;

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(sortedData.map(keyExtractor));
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      onSelectionChange?.(selectedRows.filter((r) => r !== id));
    } else {
      onSelectionChange?.([...selectedRows, id]);
    }
  };

  const renderPagination = () => {
    if (!pagination) return null;

    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    const currentPage = pagination.page;
    const startItem = (currentPage - 1) * pagination.pageSize + 1;
    const endItem = Math.min(currentPage * pagination.pageSize, pagination.total);
    const maxPages = pagination.maxVisiblePages || 5;

    const getPageNumbers = () => {
      const pages: (number | 'ellipsis')[] = [];
      let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
      const end = Math.min(totalPages, start + maxPages - 1);

      if (end - start + 1 < maxPages) {
        start = Math.max(1, end - maxPages + 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('ellipsis');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('ellipsis');
        pages.push(totalPages);
      }

      return pages;
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-secondary-200 gap-4">
        <div className="flex items-center gap-4">
          {pagination.showPageSize !== false && (
            <div className="flex items-center gap-2">
              <select
                value={pagination.pageSize}
                onChange={(e) => {
                  const newSize = parseInt(e.target.value);
                  pagination.onPageSizeChange?.(newSize);
                  if (pagination.onPageChangeWithSize) {
                    pagination.onPageChangeWithSize(1, newSize);
                  } else {
                    pagination.onPageChange(1);
                  }
                }}
                className="text-sm border border-secondary-300 rounded-lg px-2 py-1.5 bg-white"
                aria-label="Rows per page"
              >
                {(pagination.pageSizeOptions || pageSizes).map((size, idx) => (
                  <option key={size} value={size}>
                    {(pagination.pageSizeOptionsLabels || pageSizeLabels)[idx] || `${size} / page`}
                  </option>
                ))}
              </select>
            </div>
          )}
          {pagination.showPageSummary !== false && (
            <span className="text-sm text-secondary-500">
              Showing {startItem.toLocaleString()}-{endItem.toLocaleString()} of {pagination.total.toLocaleString()}
            </span>
          )}
        </div>
        <nav className="flex items-center gap-1" role="navigation" aria-label="Pagination">
          <button
            onClick={() => pagination.onPageChange(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg enabled:hover:bg-secondary-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => pagination.onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg enabled:hover:bg-secondary-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {getPageNumbers().map((page, idx) => (
            page === 'ellipsis' ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-secondary-400">...</span>
            ) : (
              <button
                key={page}
                onClick={() => pagination.onPageChange(page)}
                className={cn(
                  'min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-colors',
                  page === currentPage
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-600 hover:bg-secondary-100'
                )}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}

          <button
            onClick={() => pagination.onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg enabled:hover:bg-secondary-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => pagination.onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg enabled:hover:bg-secondary-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    );
  };

  const getSortIcon = (key: string) => {
    if (sortKey !== key) return <ChevronsUpDown className="w-4 h-4 text-secondary-400" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-primary-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-primary-600" />
    );
  };

  const getNestedValue = (obj: T, path: string): unknown => {
    const keys = path.split('.');
    let result: unknown = obj;
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }
    return result;
  };

  if (loading) {
    return (
      <div className={cn('bg-white rounded-xl border border-secondary-200 overflow-hidden', className)}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={cn('bg-secondary-50 border-b border-secondary-200', stickyHeader && 'sticky top-0')}>
              <tr>
                {selectable && (
                  <th className="w-12 px-4 py-3">
                    <div className="skeleton w-4 h-4 rounded" />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className={cn(
                      'px-4 py-3 text-left text-sm font-medium text-secondary-600',
                      col.width && `w-[${col.width}]`
                    )}
                  >
                    <div className="skeleton h-4 w-20 rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-b border-secondary-100">
                  {selectable && (
                    <td className="px-4 py-4">
                      <div className="skeleton w-4 h-4 rounded" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-4">
                      <div className="skeleton h-4 w-full max-w-[150px] rounded" />
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

  if (sortedData.length === 0) {
    return (
      <div className={cn('bg-white rounded-xl border border-secondary-200 overflow-hidden', className)}>
        <div className="flex flex-col items-center justify-center py-12 px-4">
          {emptyIcon && <div className="text-secondary-300 mb-4">{emptyIcon}</div>}
          <p className="text-secondary-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-secondary-200 overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={cn('bg-secondary-50 border-b border-secondary-200', stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium text-secondary-600',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    col.sortable && 'cursor-pointer hover:text-secondary-800',
                    col.width && `w-[${col.width}]`
                  )}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    {col.sortable && getSortIcon(String(col.key))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-100">
            {sortedData.map((row) => {
              const rowId = keyExtractor(row);
              const isSelected = selectedRows.includes(rowId);
              const rowClasses = typeof rowClassName === 'function' ? rowClassName(row) : rowClassName;

              return (
                <tr
                  key={rowId}
                  className={cn(
                    'transition-colors',
                    onRowClick && 'cursor-pointer hover:bg-secondary-50',
                    isSelected && 'bg-primary-50',
                    rowClasses
                  )}
                  onClick={() => onRowClick?.(row)}
                  role={onRowClick ? 'button' : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && onRowClick) {
                      e.preventDefault();
                      onRowClick(row);
                    }
                  }}
                >
                  {selectable && (
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(rowId)}
                        className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                        aria-label={`Select row ${rowId}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => {
                    const value = getNestedValue(row, String(col.key));
                    return (
                      <td
                        key={String(col.key)}
                        className={cn(
                          'px-4 py-4 text-sm text-secondary-800',
                          col.align === 'center' && 'text-center',
                          col.align === 'right' && 'text-right'
                        )}
                      >
                        {col.render ? col.render(value, row) : String(value ?? '-')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination && renderPagination()}
    </div>
  );
}
