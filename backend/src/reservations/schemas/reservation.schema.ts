import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Space } from '../../spaces/schemas/space.schema';

export type ReservationDocument = Reservation & Document;

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  CHECKED_IN = 'checked_in',
  CHECKED_OUT = 'checked_out',
  NO_SHOW = 'no_show',
}

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user!: User; // definite assignment

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Space', required: true })
  space!: Space;

  @Prop({ required: true })
  startTime!: Date;

  @Prop({ required: true })
  endTime!: Date;

  @Prop({ required: true })
  totalPrice!: number;

  @Prop({
    type: String,
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status!: ReservationStatus;

  @Prop()
  razorpayOrderId?: string; // optional field

  @Prop()
  razorpayPaymentId?: string;

  @Prop()
  checkInTime?: Date;

  @Prop()
  checkOutTime?: Date;

  @Prop()
  cancellationTime?: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
