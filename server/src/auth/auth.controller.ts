import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUser, RegistrationStatus } from './models/auth.models';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * The register() route handler is a POST route handler that receives an instance of CreateUserDto object
	 * and delegates creating a new user to the AuthService.registerNewUser() function
	 */
	@Post('register')
	public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
		const result: RegistrationStatus = await this.authService.registerNewUser(createUserDto);

		if (result.success !== undefined) {
			throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
		}
		return result;
	}

	/**
	 * if the user credentials are valid, this route handler returns a signed JWT to the calling app.
	 */
	@Post('login')
	public async login(@Body() loginUserDto: LoginUserDto): Promise<LoggedUser> {
		return await this.authService.login(loginUserDto);
	}
}
