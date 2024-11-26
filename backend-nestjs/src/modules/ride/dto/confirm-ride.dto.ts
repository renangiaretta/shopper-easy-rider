import { Type } from 'class-transformer';
import {
	IsNotEmpty,
	IsNumber,
	IsString,
	Validate,
	ValidateNested,
} from 'class-validator';
import { DifferentAddressesConstraint } from 'src/utils/validators/different-addresses.constraint';

export class DriverDto {
	@IsNotEmpty()
	@IsNumber()
	id: number;

	@IsNotEmpty()
	@IsString()
	name: string;
}

export class ConfirmRideDto {
	@IsNotEmpty()
	@IsString()
	customer_id: string;
	@IsNotEmpty()
	@IsString()
	origin: string;
	@IsNotEmpty()
	@IsString()
	destination: string;
	@IsNotEmpty()
	@IsNumber({})
	distance: number;
	@IsNotEmpty()
	@IsString()
	duration: string;
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => DriverDto)
	driver: DriverDto;
	@IsNotEmpty()
	@IsNumber({})
	value: number;
	@Validate(DifferentAddressesConstraint)
	addresses: boolean;
}
