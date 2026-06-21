import { useState } from 'react';
import { cn, formatDate } from '../../utils';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { Tabs, TabList, Tab, TabPanel } from '../ui/Tabs';
import { SearchInput } from '../ui/Input';
import { Select } from '../ui/Select';
import {
  FileText,
  Download,
  Calendar,
  Clock,
  Plus,
  Sparkles,
  Brain,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  FileDown,
  FileSpreadsheet,
  File,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { reports, insights } from '../../utils/mockData';

const reportTypeConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  executive: { label: 'Executive', icon: <FileText className="w-4 h-4" />, color: 'primary' },
  sales: { label: 'Sales', icon: <TrendingUp className="w-4 h-4" />, color: 'success' },
  customer: { label: 'Customer', icon: <FileText className="w-4 h-4" />, color: 'accent' },
  team: { label: 'Team', icon: <FileText className="w-4 h-4" />, color: 'warning' },
  custom: { label: 'Custom', icon: <FileText className="w-4 h-4" />, color: 'secondary' },
};

const insightTypeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  opportunity: { icon: <Lightbulb className="w-5 h-5" />, color: 'success' },
  risk: { icon: <AlertTriangle className="w-5 h-5" />, color: 'error' },
  recommendation: { icon: <Sparkles className="w-5 h-5" />, color: 'primary' },
  trend: { icon: <TrendingUp className="w-5 h-5" />, color: 'accent' },
};

const fileIcons: Record<string, React.ReactNode> = {
  pdf: <File className="w-5 h-5 text-error-500" />,
  excel: <FileSpreadsheet className="w-5 h-5 text-success-500" />,
  csv: <FileDown className="w-5 h-5 text-accent-500" />,
};

