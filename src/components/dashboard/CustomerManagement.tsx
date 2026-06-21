import { useState } from 'react';
import { cn, formatCurrency, formatDate } from '../../utils';
import { Card } from '../ui/Card';
import { Badge, StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Table } from '../ui/Table';
import { Progress } from '../ui/Progress';
import { SearchInput } from '../ui/Input';
import { Select } from '../ui/Select';
import { Avatar } from '../ui/Avatar';
import { DonutChart } from '../charts/Charts';
import {
  Users,
  UserPlus,
  TrendingUp,
  TrendingDown,
  Download,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  X,
} from 'lucide-react';
import { customers, customerSegments } from '../../utils/mockData';
import { Customer } from '../../types';

const planColors: Record<string, string> = {
  enterprise: 'primary',
  professional: 'accent',
  basic: 'secondary',
};

const segmentColors: Record<string, string> = {
  enterprise: '#3b82f6',
  'mid-market': '#10b981',
  smb: '#f59e0b',
};

export function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [tablePage, setTablePage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const trialingCustomers = customers.filter(c => c.status === 'trialing').length;
  const churnedCustomers = customers.filter(c => c.status === 'churned').length;
  const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0);
  const avgSatisfaction = customers.filter(c => c.status !== 'churned').reduce((sum, c) => sum + c.satisfactionScore, 0) / (activeCustomers + trialingCustomers);

  const churnRate = Math.round((churnedCustomers / customers.length) * 100 * 10) / 10;
  const netRetention = 94.5;

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = searchQuery === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = selectedSegment === 'all' || c.segment === selectedSegment;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;
    return matchesSearch && matchesSegment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Customer Management</h1>
          <p className="text-sm text-secondary-500 mt-1">Monitor customer health and engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button variant="primary" icon={<UserPlus className="w-4 h-4" />}>
            Add Customer
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Active Customers</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{activeCustomers}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-success-500" />
            <span className="text-xs text-success-600">+8.3% growth</span>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Total MRR</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{formatCurrency(totalMrr, true)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-success-500" />
            <span className="text-xs text-success-600">+12.5% MoM</span>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Churn Rate</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{churnRate}%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-warning-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingDown className="w-3 h-3 text-success-500" />
            <span className="text-xs text-success-600">-2.1% improvement</span>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Net Retention</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{netRetention}%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3 text-success-500" />
            <span className="text-xs text-success-600">+3.2% increase</span>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Avg. Satisfaction</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{avgSatisfaction.toFixed(1)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-warning-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-warning-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3 h-3 text-warning-500" />
            <span className="text-xs text-secondary-500">Out of 10</span>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Segment Distribution */}
        <Card padding="lg">
          <div className="mb-4">
            <h3 className="font-semibold text-secondary-900">Segment Distribution</h3>
            <p className="text-sm text-secondary-500">Customers by segment</p>
          </div>
          <div className="flex items-center justify-center pb-12">
            <DonutChart
              data={customerSegments.map(s => ({
                label: s.segment,
                value: s.count,
                color: segmentColors[s.segment.toLowerCase()]
              }))}
              size={160}
              strokeWidth={35}
              showLegend={true}
              showCenter={true}
              centerValue={customers.length.toString()}
              centerLabel="Total"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2 pt-4 border-t border-secondary-200">
            {customerSegments.map((seg) => (
              <div key={seg.segment} className="text-center">
                <p className="text-xs text-secondary-500">{seg.segment}</p>
                <p className="text-lg font-semibold text-secondary-900">{seg.count}</p>
                <p className="text-xs text-primary-600">{formatCurrency(seg.mrr, true)} MRR</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Customer Health Overview */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-secondary-900">Customer Health Score</h3>
              <p className="text-sm text-secondary-500">Overall customer health distribution</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-success-50 border border-success-200">
              <CheckCircle className="w-8 h-8 text-success-500 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-success-700">156</p>
              <p className="text-sm text-success-600">Healthy</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning-50 border border-warning-200">
              <Clock className="w-8 h-8 text-warning-500 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-warning-700">24</p>
              <p className="text-sm text-warning-600">At Risk</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-error-50 border border-error-200">
              <AlertTriangle className="w-8 h-8 text-error-500 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-error-700">8</p>
              <p className="text-sm text-error-600">Critical</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Engagement Score</span>
              <span className="text-sm font-medium text-secondary-900">78 / 100</span>
            </div>
            <Progress value={78} variant="success" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Product Adoption</span>
              <span className="text-sm font-medium text-secondary-900">85 / 100</span>
            </div>
            <Progress value={85} variant="success" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600">Support Health</span>
              <span className="text-sm font-medium text-secondary-900">92 / 100</span>
            </div>
            <Progress value={92} variant="success" />
          </div>
        </Card>
      </div>

      {/* Customer List */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-secondary-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-secondary-900">Customer Directory</h3>
              <p className="text-sm text-secondary-500">{filteredCustomers.length} customers</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <SearchInput
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select
                options={[
                  { label: 'All Segments', value: 'all' },
                  { label: 'Enterprise', value: 'enterprise' },
                  { label: 'Mid-Market', value: 'mid-market' },
                  { label: 'SMB', value: 'smb' },
                ]}
                value={selectedSegment}
                onChange={setSelectedSegment}
                className="w-full sm:w-40"
              />
              <Select
                options={[
                  { label: 'All Status', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Trialing', value: 'trialing' },
                  { label: 'Churned', value: 'churned' },
                ]}
                value={selectedStatus}
                onChange={setSelectedStatus}
                className="w-full sm:w-36"
              />
            </div>
          </div>
        </div>

        <Table
          columns={[
            {
              key: 'name',
              label: 'Customer',
              sortable: true,
              render: (value, row) => (
                <div className="flex items-center gap-3">
                  <Avatar name={(row as Customer).company} size="md" />
                  <div>
                    <p className="font-medium text-secondary-900">{value as string}</p>
                    <p className="text-xs text-secondary-500">{(row as Customer).company}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'email',
              label: 'Contact',
              render: (value) => (
                <div className="flex items-center gap-1.5 text-secondary-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{value as string}</span>
                </div>
              ),
            },
            {
              key: 'plan',
              label: 'Plan',
              sortable: true,
              render: (value) => (
                <Badge variant={planColors[value as string] as 'primary' | 'secondary' | 'accent'}>
                  {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
                </Badge>
              ),
            },
            {
              key: 'segment',
              label: 'Segment',
              sortable: true,
              render: (value) => (
                <span className="text-secondary-700 capitalize">{(value as string).replace('-', ' ')}</span>
              ),
            },
            {
              key: 'mrr',
              label: 'MRR',
              align: 'right',
              sortable: true,
              render: (value) => (
                <span className="font-medium text-secondary-900">{formatCurrency(value as number, true)}</span>
              ),
            },
            {
              key: 'satisfactionScore',
              label: 'Satisfaction',
              align: 'center',
              sortable: true,
              render: (value) => {
                const score = value as number;
                const color = score >= 8 ? 'text-success-600' : score >= 6 ? 'text-warning-600' : 'text-error-600';
                return (
                  <div className="flex items-center justify-center gap-1">
                    <Star className={cn('w-4 h-4', color)} />
                    <span className={cn('font-medium', color)}>{score.toFixed(1)}</span>
                  </div>
                );
              },
            },
            {
              key: 'status',
              label: 'Status',
              sortable: true,
              render: (value) => <StatusBadge status={value as string} />,
            },
          ]}
          data={filteredCustomers}
          keyExtractor={(row) => row.id}
          pagination={{
            page: tablePage,
            pageSize: 10,
            total: filteredCustomers.length,
            onPageChange: setTablePage,
          }}
          onRowClick={(row) => setSelectedCustomer(row)}
        />
      </Card>

      {/* Customer Detail Slideout - shown when customer selected */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 bg-secondary-900/50"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900">Customer Details</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-lg text-secondary-500 hover:bg-secondary-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-73px)]">
              <div className="flex items-center gap-4">
                <Avatar name={selectedCustomer.company} size="lg" />
                <div>
                  <p className="font-semibold text-secondary-900">{selectedCustomer.name}</p>
                  <p className="text-sm text-secondary-500">{selectedCustomer.company}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-secondary-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedCustomer.status} />
                </div>
              </div>

              <div className="pt-4 border-t border-secondary-200">
                <h3 className="font-medium text-secondary-900 mb-3">Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary-500">MRR</span>
                    <span className="font-medium text-secondary-900">{formatCurrency(selectedCustomer.mrr, true)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Plan</span>
                    <Badge variant={planColors[selectedCustomer.plan] as 'primary' | 'secondary' | 'accent'}>
                      {selectedCustomer.plan}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Segment</span>
                    <span className="text-secondary-900 capitalize">{selectedCustomer.segment.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Satisfaction</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning-500" />
                      <span className="text-secondary-900">{selectedCustomer.satisfactionScore.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Signup Date</span>
                    <span className="text-secondary-900">{formatDate(selectedCustomer.signupDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Last Active</span>
                    <span className="text-secondary-900">{formatDate(selectedCustomer.lastActive)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" fullWidth>
                  View Full Profile
                </Button>
                <Button variant="secondary">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
