import { Body, Controller, Post } from '@nestjs/common';
import { RideService } from './ride.service';
import { EstimateRideDto } from './dto/estimate-ride.dto';

@Controller('ride')
export class RideController {
	constructor(private readonly rideService: RideService) {}
	@Post('/estimate')
	// @HttpCode(200)
	estimateRide(@Body() estimateRideDto: EstimateRideDto) {
		return this.rideService.estimateRide(estimateRideDto);
	}
}
