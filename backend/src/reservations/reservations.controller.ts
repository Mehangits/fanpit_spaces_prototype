import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import * as authTypes from '../auth/types/auth.types';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() req: authTypes.AuthenticatedRequest,
  ) {
    return this.reservationsService.create(
      createReservationDto,
      req.user.userId,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.STAFF)
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Get('user/my-reservations')
  @UseGuards(JwtAuthGuard)
  findByUser(@Request() req: authTypes.AuthenticatedRequest) {
    return this.reservationsService.findByUser(req.user.userId);
  }

  @Get('space/:spaceId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER)
  findBySpace(@Param('spaceId') spaceId: string) {
    return this.reservationsService.findBySpace(spaceId);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.STAFF)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Request() req: authTypes.AuthenticatedRequest,
  ) {
    return this.reservationsService.updateStatus(id, status, req.user.userId);
  }

  @Post(':id/verify-payment')
  @UseGuards(JwtAuthGuard)
  verifyPayment(
    @Param('id') id: string,
    @Body('paymentId') paymentId: string,
    @Body('signature') signature: string,
  ) {
    return this.reservationsService.verifyPayment(id, paymentId, signature);
  }
}
