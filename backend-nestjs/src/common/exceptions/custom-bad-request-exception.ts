import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomBadRequestException extends HttpException {
	constructor(errorDescription: string, errorCode?: string) {
		super(
			{
				error_code: errorCode || 'INVALID_DATA',
				error_description: errorDescription,
			},
			HttpStatus.BAD_REQUEST,
		);
	}
}
