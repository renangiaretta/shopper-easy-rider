import { BadRequestException, Injectable } from '@nestjs/common';
import { EstimateRideDto } from '../dto/estimate-ride.dto';
import { RideRepository } from './ride.repository';
import { PrismaService } from '../../../common/services/prisma.service';
import { RouteUtils } from 'src/utils/route-utils';
import { DriverUtils } from 'src/utils/driver-utils';

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
