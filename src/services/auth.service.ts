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
  // Demo accounts للاختبار
  private demoAccounts = [
    {
      email: 'merchant@demo.com',
      password: 'password123',
      user: {
        id: 'demo-merchant-1',
        name: 'تاجر تجريبي',
        email: 'merchant@demo.com',
        role: 'merchant',
        isActive: true,
        isVerified: true
      }
    },
    {
      email: 'supplier@demo.com',
      password: 'password123',
      user: {
        id: 'demo-supplier-1',
        name: 'مورد تجريبي',
        email: 'supplier@demo.com',
        role: 'supplier',
        isActive: true,
        isVerified: true
      }
    },
    {
      email: 'shipping@demo.com',
      password: 'password123',
      user: {
        id: 'demo-shipping-1',
        name: 'شركة شحن تجريبية',
        email: 'shipping@demo.com',
        role: 'shipping_company',
        isActive: true,
        isVerified: true
      }
    }
  ];

  /**
   * تسجيل الدخول
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // محاولة الاتصال بـ Backend API
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
    } catch (error) {
      // Fallback: التحقق من Demo accounts
      const demoAccount = this.demoAccounts.find(
        acc => acc.email === credentials.email && acc.password === credentials.password
      );
      
      if (demoAccount) {
        const demoToken = `demo-token-${demoAccount.user.id}-${Date.now()}`;
        const response: AuthResponse = {
          success: true,
          token: demoToken,
          data: {
            user: demoAccount.user
          }
        };
        
        // حفظ token والمستخدم في localStorage
        localStorage.setItem('auth_token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoAccount.user));
        
        return response;
      }
      
      // إذا فشل كل شيء
      throw error;
    }
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

