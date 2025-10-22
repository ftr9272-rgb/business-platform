/**
 * Authentication Service
 * خدمة المصادقة والتسجيل
 */

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'merchant' | 'supplier' | 'shipping_company';
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      phone?: string;
      isActive: boolean;
      isVerified: boolean;
    };
  };
}

class AuthService {
  /**
   * تسجيل الدخول
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // حفظ token والمستخدم في localStorage
    if (response.success && response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  /**
   * التسجيل
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    
    // حفظ token والمستخدم في localStorage
    if (response.success && response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  /**
   * تسجيل الخروج
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  /**
   * الحصول على المستخدم الحالي
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * التحقق من تسجيل الدخول
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /**
   * الحصول على token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}

export const authService = new AuthService();
export default authService;

