import { SalesOpportunity, Customer, TeamMember, Report, Insight, KPI, RegionalData, FunnelStage } from '../types';

// KPIs
export const executiveKPIs: KPI[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$2.4M',
    change: 12.5,
    changeType: 'positive',
    trend: [1800000, 1950000, 2100000, 2200000, 2350000, 2400000, 2400000],
    icon: 'dollar',
    format: 'currency',
  },
  {
    id: 'profit-margin',
    label: 'Profit Margin',
    value: '23.4%',
    change: 3.2,
    changeType: 'positive',
    trend: [18, 20, 21, 22, 22.5, 23, 23.4],
    icon: 'percent',
    format: 'percent',
  },
  {
    id: 'customers',
    label: 'Active Customers',
    value: '1,847',
    change: 8.3,
    changeType: 'positive',
    trend: [1500, 1600, 1700, 1750, 1800, 1830, 1847],
    icon: 'users',
    format: 'number',
  },
  {
    id: 'arr',
    label: 'Annual Recurring Revenue',
    value: '$4.2M',
    change: 15.8,
    changeType: 'positive',
    trend: [3200000, 3400000, 3600000, 3800000, 4000000, 4100000, 4200000],
    icon: 'trending',
    format: 'currency',
  },
];

// Sales Opportunities
export const salesOpportunities: SalesOpportunity[] = [
  { id: '1', name: 'Enterprise License Deal', company: 'TechCorp Inc.', value: 250000, stage: 'negotiation', probability: 80, expectedClose: new Date('2024-03-15'), owner: 'Sarah Johnson', contact: 'john.doe@techcorp.com' },
  { id: '2', name: 'Platform Migration', company: 'Global Systems', value: 180000, stage: 'proposal', probability: 60, expectedClose: new Date('2024-04-01'), owner: 'Mike Chen', contact: 'jane.smith@global.com' },
  { id: '3', name: 'Security Suite', company: 'FinancePro', value: 120000, stage: 'qualification', probability: 40, expectedClose: new Date('2024-05-20'), owner: 'Emily Davis', contact: 'bob@financepro.com' },
  { id: '4', name: 'Analytics Platform', company: 'DataDriven LLC', value: 95000, stage: 'prospecting', probability: 20, expectedClose: new Date('2024-06-10'), owner: 'James Wilson', contact: 'sarah@datadriven.com' },
  { id: '5', name: 'Cloud Integration', company: 'CloudFirst', value: 320000, stage: 'closed-won', probability: 100, expectedClose: new Date('2024-02-28'), owner: 'Lisa Brown', contact: 'tom@cloudfirst.com' },
  { id: '6', name: 'Support Services', company: 'StartupXYZ', value: 45000, stage: 'qualification', probability: 50, expectedClose: new Date('2024-04-15'), owner: 'Sarah Johnson', contact: 'alex@startupxyz.com' },
];

// Sales Funnel
export const salesFunnel: FunnelStage[] = [
  { label: 'Leads', value: 1250, percentage: 100 },
  { label: 'Qualified', value: 480, percentage: 38.4 },
  { label: 'Proposals', value: 185, percentage: 14.8 },
  { label: 'Negotiations', value: 95, percentage: 7.6 },
  { label: 'Won', value: 68, percentage: 5.4 },
];

// Regional Sales Data
export const regionalSales: RegionalData[] = [
  { region: 'North America', value: 1250000, change: 15.2, breakdown: [{ label: 'US', value: 980000 }, { label: 'Canada', value: 270000 }] },
  { region: 'Europe', value: 780000, change: 8.5, breakdown: [{ label: 'UK', value: 340000 }, { label: 'Germany', value: 280000 }, { label: 'France', value: 160000 }] },
  { region: 'Asia Pacific', value: 540000, change: 22.3, breakdown: [{ label: 'Japan', value: 230000 }, { label: 'Australia', value: 180000 }, { label: 'Others', value: 130000 }] },
  { region: 'Latin America', value: 180000, change: -3.2, breakdown: [{ label: 'Brazil', value: 95000 }, { label: 'Mexico', value: 85000 }] },
];

