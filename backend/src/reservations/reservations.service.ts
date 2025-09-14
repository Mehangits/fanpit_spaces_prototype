import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
  ReservationStatus,
} from './schemas/reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { SpacesService } from '../spaces/spaces.service';
import { PaymentsService, RazorpayOrder } from '../payments/payments.service';

interface CreateReservationResponse {
  reservation: ReservationDocument;
  razorpayOrder: RazorpayOrder;
}

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private spacesService: SpacesService,
    private paymentsService: PaymentsService,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    userId: string,
  ): Promise<CreateReservationResponse> {
    const space = await this.spacesService.findOne(
      createReservationDto.spaceId,
    );

    if (!space) {
      throw new NotFoundException('Space not found');
    }

    // Check for overlapping reservations
    const overlappingReservation = await this.reservationModel.findOne({
      space: createReservationDto.spaceId,
      $or: [
        {
          startTime: { $lt: new Date(createReservationDto.endTime) },
          endTime: { $gt: new Date(createReservationDto.startTime) },
        },
      ],
      status: { $in: [ReservationStatus.CONFIRMED, ReservationStatus.PENDING] },
    });

    if (overlappingReservation) {
      throw new BadRequestException(
        'This time slot is already booked. Please choose another time.',
      );
    }

    // Calculate price
    const durationHours =
      (new Date(createReservationDto.endTime).getTime() -
        new Date(createReservationDto.startTime).getTime()) /
      (1000 * 60 * 60);

    const totalPrice = durationHours * space.price;

    const reservation = new this.reservationModel({
      user: userId,
      space: createReservationDto.spaceId,
      startTime: new Date(createReservationDto.startTime),
      endTime: new Date(createReservationDto.endTime),
      totalPrice,
      status: ReservationStatus.PENDING,
    });

    const savedReservation = await reservation.save();

    // Create Razorpay order
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

  async findOne(id: string) {
    const reservation = await this.reservationModel
      .findById(id)
      .populate('user', 'name email phone')
      .populate('space', 'name address images')
      .exec();

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  async findByUser(userId: string) {
    return this.reservationModel
      .find({ user: userId })
      .populate('space', 'name address images')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findBySpace(spaceId: string) {
    return this.reservationModel
      .find({ space: spaceId })
      .populate('user', 'name email')
      .sort({ startTime: 1 })
      .exec();
  }

  async updateStatus(id: string, status: string, userId?: string) {
    const reservation = await this.reservationModel.findById(id);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    // Convert string to ReservationStatus enum
    const reservationStatus = status as ReservationStatus;

    if (!Object.values(ReservationStatus).includes(reservationStatus)) {
      throw new BadRequestException('Invalid reservation status');
    }

    reservation.status = reservationStatus;

    // Use the converted enum value for comparisons
    if (reservationStatus === ReservationStatus.CHECKED_IN) {
      reservation.checkInTime = new Date();
    } else if (reservationStatus === ReservationStatus.CHECKED_OUT) {
      reservation.checkOutTime = new Date();
    } else if (reservationStatus === ReservationStatus.CANCELLED) {
      reservation.cancellationTime = new Date();
    }

    return reservation.save();
  }

  async verifyPayment(
    reservationId: string,
    paymentId: string,
    signature: string,
  ) {
    const reservation = await this.reservationModel.findById(reservationId);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (!reservation.razorpayOrderId) {
      throw new BadRequestException(
        'Reservation does not have a Razorpay order ID',
      );
    }

    const isValid = await this.paymentsService.verifyPaymentSignature(
      reservation.razorpayOrderId,
      paymentId,
      signature,
    );

    if (isValid) {
      reservation.status = ReservationStatus.CONFIRMED;
      reservation.razorpayPaymentId = paymentId;
      await reservation.save();
      return { success: true, reservation };
    } else {
      throw new BadRequestException('Invalid payment signature');
    }
  }
}
