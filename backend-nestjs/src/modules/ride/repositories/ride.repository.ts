import { ConfirmRideDto } from '../dto/confirm-ride.dto';
import { EstimateRideDto } from '../dto/estimate-ride.dto';

export abstract class RideRepository {
	abstract estimateRide(estimateRideDto: EstimateRideDto);
	abstract confirmRide(confirmRideDto: ConfirmRideDto);
	abstract listCustomerRides(customer_id: string, driver_id?: string);
}
