export declare class UpdateSpaceDto {
    name?: string;
    description?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    capacity?: number;
    amenities?: string[];
    images?: string[];
    pricingModel?: 'free' | 'hourly' | 'daily' | 'monthly';
    price?: number;
    peakMultiplier?: number;
    offPeakMultiplier?: number;
}
