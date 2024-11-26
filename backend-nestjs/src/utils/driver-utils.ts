import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomBadRequestException } from 'src/common/exceptions/custom-bad-request-exception';
import { CustomNotAcceptableException } from 'src/common/exceptions/custom-not-acceptable.exception';
import { CustomNotFoundException } from 'src/common/exceptions/custom-not-found.exception';
import { PrismaService } from 'src/common/services/prisma.service';
import { IDriver } from 'src/interfaces/drivers.interface';

@Injectable()
export class DriverUtils {
	constructor(private prisma: PrismaService) {}

	async listAllDrivers() {
		const allDrivers = await this.prisma.driver.findMany({
			include: { review: { select: { rating: true, comment: true } } },
			orderBy: { rideFare: 'asc' },
		});
		return allDrivers;
	}
	calculateDriverFares(allDrivers: IDriver[], response: any) {
		const { distanceMeters } = response.data.routes[0];
		const distanceInKm = distanceMeters / 1000;
		const driverOptions = allDrivers.filter(
			(driver) => driver.min_distance <= distanceInKm,
		);

		return driverOptions.map((driver) => {
			const fare = (driver.rideFare * distanceMeters) / 1000;
			const { rideFare, min_distance, ...driverData } = driver;
			return { ...driverData, value: parseFloat(fare.toFixed(2)) };
		});
	}

	async findDriverById(driverId: number): Promise<any> {
		const driver = await this.prisma.driver.findUnique({
			where: { id: driverId },
		});
		if (!driver) {
			throw new CustomNotFoundException(
				'Driver not found',
				'DRIVER_NOT_FOUND',
			);
		}
		return driver;
	}

	validateDistanceToDriver(minDistance: number, distance: number): void {
		const validDistance = minDistance <= distance / 1000;
		if (!validDistance) {
			throw new CustomNotAcceptableException(
				'Invalid distance to driver',
				'INVALID_DISTANCE',
			);
		}
	}

	async ensureDriverExists(driver_id: string): Promise<void> {
		if (isNaN(parseInt(driver_id))) {
			throw new CustomBadRequestException(
				'Invalid driver',
				'INVALID_DRIVER',
			);
		}
		const driverExists = await this.prisma.driver.findUnique({
			where: { id: parseInt(driver_id) },
		});
		if (!driverExists) {
			throw new CustomBadRequestException(
				'Invalid driver',
				'INVALID_DRIVER',
			);
		}
	}
}