export function ReportsInsights() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredReports = reports.filter(r => {
    const matchesSearch = searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || r.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleGenerateReport = () => {
    alert('Report generation would be triggered here');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-secondary-900">Reports & Insights</h1>
          <p className="text-sm text-secondary-500 mt-1">Generate reports and view AI-powered insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<Calendar className="w-4 h-4" />}>
            Schedule
          </Button>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Total Reports</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{reports.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-secondary-500">{reports.filter(r => r.status === 'ready').length} ready</span>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">AI Insights</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{insights.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
              <Brain className="w-5 h-5 text-accent-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-secondary-500">{insights.filter(i => i.priority === 'high').length} high priority</span>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Scheduled</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{reports.filter(r => r.status === 'scheduled').length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-warning-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-secondary-500">Auto-generated</span>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-500">Processing</p>
              <p className="text-2xl font-semibold text-secondary-900 mt-1">{reports.filter(r => r.status === 'generating').length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-secondary-600 animate-spin" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-secondary-500">In progress</span>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="reports">
        <TabList>
          <Tab value="reports">Reports</Tab>
          <Tab value="insights" badge={insights.length}>AI Insights</Tab>
        </TabList>

        <TabPanel value="reports">
          {/* Reports List */}
          <Card padding="none">
            <div className="px-6 py-4 border-b border-secondary-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-secondary-900">Report Library</h3>
                  <p className="text-sm text-secondary-500">{filteredReports.length} reports available</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <SearchInput
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64"
                  />
                  <Select
                    options={[
                      { label: 'All Types', value: 'all' },
                      { label: 'Executive', value: 'executive' },
                      { label: 'Sales', value: 'sales' },
                      { label: 'Customer', value: 'customer' },
                      { label: 'Team', value: 'team' },
                    ]}
                    value={selectedType}
                    onChange={setSelectedType}
                    className="w-full sm:w-36"
                  />
                </div>
              </div>
            </div>

            <div className="divide-y divide-secondary-100">
              {filteredReports.map((report) => {
                const config = reportTypeConfig[report.type];
                const isGenerating = report.status === 'generating';
                const isScheduled = report.status === 'scheduled';

                return (
                  <div
                    key={report.id}
                    className="px-6 py-4 hover:bg-secondary-50 transition-colors cursor-pointer"
                    onClick={() => !isGenerating && alert(`Download report: ${report.title}`)}
                    role="button"
                    tabIndex={isGenerating ? -1 : 0}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-12 h-12 rounded-lg flex items-center justify-center',
                        config.color === 'primary' ? 'bg-primary-100' :
                        config.color === 'success' ? 'bg-success-100' :
                        config.color === 'accent' ? 'bg-accent-100' :
                        config.color === 'warning' ? 'bg-warning-100' : 'bg-secondary-100'
                      )}>
                        {fileIcons[report.format]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-secondary-900 truncate">{report.title}</p>
                          {isGenerating && (
                            <Badge variant="warning" size="sm">
                              <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                              Generating
                            </Badge>
                          )}
                          {isScheduled && (
                            <Badge variant="primary" size="sm">
                              <Clock className="w-3 h-3 mr-1" />
                              Scheduled
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1.5 text-xs text-secondary-500">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(report.generatedAt)}
                          </div>
                          {report.size && (
                            <span className="text-xs text-secondary-500">{report.size}</span>
                          )}
                          <Badge variant="secondary" size="sm">
                            {report.format.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={config.color as 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'accent'}
                          size="sm"
                        >
                          {config.label}
                        </Badge>
                        {!isGenerating && (
                          <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                    {isGenerating && (
                      <div className="mt-3">
                        <Progress value={65} size="sm" showLabel={false} />
                        <p className="text-xs text-secondary-500 mt-1">Generating... 65% complete</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick Report Templates */}
          <div className="mt-6">
            <h3 className="font-semibold text-secondary-900 mb-4">Quick Templates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Executive Summary', icon: <FileText className="w-6 h-6" />, type: 'executive' },
                { name: 'Sales Pipeline', icon: <TrendingUp className="w-6 h-6" />, type: 'sales' },
                { name: 'Customer Health', icon: <FileText className="w-6 h-6" />, type: 'customer' },
                { name: 'Team Report', icon: <FileText className="w-6 h-6" />, type: 'team' },
              ].map((template) => (
                <Card key={template.name} hoverable padding="md" onClick={() => alert(`Generate ${template.name}`)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                      {template.icon}
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900 text-sm">{template.name}</p>
                      <p className="text-xs text-secondary-500">Generate now</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel value="insights">
          {/* AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Insights Feed */}
            <div className="lg:col-span-2 space-y-4">
              <Card padding="lg" className="bg-gradient-to-br from-primary-600 to-primary-700">
                <div className="flex items-center gap-3 text-white mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Analysis</h3>
                    <p className="text-sm text-white/80">Last updated 5 minutes ago</p>
                  </div>
                </div>
                <p className="text-white/90 mb-4">
                  Based on recent data patterns, I've identified 3 high-priority insights that require your attention.
                  The most critical is a potential churn risk in your enterprise segment.
                </p>
                <Button variant="secondary" icon={<RefreshCw className="w-4 h-4" />}>
                  Refresh Analysis
                </Button>
              </Card>

              <div className="space-y-4">
                {insights.map((insight) => {
                  const config = insightTypeConfig[insight.type];
                  const priorityVariant = insight.priority === 'high' ? 'error' : insight.priority === 'medium' ? 'warning' : 'success';

                  return (
                    <Card key={insight.id} padding="lg" hoverable onClick={() => alert(`View insight: ${insight.title}`)}>
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0',
                          config.color === 'success' ? 'bg-success-100 text-success-600' :
                          config.color === 'error' ? 'bg-error-100 text-error-600' :
                          config.color === 'primary' ? 'bg-primary-100 text-primary-600' : 'bg-accent-100 text-accent-600'
                        )}>
                          {config.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-secondary-900">{insight.title}</h4>
                            <Badge variant={priorityVariant} size="sm">{insight.priority}</Badge>
                          </div>
                          <p className="text-sm text-secondary-600">{insight.description}</p>
                          {insight.action && (
                            <button className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                              {insight.action.label}
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Badge variant="secondary" size="sm">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Priority Summary */}
              <Card padding="lg">
                <h3 className="font-semibold text-secondary-900 mb-4">Priority Summary</h3>
                <div className="space-y-3">
                  {[
                    { label: 'High Priority', count: insights.filter(i => i.priority === 'high').length, color: 'error' },
                    { label: 'Medium Priority', count: insights.filter(i => i.priority === 'medium').length, color: 'warning' },
                    { label: 'Low Priority', count: insights.filter(i => i.priority === 'low').length, color: 'success' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-3 h-3 rounded-full',
                          item.color === 'error' ? 'bg-error-500' :
                          item.color === 'warning' ? 'bg-warning-500' : 'bg-success-500'
                        )} />
                        <span className="text-sm text-secondary-600">{item.label}</span>
                      </div>
                      <span className="font-medium text-secondary-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Insight Categories */}
              <Card padding="lg">
                <h3 className="font-semibold text-secondary-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {[
                    { type: 'opportunity', label: 'Opportunities', icon: <Lightbulb className="w-4 h-4" />, count: insights.filter(i => i.type === 'opportunity').length },
                    { type: 'risk', label: 'Risks', icon: <AlertTriangle className="w-4 h-4" />, count: insights.filter(i => i.type === 'risk').length },
                    { type: 'recommendation', label: 'Recommendations', icon: <Sparkles className="w-4 h-4" />, count: insights.filter(i => i.type === 'recommendation').length },
                    { type: 'trend', label: 'Trends', icon: <TrendingUp className="w-4 h-4" />, count: insights.filter(i => i.type === 'trend').length },
                  ].map((cat) => (
                    <div
                      key={cat.type}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary-50 hover:bg-secondary-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {cat.icon}
                        <span className="text-sm text-secondary-700">{cat.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-secondary-400" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent AI Activity */}
              <Card padding="lg">
                <h3 className="font-semibold text-secondary-900 mb-4">AI Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success-500 mt-2" />
                    <div>
                      <p className="text-sm text-secondary-800">New insight detected</p>
                      <p className="text-xs text-secondary-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                    <div>
                      <p className="text-sm text-secondary-800">Analysis completed</p>
                      <p className="text-xs text-secondary-500">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-warning-500 mt-2" />
                    <div>
                      <p className="text-sm text-secondary-800">Risk alert triggered</p>
                      <p className="text-xs text-secondary-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
