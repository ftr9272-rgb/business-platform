/**
 * Shipping Service
 * خدمة إدارة الشحن
 */

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../config/api';

export interface ShippingAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  contactName?: string;
  contactPhone?: string;
}

export interface PackageDetails {
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  description?: string;
  value?: number;
}

export interface Shipment {
  _id?: string;
  id?: string;
  requestNumber?: string;
  userId?: string;
  userType?: 'supplier' | 'merchant';
  pickupAddress?: ShippingAddress;
  deliveryAddress?: ShippingAddress;
  packageDetails?: PackageDetails;
  shippingType?: 'standard' | 'express' | 'overnight';
  status?: 'pending' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  estimatedCost?: number;
  actualCost?: number;
  currency?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShipmentsResponse {
  success: boolean;
  data: {
    shipments: Shipment[];
    total: number;
  };
}

export interface ShipmentResponse {
  success: boolean;
  data: {
    shipment: Shipment;
  };
}

class ShippingService {
  /**
   * الحصول على قائمة الشحنات
   */
  async getShipments(params?: {
    status?: string;
    userType?: string;
  }): Promise<ShipmentsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.userType) queryParams.append('userType', params.userType);
    
    const url = `${API_ENDPOINTS.SHIPMENTS.LIST}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    return await apiService.get<ShipmentsResponse>(url);
  }

  /**
   * الحصول على شحنة واحدة
   */
  async getShipment(id: string): Promise<ShipmentResponse> {
    return await apiService.get<ShipmentResponse>(
      API_ENDPOINTS.SHIPMENTS.GET(id)
    );
  }

  /**
   * إنشاء طلب شحن جديد
   */
  async createShipment(shipment: Omit<Shipment, '_id' | 'id' | 'requestNumber' | 'createdAt' | 'updatedAt'>): Promise<ShipmentResponse> {
    return await apiService.post<ShipmentResponse>(
      API_ENDPOINTS.SHIPMENTS.CREATE,
      shipment
    );
  }

  /**
   * تحديث شحنة
   */
  async updateShipment(id: string, shipment: Partial<Shipment>): Promise<ShipmentResponse> {
    return await apiService.put<ShipmentResponse>(
      API_ENDPOINTS.SHIPMENTS.UPDATE(id),
      shipment
    );
  }

  /**
   * حذف شحنة
   */
  async deleteShipment(id: string): Promise<{ success: boolean; message: string }> {
    return await apiService.delete(
      API_ENDPOINTS.SHIPMENTS.DELETE(id)
    );
  }

  /**
   * تحديث حالة الشحنة
   */
  async updateShipmentStatus(
    id: string, 
    status: 'pending' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled'
  ): Promise<ShipmentResponse> {
    return await this.updateShipment(id, { status });
  }
}

export const shippingService = new ShippingService();
export default shippingService;

