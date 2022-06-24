import { HttpStatus } from '@nestjs/common';

export interface RegistrationStatus {
	status: HttpStatus;
	success: boolean;
	message: unknown;
}
