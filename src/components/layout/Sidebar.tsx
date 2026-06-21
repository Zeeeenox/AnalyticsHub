import React from 'react';
import { cn } from '../../utils';
import {
  LayoutGrid,
  TrendingUp,
  Users,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { DashboardModule } from '../../types';
import { Tooltip } from '../ui/Tooltip';

const navItems: { id: DashboardModule; label: string; icon: React.ReactNode }[] = [
  { id: 'executive', label: 'Executive Overview', icon: <LayoutGrid className="w-5 h-5" /> },
  { id: 'sales', label: 'Sales Analytics', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
  { id: 'team', label: 'Team Performance', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'reports', label: 'Reports & Insights', icon: <FileText className="w-5 h-5" /> },
];

const bottomNavItems = [
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  { id: 'help', label: 'Help & Support', icon: <HelpCircle className="w-5 h-5" /> },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { state, setModule, toggleSidebar } = useDashboard();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-white border-r border-secondary-200 transition-all duration-300',
        state.sidebarOpen ? 'w-64' : 'w-20',
        className
      )}
      aria-label="Main navigation"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-secondary-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {state.sidebarOpen && (
              <div className="animate-fade-in">
                <span className="font-semibold text-secondary-900">Analytics</span>
                <span className="text-primary-600 font-semibold">Hub</span>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 transition-colors"
            aria-label={state.sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {state.sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1" role="menu">
            {navItems.map((item) => (
              <li key={item.id} role="none">
                {state.sidebarOpen ? (
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all',
                      state.activeModule === item.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800'
                    )}
                    onClick={() => setModule(item.id)}
                    role="menuitem"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Tooltip content={item.label} position="right">
                    <button
                      className={cn(
                        'w-full flex items-center justify-center py-2.5 rounded-lg transition-all',
                        state.activeModule === item.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800'
                      )}
                      onClick={() => setModule(item.id)}
                      role="menuitem"
                    >
                      {item.icon}
                    </button>
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom navigation */}
        <div className="px-3 py-4 border-t border-secondary-200">
          <ul className="space-y-1" role="menu">
            {bottomNavItems.map((item) => (
              <li key={item.id} role="none">
                {state.sidebarOpen ? (
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800 transition-all"
                    role="menuitem"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Tooltip content={item.label} position="right">
                    <button
                      className="w-full flex items-center justify-center py-2.5 rounded-lg text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800 transition-all"
                      role="menuitem"
                    >
                      {item.icon}
                    </button>
                  </Tooltip>
                )}
              </li>
            ))}
            <li role="none">
              {state.sidebarOpen ? (
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800 transition-all"
                  role="menuitem"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Tooltip content="Sign Out" position="right">
                  <button
                    className="w-full flex items-center justify-center py-2.5 rounded-lg text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800 transition-all"
                    role="menuitem"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </Tooltip>
              )}
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { state, setModule } = useDashboard();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-secondary-900/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-secondary-200 animate-slide-in lg:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 h-16 px-4 border-b border-secondary-200">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-semibold text-secondary-900">Analytics</span>
            <span className="text-primary-600 font-semibold">Hub</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all',
                      state.activeModule === item.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800'
                    )}
                    onClick={() => {
                      setModule(item.id);
                      onClose();
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
