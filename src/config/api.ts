/**
 * API Configuration
 * مركز إعدادات الاتصال بالواجهة الخلفية
 */

// Base URL للواجهة الخلفية
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  
  // Products
  PRODUCTS: {
    LIST: '/api/products',
    CREATE: '/api/products',
    UPDATE: (id: string) => `/api/products/${id}`,
    DELETE: (id: string) => `/api/products/${id}`,
    GET: (id: string) => `/api/products/${id}`,
  },
  
  // Shipping
  SHIPPING: {
    LIST: '/api/shipping',
    CREATE: '/api/shipping',
    UPDATE: (id: string) => `/api/shipping/${id}`,
    DELETE: (id: string) => `/api/shipping/${id}`,
    GET: (id: string) => `/api/shipping/${id}`,
  },
  
  // Shipments
  SHIPMENTS: {
    LIST: '/api/shipments',
    CREATE: '/api/shipments',
    UPDATE: (id: string) => `/api/shipments/${id}`,
    DELETE: (id: string) => `/api/shipments/${id}`,
    GET: (id: string) => `/api/shipments/${id}`,
  },
  
  // Analytics
  ANALYTICS: {
    DASHBOARD: '/api/analytics/dashboard',
  },
  
  // Search
  SEARCH: '/api/search',
  
  // Notifications
  NOTIFICATIONS: '/api/notifications',
  
  // Export
  EXPORT: (type: string) => `/api/export/${type}`,
  
  // Health
  HEALTH: '/api/health',
};

// Request timeout (30 seconds)
export const REQUEST_TIMEOUT = 30000;

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

