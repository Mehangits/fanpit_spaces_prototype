import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export type SpaceDocument = Space & Document;
export declare enum PricingModel {
    FREE = "free",
    HOURLY = "hourly",
    DAILY = "daily",
    MONTHLY = "monthly"
}
export declare class Space {
    name: string;
    description?: string;
    address: string;
    latitude?: number;
    longitude?: number;
    capacity: number;
    amenities?: string[];
    images?: string[];
    pricingModel: PricingModel;
    price?: number;
    peakMultiplier?: number;
    offPeakMultiplier?: number;
    owner: User;
}
export declare const SpaceSchema: MongooseSchema<Space, import("mongoose").Model<Space, any, any, any, Document<unknown, any, Space, any, {}> & Space & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Space, Document<unknown, {}, import("mongoose").FlatRecord<Space>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Space> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
