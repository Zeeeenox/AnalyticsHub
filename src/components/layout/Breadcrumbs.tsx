import { cn } from '../../utils';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center gap-1 text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1">
        <li>
          <a
            href="#"
            className="p-1 text-secondary-400 hover:text-secondary-600 transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </a>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              <ChevronRight className="w-4 h-4 text-secondary-300" />
              {isLast || !item.path ? (
                <span className={cn('px-1', isLast ? 'font-medium text-secondary-800' : 'text-secondary-500')}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.path}
                  className="px-1 text-secondary-600 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, breadcrumbs, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-3" />}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">{title}</h1>
          {subtitle && <p className="text-sm text-secondary-500 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