// Revenue Time Series
export const revenueData: { month: string; current: number; previous: number; projected: number }[] = [
  { month: 'Jan', current: 320000, previous: 280000, projected: 340000 },
  { month: 'Feb', current: 340000, previous: 300000, projected: 360000 },
  { month: 'Mar', current: 380000, previous: 320000, projected: 400000 },
  { month: 'Apr', current: 420000, previous: 340000, projected: 440000 },
  { month: 'May', current: 450000, previous: 360000, projected: 480000 },
  { month: 'Jun', current: 480000, previous: 380000, projected: 520000 },
];

// Customers
export const customers: Customer[] = [
  { id: '1', name: 'John Doe', company: 'TechCorp Inc.', email: 'john@techcorp.com', plan: 'enterprise', status: 'active', mrr: 15000, signupDate: new Date('2023-01-15'), lastActive: new Date('2024-02-20'), satisfactionScore: 9.2, segment: 'enterprise' },
  { id: '2', name: 'Jane Smith', company: 'Global Systems', email: 'jane@global.com', plan: 'professional', status: 'active', mrr: 2500, signupDate: new Date('2023-03-20'), lastActive: new Date('2024-02-18'), satisfactionScore: 8.5, segment: 'mid-market' },
  { id: '3', name: 'Bob Johnson', company: 'StartupXYZ', email: 'bob@startup.com', plan: 'basic', status: 'trialing', mrr: 500, signupDate: new Date('2024-02-01'), lastActive: new Date('2024-02-21'), satisfactionScore: 7.8, segment: 'smb' },
  { id: '4', name: 'Alice Brown', company: 'FinancePro', email: 'alice@financepro.com', plan: 'enterprise', status: 'active', mrr: 18500, signupDate: new Date('2022-11-10'), lastActive: new Date('2024-02-19'), satisfactionScore: 9.5, segment: 'enterprise' },
  { id: '5', name: 'Charlie Wilson', company: 'OldClient LLC', email: 'charlie@oldclient.com', plan: 'basic', status: 'churned', mrr: 0, signupDate: new Date('2022-06-15'), lastActive: new Date('2024-01-05'), satisfactionScore: 5.2, segment: 'smb' },
  { id: '6', name: 'Diana Martinez', company: 'DataDriven', email: 'diana@datadriven.com', plan: 'professional', status: 'active', mrr: 3200, signupDate: new Date('2023-08-22'), lastActive: new Date('2024-02-21'), satisfactionScore: 8.9, segment: 'mid-market' },
];

// Customer Segments
export const customerSegments = [
  { segment: 'Enterprise', count: 245, mrr: 1450000, growth: 12 },
  { segment: 'Mid-Market', count: 580, mrr: 980000, growth: 18 },
  { segment: 'SMB', count: 1022, mrr: 520000, growth: 5 },
];

// Team Members
export const teamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Johnson', avatar: '', role: 'Senior Sales Rep', department: 'Sales', productivity: 94, tasksCompleted: 47, tasksTotal: 50, metrics: [{ label: 'Deals Closed', value: 12, target: 10 }, { label: 'Pipeline Value', value: 850000, target: 750000 }] },
  { id: '2', name: 'Mike Chen', avatar: '', role: 'Account Executive', department: 'Sales', productivity: 87, tasksCompleted: 31, tasksTotal: 35, metrics: [{ label: 'Deals Closed', value: 8, target: 8 }, { label: 'Pipeline Value', value: 620000, target: 600000 }] },
  { id: '3', name: 'Emily Davis', avatar: '', role: 'Sales Development Rep', department: 'Sales', productivity: 92, tasksCompleted: 85, tasksTotal: 90, metrics: [{ label: 'Leads Generated', value: 156, target: 150 }, { label: 'Meetings Set', value: 34, target: 30 }] },
  { id: '4', name: 'James Wilson', avatar: '', role: 'Customer Success Manager', department: 'Customer Success', productivity: 91, tasksCompleted: 28, tasksTotal: 30, metrics: [{ label: 'NPS Score', value: 48, target: 45 }, { label: 'Renewal Rate', value: 95, target: 90 }] },
  { id: '5', name: 'Lisa Brown', avatar: '', role: 'Account Executive', department: 'Sales', productivity: 89, tasksCompleted: 39, tasksTotal: 42, metrics: [{ label: 'Deals Closed', value: 10, target: 10 }, { label: 'Pipeline Value', value: 720000, target: 700000 }] },
  { id: '6', name: 'David Lee', avatar: '', role: 'Customer Success Manager', department: 'Customer Success', productivity: 78, tasksCompleted: 25, tasksTotal: 32, metrics: [{ label: 'NPS Score', value: 42, target: 45 }, { label: 'Renewal Rate', value: 88, target: 90 }] },
];

