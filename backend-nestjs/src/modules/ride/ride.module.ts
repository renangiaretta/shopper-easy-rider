import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { HttpModule } from '@nestjs/axios';
import { RidePrismaRepository } from './repositories/ride-prisma.repository';
import { RideRepository } from './repositories/ride.repository';
import { PrismaService } from 'src/common/services/prisma.service';
import { DriverUtils } from 'src/utils/driver-utils';
import { RouteUtils } from 'src/utils/route-utils';
import { CustomerUtils } from 'src/utils/customer-utils';

@Module({
	imports: [HttpModule],
	controllers: [RideController],
	providers: [
		DriverUtils,
		RouteUtils,
		CustomerUtils,
		RideService,
		PrismaService,
		{
			provide: RideRepository,
			useClass: RidePrismaRepository,
		},
	],
	exports: [RideService],
})
export class RideModule {}
