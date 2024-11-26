import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
	catch(exception: BadRequestException, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>();
		const status = exception.getStatus();
		const responseBody = exception.getResponse();

		const errorMessages = Array.isArray((responseBody as any).message)
			? (responseBody as any).message
			: [(responseBody as any).message];

		const errorDescription =
			errorMessages.filter((msg) => typeof msg === 'string').join(', ') ||
			'Dados inválidos';

		const errorResponse = {
			error_code: 'INVALID_DATA',
			error_description: errorDescription,
		};

		response.status(status).json(errorResponse);
	}
}
