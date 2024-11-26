import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CustomNotFoundException } from 'src/common/exceptions/custom-not-found.exception';

@Injectable()
export class CustomerUtils {
	constructor(private prisma: PrismaService) {}
	async ensureCustomerExists(customer_id: string): Promise<void> {
		const stringCustomerId = customer_id.toString();
		const customerExists = await this.prisma.ride.findFirst({
			where: { customer_id: stringCustomerId },
		});

		if (!customerExists) {
			throw new CustomNotFoundException(
				'No rides found',
				'NO_RIDES_FOUND',
			);
		}
	}
}
