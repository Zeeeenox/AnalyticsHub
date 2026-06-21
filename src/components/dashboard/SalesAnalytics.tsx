import { useState } from 'react';
import { cn, formatCurrency } from '../../utils';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Table } from '../ui/Table';
import { Progress } from '../ui/Progress';
import { SearchInput } from '../ui/Input';
import { Select } from '../ui/Select';
import { LineChart, BarChart, FunnelChart } from '../charts/Charts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  BarChart3,
  Filter,
  Download,
  Plus,
  MapPin,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';
import { salesOpportunities, salesFunnel, regionalSales, revenueData } from '../../utils/mockData';
import { SalesOpportunity } from '../../types';

const stageColors: Record<string, string> = {
  prospecting: '#94a3b8',
  qualification: '#60a5fa',
  proposal: '#34d399',
  negotiation: '#fbbf24',
  'closed-won': '#22c55e',
  'closed-lost': '#ef4444',
};

export function SalesAnalytics() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tablePage, setTablePage] = useState(1);

  const pipelineValue = salesOpportunities
    .filter(o => o.stage !== 'closed-won' && o.stage !== 'closed-lost')
    .reduce((sum, o) => sum + o.value * (o.probability / 100), 0);

  const wonDeals = salesOpportunities.filter(o => o.stage === 'closed-won').length;
  const totalDeals = salesOpportunities.length;
  const winRate = Math.round((wonDeals / totalDeals) * 100);

  const filteredOpportunities = salesOpportunities.filter(o =>
    searchQuery === '' || o.name.toLowerCase().includes(searchQuery.toLowerCase()) || o.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Sales Analytics</h1>
          <p className="text-sm text-secondary-500 mt-1">Track your sales pipeline and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
            Add Deal
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Pipeline Value</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">
                {formatCurrency(pipelineValue, true)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-success-500" />
                <span className="text-xs text-success-600">+18% vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Win Rate</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{winRate}%</p>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3 text-success-500" />
                <span className="text-xs text-success-600">+5% improvement</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-success-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Active Deals</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{salesOpportunities.length}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-secondary-500">{wonDeals} won this quarter</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Avg Deal Size</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">
                {formatCurrency(salesOpportunities.reduce((sum, o) => sum + o.value, 0) / salesOpportunities.length, true)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-success-500" />
                <span className="text-xs text-success-600">+12% increase</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-warning-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Funnel */}
        <Card padding="lg">
          <div className="mb-4">
            <h3 className="font-semibold text-secondary-900">Sales Funnel</h3>
            <p className="text-sm text-secondary-500">Lead to conversion flow</p>
          </div>
          <FunnelChart data={salesFunnel} height={240} showLabels={true} showPercentage={true} />
          <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-secondary-200">
            <div className="text-center">
              <p className="text-lg font-semibold text-secondary-900">5.4%</p>
              <p className="text-xs text-secondary-500">Conv. Rate</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-secondary-900">68</p>
              <p className="text-xs text-secondary-500">Won Deals</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-secondary-900">$42k</p>
              <p className="text-xs text-secondary-500">Avg Value</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-secondary-900">62d</p>
              <p className="text-xs text-secondary-500">Cycle Time</p>
            </div>
          </div>
        </Card>

        {/* Forecast Chart */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-secondary-900">Revenue Forecast</h3>
              <p className="text-sm text-secondary-500">Projected vs actual performance</p>
            </div>
            <Select
              options={[
                { label: 'This Quarter', value: 'quarter' },
                { label: 'This Year', value: 'year' },
                { label: 'Custom Range', value: 'custom' },
              ]}
              value="quarter"
              onChange={() => {}}
              className="w-36"
            />
          </div>
          <LineChart
            data={[
              {
                label: 'Current Year',
                values: revenueData.map(d => d.current),
                color: '#3b82f6'
              },
              {
                label: 'Projected',
                values: revenueData.map(d => d.projected),
                color: '#94a3b8'
              },
            ]}
            labels={revenueData.map(d => d.month)}
            height={200}
            showGrid={true}
            showDots={true}
            showLegend={true}
          />
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary-200">
            <div>
              <p className="text-sm text-secondary-500">Forecast Accuracy</p>
              <p className="text-lg font-semibold text-success-600">94.2%</p>
            </div>
            <div>
              <p className="text-sm text-secondary-500">Projected Q1</p>
              <p className="text-lg font-semibold text-secondary-900">$2.38M</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-secondary-500">Gap to Target</p>
              <p className="text-lg font-semibold text-warning-600">$120k</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-secondary-900">Regional Performance</h3>
            <p className="text-sm text-secondary-500">Sales distribution by region</p>
          </div>
          <Select
            options={[
              { label: 'All Regions', value: 'all' },
              ...regionalSales.map(r => ({ label: r.region, value: r.region.toLowerCase().replace(' ', '-') })),
            ]}
            value={selectedRegion}
            onChange={setSelectedRegion}
            className="w-40"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <BarChart
              data={regionalSales.map(r => ({
                label: r.region.split(' ')[0],
                value: r.value,
                color: r.change >= 0 ? '#22c55e' : '#ef4444'
              }))}
              height={220}
              horizontal={true}
              showLabels={true}
              showValues={true}
            />
          </div>
          <div className="space-y-4">
            {regionalSales.map((region) => (
              <div key={region.region} className="p-4 rounded-lg bg-secondary-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary-500" />
                    <span className="font-medium text-secondary-800">{region.region}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {region.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-success-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-error-500" />
                    )}
                    <span className={cn('text-sm font-medium', region.change >= 0 ? 'text-success-600' : 'text-error-600')}>
                      {region.change >= 0 ? '+' : ''}{region.change}%
                    </span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-secondary-900">{formatCurrency(region.value, true)}</p>
                <div className="flex items-center gap-2 mt-2">
                  {region.breakdown?.map((b, i) => (
                    <span key={i} className="text-xs text-secondary-500">
                      {b.label}: {formatCurrency(b.value, true)}
                      {i < region.breakdown!.length - 1 && ' | '}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Pipeline Opportunities */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-secondary-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-secondary-900">Pipeline Opportunities</h3>
              <p className="text-sm text-secondary-500">{filteredOpportunities.length} active opportunities</p>
            </div>
            <div className="flex items-center gap-3">
              <SearchInput
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-64"
              />
              <Button variant="secondary" icon={<Filter className="w-4 h-4" />}>
                Filter
              </Button>
            </div>
          </div>
        </div>
        <Table
          columns={[
            {
              key: 'name',
              label: 'Opportunity',
              sortable: true,
              render: (value, row) => (
                <div>
                  <p className="font-medium text-secondary-900">{value as string}</p>
                  <p className="text-xs text-secondary-500">{(row as SalesOpportunity).company}</p>
                </div>
              ),
            },
            {
              key: 'value',
              label: 'Value',
              sortable: true,
              align: 'right',
              render: (value) => (
                <span className="font-medium text-secondary-900">{formatCurrency(value as number, true)}</span>
              ),
            },
            {
              key: 'stage',
              label: 'Stage',
              sortable: true,
              render: (value) => (
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: stageColors[value as string] }}
                  />
                  <StatusBadge status={value as string} />
                </div>
              ),
            },
            {
              key: 'probability',
              label: 'Probability',
              align: 'center',
              render: (value) => {
                const prob = value as number;
                const variant = prob >= 60 ? 'success' : prob >= 30 ? 'warning' : 'error';
                return (
                  <div className="w-20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-secondary-900">{prob}%</span>
                    </div>
                    <Progress value={prob} size="sm" variant={variant} showLabel={false} />
                  </div>
                );
              },
            },
            {
              key: 'expectedClose',
              label: 'Expected Close',
              sortable: true,
              render: (value) => (
                <div className="flex items-center gap-1.5 text-secondary-600">
                  <Calendar className="w-4 h-4" />
                  {new Date(value as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              ),
            },
            {
              key: 'owner',
              label: 'Owner',
              render: (value) => (
                <span className="text-secondary-700">{value as string}</span>
              ),
            },
          ]}
          data={filteredOpportunities}
          keyExtractor={(row) => row.id}
          pagination={{
            page: tablePage,
            pageSize: 10,
            total: filteredOpportunities.length,
            onPageChange: setTablePage,
          }}
          onRowClick={(row) => console.log('Clicked:', row)}
        />
      </Card>
    </div>
  );
}
