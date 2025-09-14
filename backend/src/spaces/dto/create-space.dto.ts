import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { PricingModel } from '../schemas/space.schema';

export class CreateSpaceDto {
  @IsString()
  @IsNotEmpty()
  name!: string; // definite assignment for required field

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address!: string; // definite assignment for required field

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  @IsNotEmpty()
  capacity!: number; // also required, so mark with `!`

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsEnum(PricingModel)
  @IsOptional()
  pricingModel?: PricingModel;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  peakMultiplier?: number;

  @IsNumber()
  @IsOptional()
  offPeakMultiplier?: number;
}
