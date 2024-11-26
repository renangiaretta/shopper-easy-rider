import { Injectable } from '@nestjs/common';
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
}
