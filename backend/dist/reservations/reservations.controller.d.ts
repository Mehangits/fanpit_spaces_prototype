import { ReservationsService } from './reservations.service';
import type { CreateReservationResponse } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import type { AuthenticatedRequest } from '../auth/types/auth.types';
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(createReservationDto: CreateReservationDto, req: AuthenticatedRequest): Promise<CreateReservationResponse>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/reservation.schema").ReservationDocument, {}, {}> & import("./schemas/reservation.schema").Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/reservation.schema").ReservationDocument, {}, {}> & import("./schemas/reservation.schema").Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByUser(req: AuthenticatedRequest): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/reservation.schema").ReservationDocument, {}, {}> & import("./schemas/reservation.schema").Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findBySpace(spaceId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/reservation.schema").ReservationDocument, {}, {}> & import("./schemas/reservation.schema").Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateStatus(id: string, status: string, req: AuthenticatedRequest): Promise<import("mongoose").Document<unknown, {}, import("./schemas/reservation.schema").ReservationDocument, {}, {}> & import("./schemas/reservation.schema").Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    verifyPayment(id: string, paymentId: string, signature: string): Promise<{
        success: boolean;
        reservation: import("mongoose").Document<unknown, {}, import("./schemas/reservation.schema").ReservationDocument, {}, {}> & import("./schemas/reservation.schema").Reservation & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
