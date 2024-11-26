import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { seedDatabase } from '../prisma/seedDatabase';

async function bootstrap() {
	dotenv.config({ path: join(__dirname, '../../../.env') });
	const app = await NestFactory.create(AppModule);
	app.use(
		cors({
			origin: ['http://localhost:80', 'http://localhost'],
		}),
	);
	app.useGlobalFilters(new ValidationExceptionFilter());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	await seedDatabase();
	await app.listen(8080);
}
bootstrap();
