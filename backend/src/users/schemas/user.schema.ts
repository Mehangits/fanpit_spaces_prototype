import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  CONSUMER = 'consumer',
  BRAND_OWNER = 'brand_owner',
  STAFF = 'staff',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string; // Add definite assignment assertion

  @Prop({ required: true, unique: true })
  email!: string; // Add definite assignment assertion

  @Prop({ required: true })
  password!: string; // Add definite assignment assertion

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.CONSUMER,
  })
  role!: UserRole; // Add definite assignment assertion

  @Prop()
  companyName?: string;

  @Prop()
  phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
