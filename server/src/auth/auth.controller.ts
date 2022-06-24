import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExistingUser, NewUser, UserToken } from '../users/models/users.model';
import { RegistrationStatus } from './models/auth.models';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * The register() route handler is a POST route handler that receives an instance of NewUser object
	 * and delegates creating a new user to the AuthService.registerNewUser() function
	 */
	@Post('register')
	public async register(@Body() newUser: NewUser): Promise<RegistrationStatus> {
		const result: RegistrationStatus = await this.authService.registerNewUser(newUser);

		if (result.success !== undefined) {
			throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
		}
		return result;
	}

	/**
	 * if the user credentials are valid, this route handler returns a signed JWT to the calling app.
	 */
	@Post('login')
	public async login(@Body() user: ExistingUser): Promise<Promise<UserToken>> {
		return await this.authService.login(user);
	}
}
