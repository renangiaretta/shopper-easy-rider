import { EstimateRideDto } from '../dto/estimate-ride.dto';

export abstract class RideRepository {
	abstract estimateRide(estimateRideDto: EstimateRideDto);
}
