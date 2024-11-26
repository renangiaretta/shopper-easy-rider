import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { DifferentAddressesConstraint } from 'src/utils/validators/different-addresses.constraint';

export class EstimateRideDto {
	@IsString()
	@IsNotEmpty()
	customer_id: string;

	@IsString()
	@IsNotEmpty()
	origin: string;

	@IsString()
	@IsNotEmpty()
	destination: string;

	@Validate(DifferentAddressesConstraint)
	addresses: boolean;
}
