import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'DifferentAddresses', async: false })
export class DifferentAddressesConstraint
	implements ValidatorConstraintInterface
{
	validate(value: any, args: ValidationArguments): boolean {
		const { object } = args;
		const { origin, destination } = object as {
			origin: string;
			destination: string;
		};
		if (!origin || !destination) return true;
		return origin.toLowerCase() !== destination.toLowerCase();
	}

	defaultMessage(_args: ValidationArguments): string {
		return 'Origin and destination should not be equal';
	}
}
