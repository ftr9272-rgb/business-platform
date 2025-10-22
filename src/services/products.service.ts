/**
 * Products Service
 * خدمة إدارة المنتجات
 */

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api';

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency?: string;
  images?: string[];
  minimumOrderQuantity?: {
    quantity: number;
    unit: string;
  };
  inStock?: boolean;
  stockQuantity?: number;
  supplierId?: string;
  tags?: string[];
  isActive?: boolean;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface ProductResponse {
  success: boolean;
  data: {
    product: Product;
  };
}

class ProductsService {
  /**
   * الحصول على قائمة المنتجات
   */
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    
    const url = `${API_ENDPOINTS.PRODUCTS.LIST}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    return await apiService.get<ProductsResponse>(url);
  }

  /**
   * الحصول على منتج واحد
   */
  async getProduct(id: string): Promise<ProductResponse> {
    return await apiService.get<ProductResponse>(
      API_ENDPOINTS.PRODUCTS.GET(id)
    );
  }

  /**
   * إضافة منتج جديد
   */
  async createProduct(product: Omit<Product, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductResponse> {
    return await apiService.post<ProductResponse>(
      API_ENDPOINTS.PRODUCTS.CREATE,
      product
    );
  }

  /**
   * تحديث منتج
   */
  async updateProduct(id: string, product: Partial<Product>): Promise<ProductResponse> {
    return await apiService.put<ProductResponse>(
      API_ENDPOINTS.PRODUCTS.UPDATE(id),
      product
    );
  }

  /**
   * حذف منتج
   */
  async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
    return await apiService.delete(
      API_ENDPOINTS.PRODUCTS.DELETE(id)
    );
  }
}

export const productsService = new ProductsService();
export default productsService;