// Department Performance
export const departmentPerformance = [
  { department: 'Sales', productivity: 90, target: 85, trend: 'up' },
  { department: 'Customer Success', productivity: 85, target: 88, trend: 'stable' },
  { department: 'Marketing', productivity: 92, target: 85, trend: 'up' },
  { department: 'Operations', productivity: 88, target: 90, trend: 'down' },
];

// Reports
export const reports: Report[] = [
  { id: '1', title: 'Q4 2023 Executive Summary', type: 'executive', generatedAt: new Date('2024-01-15'), status: 'ready', format: 'pdf', size: '2.4 MB' },
  { id: '2', title: 'Monthly Sales Report - January', type: 'sales', generatedAt: new Date('2024-02-05'), status: 'ready', format: 'excel', size: '1.8 MB' },
  { id: '3', title: 'Customer Health Analysis', type: 'customer', generatedAt: new Date('2024-02-01'), status: 'ready', format: 'pdf', size: '3.1 MB' },
  { id: '4', title: 'Team Performance Q1', type: 'team', generatedAt: new Date(), status: 'generating', format: 'pdf' },
  { id: '5', title: 'Revenue Forecast 2024', type: 'sales', generatedAt: new Date('2024-02-10'), status: 'scheduled', format: 'pdf', size: '1.2 MB' },
];

// Insights
export const insights: Insight[] = [
  { id: '1', title: 'Revenue opportunity detected', description: 'Enterprise segment shows 15% higher conversion rate for Q1 trials. Consider increasing marketing spend for this segment.', type: 'opportunity', priority: 'high', source: 'ai', action: { label: 'View Analysis', url: '/analysis/1' } },
  { id: '2', title: 'Churn risk alert', description: '12 customers in the mid-market segment show decreased engagement. Immediate outreach recommended to prevent churn.', type: 'risk', priority: 'high', source: 'ai', action: { label: 'View Customers', url: '/customers?filter=at-risk' } },
  { id: '3', title: 'Sales trend identified', description: 'Deal velocity increased by 18% after introducing new proposal templates in January. Recommendation: Deploy across all regions.', type: 'recommendation', priority: 'medium', source: 'ai' },
  { id: '4', title: 'Team productivity insight', description: 'Customer Success team response time improved by 25% after new tool adoption. Consider similar tools for Sales team.', type: 'recommendation', priority: 'low', source: 'ai' },
  { id: '5', title: 'Growth trend', description: 'APAC region showing 22% growth rate, outpacing other regions. Opportunity to expand team and resources.', type: 'trend', priority: 'high', source: 'ai', action: { label: 'View Regional Data', url: '/sales?region=apac' } },
];

// Monthly Performance
export const monthlyPerformance: { month: string; revenue: number; expenses: number; profit: number }[] = [
  { month: 'Aug', revenue: 380000, expenses: 280000, profit: 100000 },
  { month: 'Sep', revenue: 420000, expenses: 295000, profit: 125000 },
  { month: 'Oct', revenue: 450000, expenses: 310000, profit: 140000 },
  { month: 'Nov', revenue: 485000, expenses: 325000, profit: 160000 },
  { month: 'Dec', revenue: 520000, expenses: 340000, profit: 180000 },
  { month: 'Jan', revenue: 340000, expenses: 260000, profit: 80000 },
  { month: 'Feb', revenue: 380000, expenses: 275000, profit: 105000 },
];
