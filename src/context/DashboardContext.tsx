import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { DashboardState, DashboardModule, TimeRange, Notification } from '../types';

type DashboardAction =
  | { type: 'SET_MODULE'; payload: DashboardModule }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_TIME_RANGE'; payload: TimeRange }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_FILTER'; payload: { key: string; value: unknown } }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: DashboardState = {
  activeModule: 'executive',
  sidebarOpen: true,
  searchQuery: '',
  notifications: [],
  timeRange: '30d',
  filters: {},
  loading: false,
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_MODULE':
      return { ...state, activeModule: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_TIME_RANGE':
      return { ...state, timeRange: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      };
    case 'CLEAR_FILTERS':
      return { ...state, filters: {} };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

interface DashboardContextValue {
  state: DashboardState;
  setModule: (module: DashboardModule) => void;
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  setSearch: (query: string) => void;
  setTimeRange: (range: TimeRange) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  setFilter: (key: string, value: unknown) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setModule = useCallback((module: DashboardModule) => {
    dispatch({ type: 'SET_MODULE', payload: module });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  const setSidebar = useCallback((open: boolean) => {
    dispatch({ type: 'SET_SIDEBAR', payload: open });
  }, []);

  const setSearch = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  }, []);

  const setTimeRange = useCallback((range: TimeRange) => {
    dispatch({ type: 'SET_TIME_RANGE', payload: range });
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
      const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}`,
        timestamp: new Date(),
        read: false,
      };
      dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
    },
    []
  );

  const markNotificationRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  }, []);

  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  }, []);

  const setFilter = useCallback((key: string, value: unknown) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const value: DashboardContextValue = {
    state,
    setModule,
    toggleSidebar,
    setSidebar,
    setSearch,
    setTimeRange,
    addNotification,
    markNotificationRead,
    clearNotifications,
    setFilter,
    clearFilters,
    setLoading,
  };

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
