import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type SpaceDocument = Space & Document;

export enum PricingModel {
  FREE = 'free',
  HOURLY = 'hourly',
  DAILY = 'daily',
  MONTHLY = 'monthly',
}

@Schema({ timestamps: true })
export class Space {
  @Prop({ required: true })
  name!: string; // required → definite assignment

  @Prop()
  description?: string; // optional

  @Prop({ required: true })
  address!: string; // required → definite assignment

  @Prop()
  latitude?: number;

  @Prop()
  longitude?: number;

  @Prop({ required: true })
  capacity!: number; // required → definite assignment

  @Prop([String])
  amenities?: string[];

  @Prop([String])
  images?: string[];

  @Prop({
    type: String,
    enum: PricingModel,
    default: PricingModel.HOURLY,
  })
  pricingModel!: PricingModel; // has a default but still mark definite

  @Prop()
  price?: number;

  @Prop()
  peakMultiplier?: number;

  @Prop()
  offPeakMultiplier?: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  owner!: User; // required → definite assignment
}

export const SpaceSchema = SchemaFactory.createForClass(Space);
