import { apiService } from './api.service';
import type { SupplierOffer, MerchantRequest, ShippingServiceOffer, MarketplaceFilters } from '../types/marketplace';

export interface Exhibition {
  id: string;
  name: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  organizerId: string;
  organizerName: string;
  participantsCount: number;
  imageUrl?: string;
  status: 'upcoming' | 'active' | 'ended';
  createdAt: string;
}

class MarketplaceService {
  // ===== Supplier Offers =====
  
  async getSupplierOffers(filters?: MarketplaceFilters): Promise<SupplierOffer[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.priceRange?.min) params.append('minPrice', filters.priceRange.min.toString());
      if (filters?.priceRange?.max) params.append('maxPrice', filters.priceRange.max.toString());
      
      const response = await apiService.get<SupplierOffer[]>(`/marketplace/supplier-offers?${params}`);
      return response || [];
    } catch (error) {
      console.error('Error fetching supplier offers:', error);
      return [];
    }
  }

  async createSupplierOffer(offer: Omit<SupplierOffer, 'id' | 'createdAt'>): Promise<SupplierOffer | null> {
    try {
      return await apiService.post<SupplierOffer>('/marketplace/supplier-offers', offer);
    } catch (error) {
      console.error('Error creating supplier offer:', error);
      throw error;
    }
  }

  async updateSupplierOffer(id: string, updates: Partial<SupplierOffer>): Promise<SupplierOffer | null> {
    try {
      return await apiService.put<SupplierOffer>(`/marketplace/supplier-offers/${id}`, updates);
    } catch (error) {
      console.error('Error updating supplier offer:', error);
      throw error;
    }
  }

  async deleteSupplierOffer(id: string): Promise<boolean> {
    try {
      await apiService.delete(`/marketplace/supplier-offers/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting supplier offer:', error);
      return false;
    }
  }

  // ===== Merchant Requests =====
  
  async getMerchantRequests(filters?: MarketplaceFilters): Promise<MerchantRequest[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      
      const response = await apiService.get<MerchantRequest[]>(`/marketplace/merchant-requests?${params}`);
      return response || [];
    } catch (error) {
      console.error('Error fetching merchant requests:', error);
      return [];
    }
  }

  async createMerchantRequest(request: Omit<MerchantRequest, 'id' | 'createdAt' | 'offersCount'>): Promise<MerchantRequest | null> {
    try {
      return await apiService.post<MerchantRequest>('/marketplace/merchant-requests', request);
    } catch (error) {
      console.error('Error creating merchant request:', error);
      throw error;
    }
  }

  async updateMerchantRequest(id: string, updates: Partial<MerchantRequest>): Promise<MerchantRequest | null> {
    try {
      return await apiService.put<MerchantRequest>(`/marketplace/merchant-requests/${id}`, updates);
    } catch (error) {
      console.error('Error updating merchant request:', error);
      throw error;
    }
  }

  async deleteMerchantRequest(id: string): Promise<boolean> {
    try {
      await apiService.delete(`/marketplace/merchant-requests/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting merchant request:', error);
      return false;
    }
  }

  // ===== Shipping Services =====
  
  async getShippingServices(filters?: MarketplaceFilters): Promise<ShippingServiceOffer[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.location) params.append('location', filters.location);
      
      const response = await apiService.get<ShippingServiceOffer[]>(`/marketplace/shipping-services?${params}`);
      return response || [];
    } catch (error) {
      console.error('Error fetching shipping services:', error);
      return [];
    }
  }

  async createShippingService(service: Omit<ShippingServiceOffer, 'id' | 'createdAt'>): Promise<ShippingServiceOffer | null> {
    try {
      return await apiService.post<ShippingServiceOffer>('/marketplace/shipping-services', service);
    } catch (error) {
      console.error('Error creating shipping service:', error);
      throw error;
    }
  }

  async updateShippingService(id: string, updates: Partial<ShippingServiceOffer>): Promise<ShippingServiceOffer | null> {
    try {
      return await apiService.put<ShippingServiceOffer>(`/marketplace/shipping-services/${id}`, updates);
    } catch (error) {
      console.error('Error updating shipping service:', error);
      throw error;
    }
  }

  async deleteShippingService(id: string): Promise<boolean> {
    try {
      await apiService.delete(`/marketplace/shipping-services/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting shipping service:', error);
      return false;
    }
  }

  // ===== Exhibitions =====
  
  async getExhibitions(filters?: { status?: string; category?: string }): Promise<Exhibition[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.category) params.append('category', filters.category);
      
      const response = await apiService.get<Exhibition[]>(`/marketplace/exhibitions?${params}`);
      return response || [];
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
      return [];
    }
  }

  async createExhibition(exhibition: Omit<Exhibition, 'id' | 'createdAt' | 'participantsCount'>): Promise<Exhibition | null> {
    try {
      return await apiService.post<Exhibition>('/marketplace/exhibitions', exhibition);
    } catch (error) {
      console.error('Error creating exhibition:', error);
      throw error;
    }
  }

  async updateExhibition(id: string, updates: Partial<Exhibition>): Promise<Exhibition | null> {
    try {
      return await apiService.put<Exhibition>(`/marketplace/exhibitions/${id}`, updates);
    } catch (error) {
      console.error('Error updating exhibition:', error);
      throw error;
    }
  }

  async deleteExhibition(id: string): Promise<boolean> {
    try {
      await apiService.delete(`/marketplace/exhibitions/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting exhibition:', error);
      return false;
    }
  }

  // ===== Favorites =====
  
  async getFavorites(userId: string): Promise<string[]> {
    try {
      const response = await apiService.get<{ itemIds: string[] }>(`/marketplace/favorites/${userId}`);
      return response?.itemIds || [];
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  }

  async addToFavorites(userId: string, itemId: string): Promise<boolean> {
    try {
      await apiService.post('/marketplace/favorites', { userId, itemId });
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  }

  async removeFromFavorites(userId: string, itemId: string): Promise<boolean> {
    try {
      await apiService.delete(`/marketplace/favorites/${userId}/${itemId}`);
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }
  }

  // ===== Recommendations =====
  
  async getRecommendations(userId: string, type: 'supplier_offers' | 'merchant_requests' | 'shipping_services'): Promise<any[]> {
    try {
      const response = await apiService.get<any[]>(`/marketplace/recommendations/${userId}?type=${type}`);
      return response || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  }

  // ===== Market Stats =====
  
  async getMarketStats(): Promise<any> {
    try {
      return await apiService.get('/marketplace/stats');
    } catch (error) {
      console.error('Error fetching market stats:', error);
      return {};
    }
  }
}

export const marketplaceService = new MarketplaceService();

