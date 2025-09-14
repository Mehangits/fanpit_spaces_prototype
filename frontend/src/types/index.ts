export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'consumer' | 'brand_owner' | 'staff';
  companyName?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Space {
  _id: string;
  name: string;
  description: string;
  address: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  amenities: string[];
  images: string[];
  pricingModel: 'free' | 'hourly' | 'daily' | 'monthly';
  price: number;
  peakMultiplier?: number;
  offPeakMultiplier?: number;
  owner: string | User;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  _id: string;
  user: string | User;
  space: string | Space;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out' | 'no_show';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  checkInTime?: string;
  checkOutTime?: string;
  cancellationTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}