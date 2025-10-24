import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import toast from 'react-hot-toast';

// أنواع البيانات
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'merchant' | 'supplier' | 'shipping_company' | 'admin';
  avatar?: string;
  phone?: string;
  companyName?: string;
  isVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'merchant' | 'supplier' | 'shipping_company';
  companyName?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// مفاتيح التخزين المحلي
const TOKEN_KEY = 'business_platform_token';
const USER_KEY = 'business_platform_user';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // التحقق من صحة الرمز المميز عند بدء التطبيق
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // TODO: إضافة التحقق من صحة الرمز مع Backend API
        }
      } catch (error) {
        console.error('خطأ في تهيئة المصادقة:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // تسجيل الدخول
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // استدعاء API الحقيقي
      const response = await authService.login({ email, password });
      
      if (response.success && response.data.user) {
        const userData: User = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: response.data.user.role as any,
          phone: response.data.user.phone,
          isVerified: response.data.user.isVerified,
          createdAt: new Date().toISOString()
        };
        
        setUser(userData);
        setToken(response.token);
        
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        
        toast.success(`مرحباً ${userData.name}!`);
        
        // التوجيه التلقائي بناءً على دور المستخدم
        const roleRoutes: Record<string, string> = {
          'merchant': '/merchant',
          'supplier': '/supplier',
          'shipping_company': '/shipping',
          'admin': '/admin'
        };
        
        const targetRoute = roleRoutes[userData.role] || '/merchant';
        navigate(targetRoute);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'فشل تسجيل الدخول');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // التسجيل
  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      // استدعاء API الحقيقي
      const response = await authService.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        phone: userData.phone
      });
      
      if (response.success && response.data.user) {
        const newUser: User = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: response.data.user.role as any,
          phone: response.data.user.phone,
          isVerified: response.data.user.isVerified,
          createdAt: new Date().toISOString()
        };
        
        setUser(newUser);
        setToken(response.token);
        
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        
        toast.success(`مرحباً ${newUser.name}! تم إنشاء حسابك بنجاح`);
      }
    } catch (error: any) {
      console.error('Register error:', error);
      toast.error(error.message || 'فشل إنشاء الحساب');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // تسجيل الخروج
  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Redirect to public landing page after logout
    try {
      navigate('/landing');
    } catch (err) {
      // ignore navigation errors
    }
  };

  // تحديث بيانات المستخدم
  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    }
  };

  // تجديد الرمز المميز
  const refreshToken = async (): Promise<void> => {
    try {
      if (token) {
        // TODO: إضافة API حقيقي لتجديد الرمز
        console.log('تجديد الرمز يحتاج إلى Backend API');
      }
    } catch (error) {
      console.error('خطأ في تجديد الرمز المميز:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    updateUser,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook لاستخدام السياق
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth يجب استخدامه داخل AuthProvider');
  }
  return context;
}

