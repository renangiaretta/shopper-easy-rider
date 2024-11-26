import { Body, Controller, HttpCode, Patch, Post } from '@nestjs/common';
import { RideService } from './ride.service';
import { EstimateRideDto } from './dto/estimate-ride.dto';
import { ConfirmRideDto } from './dto/confirm-ride.dto';

@Controller('ride')
export class RideController {
	constructor(private readonly rideService: RideService) {}

	@Post('/estimate')
	@HttpCode(200)
	estimateRide(@Body() estimateRideDto: EstimateRideDto) {
		return this.rideService.estimateRide(estimateRideDto);
	}

	@Patch('/confirm')
	create(@Body() confirmRideDto: ConfirmRideDto) {
		return this.rideService.confirmRide(confirmRideDto);
	}
}
