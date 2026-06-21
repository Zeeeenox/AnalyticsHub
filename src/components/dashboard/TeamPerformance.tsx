import { useState } from 'react';
import { cn, formatNumber } from '../../utils';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Table } from '../ui/Table';
import { Progress, CircularProgress } from '../ui/Progress';
import { SearchInput } from '../ui/Input';
import { Select } from '../ui/Select';
import { Avatar } from '../ui/Avatar';
import { LineChart } from '../charts/Charts';
import {
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle,
  Award,
  Filter,
  Download,
  Calendar,
  ChevronRight,
  Activity,
  Zap,
} from 'lucide-react';
import { teamMembers, departmentPerformance } from '../../utils/mockData';
import { TeamMember } from '../../types';

export function TeamPerformance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [tablePage, setTablePage] = useState(1);

  const avgProductivity = Math.round(teamMembers.reduce((sum, m) => sum + m.productivity, 0) / teamMembers.length);
  const totalTasksCompleted = teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0);
  const totalTasksTotal = teamMembers.reduce((sum, m) => sum + m.tasksTotal, 0);
  const taskCompletionRate = Math.round((totalTasksCompleted / totalTasksTotal) * 100);
  const topPerformers = teamMembers.filter(m => m.productivity >= 90).length;

  const filteredMembers = teamMembers.filter(m => {
    const matchesSearch = searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || m.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const performanceData = [
    { label: 'Mon', value: 85 },
    { label: 'Tue', value: 92 },
    { label: 'Wed', value: 88 },
    { label: 'Thu', value: 91 },
    { label: 'Fri', value: 94 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Team Performance</h1>
          <p className="text-sm text-secondary-500 mt-1">Monitor team productivity and goals</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button variant="primary" icon={<Calendar className="w-4 h-4" />}>
            Schedule Review
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Avg. Productivity</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{avgProductivity}%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-success-500" />
                <span className="text-xs text-success-600">+5% vs last week</span>
              </div>
            </div>
            <CircularProgress value={avgProductivity} size={56} strokeWidth={6} variant={avgProductivity >= 90 ? 'success' : avgProductivity >= 75 ? 'primary' : 'warning'} showLabel={false} />
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Tasks Completed</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{formatNumber(totalTasksCompleted)}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-secondary-500">of {totalTasksTotal} total</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Task Rate</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{taskCompletionRate}%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-success-500" />
                <span className="text-xs text-success-600">+3% efficiency</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Top Performers</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{topPerformers}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-secondary-500">{Math.round((topPerformers / teamMembers.length) * 100)}% of team</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-accent-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-secondary-900">Department Performance</h3>
              <p className="text-sm text-secondary-500">Productivity by department</p>
            </div>
            <Select
              options={[
                { label: 'This Week', value: 'week' },
                { label: 'This Month', value: 'month' },
                { label: 'This Quarter', value: 'quarter' },
              ]}
              value="week"
              onChange={() => {}}
              className="w-32"
            />
          </div>
          <div className="space-y-4">
            {departmentPerformance.map((dept) => {
              const isAboveTarget = dept.productivity >= dept.target;
              return (
                <div key={dept.department} className="p-4 rounded-lg bg-secondary-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        isAboveTarget ? 'bg-success-100' : 'bg-warning-100'
                      )}>
                        {isAboveTarget ? (
                          <TrendingUp className={cn('w-5 h-5', isAboveTarget ? 'text-success-600' : 'text-warning-600')} />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-warning-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{dept.department}</p>
                        <p className="text-xs text-secondary-500">Target: {dept.target}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn('text-2xl font-semibold', isAboveTarget ? 'text-success-600' : 'text-warning-600')}>
                        {dept.productivity}%
                      </p>
                      <Badge variant={isAboveTarget ? 'success' : 'warning'} size="sm">
                        {isAboveTarget ? 'On Track' : 'Behind'}
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    value={dept.productivity}
                    variant={isAboveTarget ? 'success' : 'warning'}
                    size="sm"
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Weekly Trend */}
        <Card padding="lg">
          <div className="mb-4">
            <h3 className="font-semibold text-secondary-900">Weekly Trend</h3>
            <p className="text-sm text-secondary-500">Team productivity over time</p>
          </div>
          <LineChart
            data={[{ label: 'Productivity', values: performanceData.map(d => d.value), color: '#3b82f6' }]}
            labels={performanceData.map(d => d.label)}
            height={180}
            showGrid={true}
            showDots={true}
            showLegend={false}
          />
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-secondary-200">
            <div className="text-center">
              <p className="text-sm text-secondary-500">Peak Day</p>
              <p className="text-lg font-semibold text-secondary-900">Friday</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-secondary-500">Best Score</p>
              <p className="text-lg font-semibold text-success-600">94%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-secondary-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-secondary-900">Team Members</h3>
              <p className="text-sm text-secondary-500">{filteredMembers.length} members</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <SearchInput
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select
                options={[
                  { label: 'All Departments', value: 'all' },
                  { label: 'Sales', value: 'Sales' },
                  { label: 'Customer Success', value: 'Customer Success' },
                  { label: 'Marketing', value: 'Marketing' },
                  { label: 'Operations', value: 'Operations' },
                ]}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
                className="w-full sm:w-40"
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
              label: 'Member',
              sortable: true,
              render: (value, row) => (
                <div className="flex items-center gap-3">
                  <Avatar name={value as string} size="md" />
                  <div>
                    <p className="font-medium text-secondary-900">{value as string}</p>
                    <p className="text-xs text-secondary-500">{(row as TeamMember).role}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'department',
              label: 'Department',
              sortable: true,
              render: (value) => (
                <Badge variant="secondary">{value as string}</Badge>
              ),
            },
            {
              key: 'productivity',
              label: 'Productivity',
              align: 'center',
              sortable: true,
              render: (value) => {
                const score = value as number;
                const color = score >= 90 ? 'success' : score >= 75 ? 'warning' : 'error';
                return (
                  <div className="w-24">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className={cn('text-sm font-semibold', score >= 90 ? 'text-success-600' : score >= 75 ? 'text-warning-600' : 'text-error-600')}>
                        {score}%
                      </span>
                      {score >= 90 && <Award className="w-4 h-4 text-warning-500" />}
                    </div>
                    <Progress value={score} variant={color} size="sm" showLabel={false} />
                  </div>
                );
              },
            },
            {
              key: 'tasksCompleted',
              label: 'Tasks',
              align: 'center',
              render: (value, row) => {
                const completed = value as number;
                const total = (row as TeamMember).tasksTotal;
                return (
                  <div className="text-center">
                    <p className="text-sm font-medium text-secondary-900">{completed} / {total}</p>
                    <p className="text-xs text-secondary-500">{Math.round((completed / total) * 100)}%</p>
                  </div>
                );
              },
            },
            {
              key: 'metrics',
              label: 'Key Metrics',
              render: (value) => {
                const metrics = value as TeamMember['metrics'];
                return (
                  <div className="flex flex-col gap-1">
                    {metrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-secondary-500">{m.label}:</span>
                        <span className={cn(
                          'font-medium',
                          m.value >= m.target ? 'text-success-600' : 'text-warning-600'
                        )}>
                          {m.label.includes('Pipeline') || m.label.includes('Value') ? `$${(m.value / 1000).toFixed(0)}k` : m.value}
                        </span>
                        {m.value >= m.target && <CheckCircle className="w-3 h-3 text-success-500" />}
                      </div>
                    ))}
                  </div>
                );
              },
            },
            {
              key: 'actions',
              label: '',
              width: '60px',
              render: () => (
                <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />}>
                </Button>
              ),
            },
          ]}
          data={filteredMembers}
          keyExtractor={(row) => row.id}
          pagination={{
            page: tablePage,
            pageSize: 10,
            total: filteredMembers.length,
            onPageChange: setTablePage,
          }}
          onRowClick={(row) => console.log('View member:', row)}
        />
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="md" className="bg-gradient-to-br from-primary-600 to-primary-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <p className="text-sm opacity-80">Active Today</p>
              <p className="text-2xl font-semibold">{teamMembers.length} / {teamMembers.length}</p>
            </div>
          </div>
        </Card>

        <Card padding="md" className="bg-gradient-to-br from-accent-500 to-accent-600">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <p className="text-sm opacity-80">Productivity Score</p>
              <p className="text-2xl font-semibold">{avgProductivity}/100</p>
            </div>
          </div>
        </Card>

        <Card padding="md" className="bg-gradient-to-br from-success-500 to-success-600">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <p className="text-sm opacity-80">Goals Achieved</p>
              <p className="text-2xl font-semibold">87%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
