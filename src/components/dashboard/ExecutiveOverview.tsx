import { cn } from '../../utils';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Sparkline, BarChart, LineChart, DonutChart } from '../charts/Charts';
import { Progress } from '../ui/Progress';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Percent,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  Award,
  Briefcase,
} from 'lucide-react';
import { executiveKPIs, revenueData, monthlyPerformance, customerSegments, insights } from '../../utils/mockData';

const iconMap: Record<string, React.ReactNode> = {
  dollar: <DollarSign className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  percent: <Percent className="w-6 h-6" />,
  trending: <Activity className="w-6 h-6" />,
};

export function ExecutiveOverview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Executive Overview</h1>
          <p className="text-sm text-secondary-500 mt-1">Business performance snapshot</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary-500">Last updated: Feb 21, 2024, 3:45 PM</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {executiveKPIs.map((kpi) => (
          <div key={kpi.id} className="card p-6 hover:shadow-card-hover transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-500">{kpi.label}</p>
                <p className="text-2xl font-semibold text-secondary-900 mt-1">{kpi.value}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  {kpi.change >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-success-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-error-500" />
                  )}
                  <span
                    className={cn(
                      'text-sm font-medium',
                      kpi.change >= 0 ? 'text-success-600' : 'text-error-600'
                    )}
                  >
                    {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                  </span>
                  <span className="text-xs text-secondary-400">vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                {iconMap[kpi.icon || 'dollar']}
              </div>
            </div>
            <div className="mt-4">
              <Sparkline
                data={kpi.trend}
                width={140}
                height={30}
                color={kpi.change >= 0 ? '#22c55e' : '#ef4444'}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">Revenue Trend</h3>
              <p className="text-sm text-secondary-500 mt-0.5">Monthly comparison vs previous year</p>
            </div>
            <Badge variant="success" dot>
              +18.2% growth
            </Badge>
          </div>
          <LineChart
            data={[
              { label: 'Current Year', values: revenueData.map(d => d.current), color: '#3b82f6' },
              { label: 'Previous Year', values: revenueData.map(d => d.previous), color: '#94a3b8' },
            ]}
            labels={revenueData.map(d => d.month)}
            height={280}
            showGrid={true}
            showDots={true}
            showLegend={true}
          />
        </Card>

        {/* Customer Segments */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">Customer Segments</h3>
              <p className="text-sm text-secondary-500 mt-0.5">Distribution by segment type</p>
            </div>
            <Badge variant="primary" dot>
              1,847 total
            </Badge>
          </div>
          <div className="flex items-center justify-center pb-16">
            <DonutChart
              data={customerSegments.map(s => ({
                label: s.segment,
                value: s.count,
                color: s.segment === 'Enterprise' ? '#3b82f6' : s.segment === 'Mid-Market' ? '#10b981' : '#f59e0b'
              }))}
              size={180}
              strokeWidth={35}
              showLegend={true}
              showCenter={true}
              centerValue="100%"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-secondary-200">
            {customerSegments.map((segment) => (
              <div key={segment.segment} className="text-center">
                <p className="text-sm font-medium text-secondary-900">{segment.segment}</p>
                <p className="text-lg font-semibold text-primary-600">{segment.count}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {segment.growth >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-success-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-error-500" />
                  )}
                  <span className={cn('text-xs', segment.growth >= 0 ? 'text-success-500' : 'text-error-500')}>
                    {segment.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Performance & Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Performance */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">Monthly Performance</h3>
              <p className="text-sm text-secondary-500 mt-0.5">Revenue, expenses, and profit breakdown</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary-500" />
                <span className="text-secondary-600">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-warning-500" />
                <span className="text-secondary-600">Expenses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-success-500" />
                <span className="text-secondary-600">Profit</span>
              </div>
            </div>
          </div>
          <BarChart
            data={monthlyPerformance.map(dp => ({
              label: dp.month,
              value: dp.revenue,
              color: '#3b82f6'
            }))}
            height={220}
            showLabels={true}
            showValues={false}
          />
        </Card>

        {/* AI Insights */}
        <Card padding="lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">AI Insights</h3>
              <p className="text-xs text-secondary-500">Automated recommendations</p>
            </div>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {insights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className="p-3 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                      insight.type === 'opportunity' && 'bg-success-500',
                      insight.type === 'risk' && 'bg-error-500',
                      insight.type === 'recommendation' && 'bg-primary-500',
                      insight.type === 'trend' && 'bg-accent-500'
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium text-secondary-800">{insight.title}</p>
                    <p className="text-xs text-secondary-500 mt-1 line-clamp-2">{insight.description}</p>
                    <Badge
                      variant={insight.priority === 'high' ? 'error' : insight.priority === 'medium' ? 'warning' : 'success'}
                      size="sm"
                      className="mt-2"
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all insights
          </button>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Goal Completion</p>
              <p className="text-xl font-semibold text-secondary-900">87%</p>
            </div>
          </div>
          <Progress value={87} variant="primary" size="sm" className="mt-3" />
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Deals Won</p>
              <p className="text-xl font-semibold text-secondary-900">68</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <TrendingUp className="w-4 h-4 text-success-500" />
            <span className="text-sm text-success-600">+12 this month</span>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Active Projects</p>
              <p className="text-xl font-semibold text-secondary-900">24</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-sm text-secondary-500">8 due this week</span>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Meetings Today</p>
              <p className="text-xl font-semibold text-secondary-900">6</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="text-sm text-secondary-500">Next at 4:00 PM</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
