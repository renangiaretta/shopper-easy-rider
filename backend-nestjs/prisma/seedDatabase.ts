import { PrismaClient } from '@prisma/client';
import { mockDrivers } from './../src/mocks/mockDrivers';

const prisma = new PrismaClient();

export const seedDatabase = async () => {
	try {
		const existingDrivers = await prisma.driver.findMany();
		if (existingDrivers.length === 0) {
			await Promise.all(
				mockDrivers.map(async (driver) => {
					const existingDriver = await prisma.driver.findUnique({
						where: { id: driver.id },
					});
					if (!existingDriver) {
						await prisma.driver.create({
							data: {
								id: driver.id,
								name: driver.name,
								description: driver.description,
								vehicle: driver.vehicle,
								rideFare: driver.rideFare,
								min_distance: driver.min_distance,
								review: driver.review
									? {
											create: {
												rating: driver.review.rating,
												comment: driver.review.comment,
											},
										}
									: undefined,
							},
						});
					}
				}),
			);

			console.log('Seed database complete');
		} else {
			console.log('Database already seeded');
			return;
		}
	} catch (error) {
		console.error('Error seeding database:', error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
};
