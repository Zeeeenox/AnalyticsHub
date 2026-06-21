import React, { useState } from 'react';
import { cn } from '../../utils';
import { Sidebar, MobileSidebar } from './Sidebar';
import { Header } from './Header';
import { useDashboard } from '../../context/DashboardContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardLayout({ children, title, subtitle, actions }: DashboardLayoutProps) {
  const { state } = useDashboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Sidebar - desktop only */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main content */}
      <div
        className={cn(
          'transition-all duration-300',
          state.sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        )}
      >
        <Header
          onMenuClick={() => setMobileMenuOpen(true)}
          title={title}
          subtitle={subtitle}
          actions={actions}
        />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
