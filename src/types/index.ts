export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'analyst' | 'executive';
  department: string;
}

export interface KPI {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  trend: number[];
  icon?: string;
  format?: 'currency' | 'percent' | 'number';
}

export interface KPICardProps {
  kpi: KPI;
  onClick?: () => void;
  className?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number | string;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface SalesOpportunity {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedClose: Date;
  owner: string;
  contact: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'churned' | 'trialing';
  mrr: number;
  signupDate: Date;
  lastActive: Date;
  satisfactionScore: number;
  segment: 'enterprise' | 'mid-market' | 'smb';
}

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
  productivity: number;
  tasksCompleted: number;
  tasksTotal: number;
  metrics: {
    label: string;
    value: number;
    target: number;
  }[];
}

export interface Report {
  id: string;
  title: string;
  type: 'executive' | 'sales' | 'customer' | 'team' | 'custom';
  generatedAt: Date;
  status: 'ready' | 'generating' | 'scheduled';
  format: 'pdf' | 'excel' | 'csv';
  size?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'trend';
  priority: 'high' | 'medium' | 'low';
  source: 'ai' | 'manual';
  icon?: string;
  action?: {
    label: string;
    url: string;
  };
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  category?: string;
}

export interface FunnelStage {
  label: string;
  value: number;
  percentage: number;
}

export interface RegionalData {
  region: string;
  value: number;
  change: number;
  breakdown?: {
    label: string;
    value: number;
  }[];
}

export interface FilterConfig {
  id: string;
  label: string;
  type: 'select' | 'multi-select' | 'date-range' | 'text' | 'number-range';
  options?: { label: string; value: string }[];
  value: unknown;
}

export interface TableConfig<T> {
  columns: {
    key: keyof T;
    label: string;
    sortable?: boolean;
    format?: (value: unknown) => string;
    align?: 'left' | 'center' | 'right';
    width?: string;
  }[];
  data: T[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
  selectable?: boolean;
  onRowClick?: (row: T) => void;
}

export type ViewMode = 'grid' | 'list' | 'table';

export type TimeRange = 'today' | '7d' | '30d' | '90d' | 'quarter' | 'year' | 'custom';

export type DashboardModule = 'executive' | 'sales' | 'customers' | 'team' | 'reports';

export interface DashboardState {
  activeModule: DashboardModule;
  sidebarOpen: boolean;
  searchQuery: string;
  notifications: Notification[];
  timeRange: TimeRange;
  filters: Record<string, unknown>;
  loading: boolean;
}
