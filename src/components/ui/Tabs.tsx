import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../utils';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs component');
  }
  return context;
}

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ defaultValue, children, onChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'pills' | 'border';
}

export function TabList({ children, className, variant = 'default' }: TabListProps) {
  return (
    <div
      className={cn(
        'flex',
        variant === 'default' && 'border-b border-secondary-200 gap-1',
        variant === 'pills' && 'gap-1',
        variant === 'border' && 'gap-px bg-secondary-100 p-1 rounded-lg',
        className
      )}
      role="tablist"
    >
      {children}
    </div>
  );
}

interface TabProps {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
  className?: string;
}

export function Tab({ value, children, icon, badge, disabled = false, className }: TabProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={{
        borderBottom: isActive ? '2px solid #2563eb' : 'none',
        marginBottom: '-1px',
        color: isActive ? '#2563eb' : '#64748b',
      }}
    >
      {icon}
      {children}
      {badge !== undefined && (
        <span className={cn('px-2 py-0.5 rounded-full text-xs', isActive ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-600')}>
          {badge}
        </span>
      )}
    </button>
  );
}

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { activeTab } = useTabs();

  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn('mt-4 animate-fade-in', className)}
    >
      {children}
    </div>
  );
}
