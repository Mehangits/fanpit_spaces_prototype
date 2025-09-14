import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  spaceId!: string; // definite assignment assertion

  @IsDateString()
  @IsNotEmpty()
  startTime!: string; // definite assignment assertion

  @IsDateString()
  @IsNotEmpty()
  endTime!: string; // definite assignment assertion
}
