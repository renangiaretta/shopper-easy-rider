import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomNotAcceptableException extends HttpException {
	constructor(errorDescription: string, errorCode?: string) {
		super(
			{
				error_code: errorCode || 'INVALID_DATA',
				error_description: errorDescription,
			},
			HttpStatus.NOT_ACCEPTABLE,
		);
	}
}
