/**
 * API Service Layer
 * طبقة الخدمات للتواصل مع الواجهة الخلفية
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from '../config/api';
import toast from 'react-hot-toast';

// إنشاء instance من axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Request interceptor - إضافة token للطلبات
apiClient.interceptors.request.use(
  (config) => {
    // الحصول على token من localStorage
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - معالجة الأخطاء العامة
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // معالجة أخطاء المصادقة
    if (error.response?.status === 401) {
      // إزالة token وإعادة توجيه للتسجيل
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      // إظهار رسالة
      toast.error('انتهت جلستك، يرجى تسجيل الدخول مرة أخرى');
      
      // إعادة توجيه لصفحة تسجيل الدخول
      window.location.href = '/login';
    }
    
    // معالجة أخطاء الخادم
    if (error.response?.status === 500) {
      toast.error('حدث خطأ في الخادم، يرجى المحاولة لاحقاً');
    }
    
    // معالجة أخطاء الشبكة
    if (!error.response) {
      toast.error('تعذر الاتصال بالخادم، تحقق من اتصالك بالإنترنت');
    }
    
    return Promise.reject(error);
  }
);

/**
 * Generic API request handler
 */
class ApiService {
  /**
   * GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Error handler
   */
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      
      // استخراج رسالة الخطأ من الاستجابة
      const message = axiosError.response?.data?.error 
        || axiosError.response?.data?.message 
        || axiosError.message 
        || 'حدث خطأ غير متوقع';
      
      return new Error(message);
    }
    
    return error instanceof Error ? error : new Error('حدث خطأ غير متوقع');
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;

