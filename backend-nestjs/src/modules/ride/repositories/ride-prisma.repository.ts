import { BadRequestException, Injectable } from '@nestjs/common';
import { EstimateRideDto } from '../dto/estimate-ride.dto';
import { RideRepository } from './ride.repository';
import { PrismaService } from '../../../common/services/prisma.service';
import { RouteUtils } from 'src/utils/route-utils';
import { DriverUtils } from 'src/utils/driver-utils';
import { ConfirmRideDto } from '../dto/confirm-ride.dto';

@Injectable()
export class RidePrismaRepository implements RideRepository {
	constructor(
		private readonly prisma: PrismaService,
		private routeUtils: RouteUtils,
		private driverUtils: DriverUtils,
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
}
