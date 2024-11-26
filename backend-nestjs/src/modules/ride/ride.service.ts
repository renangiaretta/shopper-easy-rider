import { Injectable } from '@nestjs/common';
import { EstimateRideDto } from './dto/estimate-ride.dto';
import { RideRepository } from './repositories/ride.repository';

@Injectable()
export class RideService {
	constructor(private rideRepository: RideRepository) {}
	async estimateRide(estimateRideDto: EstimateRideDto) {
		return await this.rideRepository.estimateRide(estimateRideDto);
	}
}
