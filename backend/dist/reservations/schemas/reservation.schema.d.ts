import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Space } from '../../spaces/schemas/space.schema';
export type ReservationDocument = Reservation & Document;
export declare enum ReservationStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    CHECKED_IN = "checked_in",
    CHECKED_OUT = "checked_out",
    NO_SHOW = "no_show"
}
export declare class Reservation {
    user: User;
    space: Space;
    startTime: Date;
    endTime: Date;
    totalPrice: number;
    status: ReservationStatus;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    checkInTime?: Date;
    checkOutTime?: Date;
    cancellationTime?: Date;
}
export declare const ReservationSchema: MongooseSchema<Reservation, import("mongoose").Model<Reservation, any, any, any, Document<unknown, any, Reservation, any, {}> & Reservation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Reservation, Document<unknown, {}, import("mongoose").FlatRecord<Reservation>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Reservation> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
