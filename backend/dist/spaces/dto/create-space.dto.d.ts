import { PricingModel } from '../schemas/space.schema';
export declare class CreateSpaceDto {
    name: string;
    description?: string;
    address: string;
    latitude?: number;
    longitude?: number;
    capacity: number;
    amenities?: string[];
    images?: string[];
    pricingModel?: PricingModel;
    price?: number;
    peakMultiplier?: number;
    offPeakMultiplier?: number;
}
