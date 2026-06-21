import { useState } from 'react';
import { cn } from '../../utils';
import {
  Search,
  Bell,
  Menu,
  Calendar,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownDivider } from '../ui/Dropdown';

const timeRangeOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'This quarter', value: 'quarter' },
  { label: 'This year', value: 'year' },
];

const formatDateRange = (range: string | undefined) => {
  const option = timeRangeOptions.find(opt => opt.value === range);
  return option?.label || 'Last 30 days';
};

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ onMenuClick, title, subtitle, actions }: HeaderProps) {
  const { state, setSearch, setTimeRange, markNotificationRead } = useDashboard();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadNotifications = state.notifications.filter((n) => !n.read);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-secondary-200">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            className="p-2 rounded-lg text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100 lg:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page title (hidden on mobile) */}
          {title && (
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-secondary-900">{title}</h1>
              {subtitle && <p className="text-sm text-secondary-500">{subtitle}</p>}
            </div>
          )}
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-xl mx-4">
          <div className={cn('relative', searchFocused && 'max-w-full')}>
            <Search className={cn('absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors', searchFocused ? 'text-primary-500' : 'text-secondary-400')} />
            <input
              type="search"
              placeholder="Search metrics, customers, reports..."
              value={state.searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={cn(
                'w-full pl-10 pr-4 py-2.5 bg-secondary-50 border rounded-lg text-secondary-800 placeholder-secondary-400',
                'transition-all duration-200 focus:outline-none',
                searchFocused
                  ? 'border-primary-500 ring-2 ring-primary-100 bg-white'
                  : 'border-transparent hover:bg-secondary-100'
              )}
              role="search"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Time range filter */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-secondary-600 hover:text-secondary-800 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="hidden lg:inline">{formatDateRange(state.timeRange)}</span>
            </DropdownTrigger>
            <DropdownMenu align="right">
              {timeRangeOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => setTimeRange(option.value as typeof state.timeRange)}
                  active={state.timeRange === option.value}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Notifications */}
          <div className="relative">
            <button
              className={cn(
                'relative p-2 rounded-lg transition-colors',
                showNotifications
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-secondary-600 hover:text-secondary-800 hover:bg-secondary-100'
              )}
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label={`Notifications ${unreadNotifications.length > 0 ? `(${unreadNotifications.length} unread)` : ''}`}
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-dropdown border border-secondary-200 overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between px-4 py-3 border-b border-secondary-200">
                  <h3 className="font-semibold text-secondary-900">Notifications</h3>
                  {unreadNotifications.length > 0 && (
                    <Badge variant="primary">{unreadNotifications.length} new</Badge>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {state.notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-secondary-500">
                      No notifications
                    </div>
                  ) : (
                    state.notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'px-4 py-3 border-b border-secondary-100 cursor-pointer hover:bg-secondary-50',
                          !notification.read && 'bg-primary-50'
                        )}
                        onClick={() => markNotificationRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'w-2 h-2 rounded-full mt-2',
                              notification.type === 'success' && 'bg-success-500',
                              notification.type === 'warning' && 'bg-warning-500',
                              notification.type === 'error' && 'bg-error-500',
                              notification.type === 'info' && 'bg-primary-500'
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-secondary-800 truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-secondary-500 mt-0.5 truncate">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {state.notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-secondary-200">
                    <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User menu */}
          <Dropdown>
            <DropdownTrigger className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary-100 transition-colors">
              <Avatar name="John Smith" size="sm" />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-secondary-800">John Smith</p>
                <p className="text-xs text-secondary-500">Admin</p>
              </div>
            </DropdownTrigger>
            <DropdownMenu align="right" width={200}>
              <DropdownItem icon={<User className="w-4 h-4" />}>View Profile</DropdownItem>
              <DropdownItem icon={<Settings className="w-4 h-4" />}>Settings</DropdownItem>
              <DropdownDivider />
              <DropdownItem icon={<LogOut className="w-4 h-4" />} danger>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Custom actions */}
          {actions && <div className="ml-2">{actions}</div>}
        </div>
      </div>
    </header>
  );
}
