import { BadRequestException, Injectable } from '@nestjs/common';
import { EstimateRideDto } from '../dto/estimate-ride.dto';
import { RideRepository } from './ride.repository';
import { PrismaService } from '../../../common/services/prisma.service';
import { RouteUtils } from 'src/utils/route-utils';
import { DriverUtils } from 'src/utils/driver-utils';
import { ConfirmRideDto } from '../dto/confirm-ride.dto';
import { CustomerUtils } from 'src/utils/customer-utils';
import { CustomNotFoundException } from 'src/common/exceptions/custom-not-found.exception';

@Injectable()
export class RidePrismaRepository implements RideRepository {
	constructor(
		private readonly prisma: PrismaService,
		private routeUtils: RouteUtils,
		private driverUtils: DriverUtils,
		private customerUtils: CustomerUtils,
	) {}
	async estimateRide(estimateRideDto: EstimateRideDto) {
		try {
			return await this.calculateRideDetails(estimateRideDto);
		} catch (error) {
			console.error(error);
			throw new BadRequestException({
				error_code: 'INVALID_DATA',
				error_description:
					'The data provided in the request body is invalid',
			});
		}
	}

	async confirmRide(
		confirmRideDto: ConfirmRideDto,
	): Promise<{ success: boolean }> {
		const driver = await this.driverUtils.findDriverById(
			confirmRideDto.driver.id,
		);
		this.driverUtils.validateDistanceToDriver(
			driver.min_distance,
			confirmRideDto.distance,
		);
		await this.createRide(confirmRideDto);
		return { success: true };
	}

	private async createRide(confirmRideDto: ConfirmRideDto) {
		await this.prisma.ride.create({
			data: {
				customer_id: confirmRideDto.customer_id,
				origin: confirmRideDto.origin,
				destination: confirmRideDto.destination,
				distance: confirmRideDto.distance,
				duration: confirmRideDto.duration,
				value: confirmRideDto.value,
				driverId: confirmRideDto.driver.id,
			},
		});
	}

	private async calculateRideDetails(
		estimateRideDto: EstimateRideDto,
	): Promise<any> {
		const response = await this.routeUtils.getRouteData(estimateRideDto);
		console.log(response);
		const allDrivers = await this.driverUtils.listAllDrivers();
		const driverOptionsWithFares = this.driverUtils.calculateDriverFares(
			allDrivers,
			response,
		);

		return this.routeUtils.buildRouteDetails(
			response,
			driverOptionsWithFares,
		);
	}

	async listCustomerRides(
		customer_id: string,
		driver_id?: string,
	): Promise<any> {
		await this.customerUtils.ensureCustomerExists(customer_id);
		if (driver_id) {
			await this.driverUtils.ensureDriverExists(driver_id);
		}
		const rides = await this.getRides(customer_id);
		return this.filterAndFormatRides(rides, driver_id);
	}

	private async getRides(customer_id: string) {
		return await this.prisma.ride.findMany({
			where: { customer_id },
			include: { driver: { select: { id: true, name: true } } },
			orderBy: { date: 'desc' },
		});
	}

	private filterAndFormatRides(rides: any[], driver_id?: string) {
		const formattedRides = rides.map(
			({ customer_id, driverId, ...ride }) => ({
				...ride,
				driver: ride.driver,
			}),
		);
		return {
			customer_id: rides[0]?.customer_id,
			rides: driver_id
				? formattedRides.filter(
						(ride) => ride.driver?.id === parseInt(driver_id),
					)
				: formattedRides,
		};
	}
}
