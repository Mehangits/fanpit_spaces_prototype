"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reservation_schema_1 = require("./schemas/reservation.schema");
const spaces_service_1 = require("../spaces/spaces.service");
const payments_service_1 = require("../payments/payments.service");
let ReservationsService = class ReservationsService {
    constructor(reservationModel, spacesService, paymentsService) {
        this.reservationModel = reservationModel;
        this.spacesService = spacesService;
        this.paymentsService = paymentsService;
    }
    async create(createReservationDto, userId) {
        const space = await this.spacesService.findOne(createReservationDto.spaceId);
        if (!space) {
            throw new common_1.NotFoundException('Space not found');
        }
        if (!space.price) {
            throw new common_1.BadRequestException('Space price is not defined');
        }
        const overlappingReservation = await this.reservationModel.findOne({
            space: createReservationDto.spaceId,
            $or: [
                {
                    startTime: { $lt: new Date(createReservationDto.endTime) },
                    endTime: { $gt: new Date(createReservationDto.startTime) },
                },
            ],
            status: { $in: [reservation_schema_1.ReservationStatus.CONFIRMED, reservation_schema_1.ReservationStatus.PENDING] },
        });
        if (overlappingReservation) {
            throw new common_1.BadRequestException('This time slot is already booked. Please choose another time.');
        }
        const durationHours = (new Date(createReservationDto.endTime).getTime() -
            new Date(createReservationDto.startTime).getTime()) /
            (1000 * 60 * 60);
        const totalPrice = durationHours * space.price;
        const reservation = new this.reservationModel({
            user: userId,
            space: createReservationDto.spaceId,
            startTime: new Date(createReservationDto.startTime),
            endTime: new Date(createReservationDto.endTime),
            totalPrice,
            status: reservation_schema_1.ReservationStatus.PENDING,
        });
        const savedReservation = await reservation.save();
        const order = await this.paymentsService.createOrder(totalPrice);
        return {
            reservation: savedReservation,
            razorpayOrder: order,
        };
    }
    async findAll() {
        return this.reservationModel
            .find()
            .populate('user', 'name email')
            .populate('space', 'name address')
            .exec();
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid reservation ID format');
        }
        const reservation = await this.reservationModel
            .findById(id)
            .populate('user', 'name email phone')
            .populate('space', 'name address images')
            .exec();
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        return reservation;
    }
    async findByUser(userId) {
        return this.reservationModel
            .find({ user: userId })
            .populate('space', 'name address images')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findBySpace(spaceId) {
        return this.reservationModel
            .find({ space: spaceId })
            .populate('user', 'name email')
            .sort({ startTime: 1 })
            .exec();
    }
    async updateStatus(id, status) {
        const reservation = await this.reservationModel.findById(id);
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const reservationStatus = status;
        if (!Object.values(reservation_schema_1.ReservationStatus).includes(reservationStatus)) {
            throw new common_1.BadRequestException('Invalid reservation status');
        }
        reservation.status = reservationStatus;
        if (reservationStatus === reservation_schema_1.ReservationStatus.CHECKED_IN) {
            reservation.checkInTime = new Date();
        }
        else if (reservationStatus === reservation_schema_1.ReservationStatus.CHECKED_OUT) {
            reservation.checkOutTime = new Date();
        }
        else if (reservationStatus === reservation_schema_1.ReservationStatus.CANCELLED) {
            reservation.cancellationTime = new Date();
        }
        return reservation.save();
    }
    async verifyPayment(reservationId, paymentId, signature) {
        const reservation = await this.reservationModel.findById(reservationId);
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        if (!reservation.razorpayOrderId) {
            throw new common_1.BadRequestException('Reservation does not have a Razorpay order ID');
        }
        const isValid = await this.paymentsService.verifyPaymentSignature(reservation.razorpayOrderId, paymentId, signature);
        if (isValid) {
            reservation.status = reservation_schema_1.ReservationStatus.CONFIRMED;
            reservation.razorpayPaymentId = paymentId;
            await reservation.save();
            return { success: true, reservation };
        }
        else {
            throw new common_1.BadRequestException('Invalid payment signature');
        }
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reservation_schema_1.Reservation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        spaces_service_1.SpacesService,
        payments_service_1.PaymentsService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map