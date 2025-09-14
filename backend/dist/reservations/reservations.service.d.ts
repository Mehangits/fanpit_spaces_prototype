import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { SpacesService } from '../spaces/spaces.service';
import { PaymentsService, RazorpayOrder } from '../payments/payments.service';
interface CreateReservationResponse {
    reservation: ReservationDocument;
    razorpayOrder: RazorpayOrder;
}
export declare class ReservationsService {
    private reservationModel;
    private spacesService;
    private paymentsService;
    constructor(reservationModel: Model<ReservationDocument>, spacesService: SpacesService, paymentsService: PaymentsService);
    create(createReservationDto: CreateReservationDto, userId: string): Promise<CreateReservationResponse>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, ReservationDocument, {}, {}> & Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, ReservationDocument, {}, {}> & Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, ReservationDocument, {}, {}> & Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findBySpace(spaceId: string): Promise<(import("mongoose").Document<unknown, {}, ReservationDocument, {}, {}> & Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateStatus(id: string, status: string, userId?: string): Promise<import("mongoose").Document<unknown, {}, ReservationDocument, {}, {}> & Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    verifyPayment(reservationId: string, paymentId: string, signature: string): Promise<{
        success: boolean;
        reservation: import("mongoose").Document<unknown, {}, ReservationDocument, {}, {}> & Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
export {};
