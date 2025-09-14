import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare enum UserRole {
    CONSUMER = "consumer",
    BRAND_OWNER = "brand_owner",
    STAFF = "staff"
}
export declare class User {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    companyName?: string;
    phone?: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
