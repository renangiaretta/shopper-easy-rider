import { Injectable } from '@nestjs/common';
import { EstimateRideDto } from './dto/estimate-ride.dto';
import { RideRepository } from './repositories/ride.repository';
import { ConfirmRideDto } from './dto/confirm-ride.dto';

@Injectable()
export class RideService {
	constructor(private rideRepository: RideRepository) {}
	async estimateRide(estimateRideDto: EstimateRideDto) {
		return await this.rideRepository.estimateRide(estimateRideDto);
	}

	async confirmRide(confirmRideDto: ConfirmRideDto) {
		return await this.rideRepository.confirmRide(confirmRideDto);
	}

	async listCustomerRides(customer_id: string, driverId: string) {
		return await this.rideRepository.listCustomerRides(
			customer_id,
			driverId,
		);
	}
}
