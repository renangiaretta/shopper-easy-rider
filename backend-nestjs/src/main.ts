import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';

async function bootstrap() {
	dotenv.config({ path: join(__dirname, '../../../.env') });
	const app = await NestFactory.create(AppModule);
	app.use(
		cors({
			origin: ['http://localhost:80', 'http://localhost'],
		}),
	);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	app.useGlobalFilters(new ValidationExceptionFilter());
	await app.listen(8080);
}
bootstrap();
