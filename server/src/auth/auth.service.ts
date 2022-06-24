import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { NewUser } from '../users/models/users.model';
import { RegistrationStatus } from './models/auth.models';

@Injectable()
export class AuthService {
	/**
	 * JwtService service exposes utilities to help sign a JWT payload.
	 */
	constructor(private readonly usersService: UsersService) {}

	/**
	 * This function takes the UsersModel as an input parameter and delegates the actual user creation to the UsersService.create() function.
	 * It returns a RegistrationStatus to indicate a success or fail user creation.
	 */
	async registerNewUser(newUser: NewUser): Promise<RegistrationStatus> {
		let status: RegistrationStatus = {
			success: true,
			message: 'user registered',
		};
		try {
			await this.usersService.create(newUser);
		} catch (err: unknown) {
			status = {
				success: false,
				message: err,
			};
		}
		return status;
	}
}
