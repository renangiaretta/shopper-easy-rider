import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
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

	@Get(':customer_id')
	listCustomerRides(
		@Param('customer_id') customer_id: string,
		@Query('driver_id') driver_id: string,
	) {
		return this.rideService.listCustomerRides(customer_id, driver_id);
	}
}
