import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ExecutiveOverview } from './components/dashboard/ExecutiveOverview';
import { SalesAnalytics } from './components/dashboard/SalesAnalytics';
import { CustomerManagement } from './components/dashboard/CustomerManagement';
import { TeamPerformance } from './components/dashboard/TeamPerformance';
import { ReportsInsights } from './components/dashboard/ReportsInsights';

function DashboardContent() {
  const { state } = useDashboard();

  const moduleTitles: Record<string, { title: string; subtitle: string }> = {
    executive: { title: 'Executive Overview', subtitle: 'Business performance snapshot' },
    sales: { title: 'Sales Analytics', subtitle: 'Track your sales pipeline and performance' },
    customers: { title: 'Customer Management', subtitle: 'Monitor customer health and engagement' },
    team: { title: 'Team Performance', subtitle: 'Monitor team productivity and goals' },
    reports: { title: 'Reports & Insights', subtitle: 'Generate reports and view AI-powered insights' },
  };

  const currentModule = moduleTitles[state.activeModule] || moduleTitles.executive;

  const renderModule = () => {
    switch (state.activeModule) {
      case 'executive':
        return <ExecutiveOverview />;
      case 'sales':
        return <SalesAnalytics />;
      case 'customers':
        return <CustomerManagement />;
      case 'team':
        return <TeamPerformance />;
      case 'reports':
        return <ReportsInsights />;
      default:
        return <ExecutiveOverview />;
    }
  };

  return (
    <DashboardLayout title={currentModule.title} subtitle={currentModule.subtitle}>
      {renderModule()}
    </DashboardLayout>
  );
}

function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}

export default App;
