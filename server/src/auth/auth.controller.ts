import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUser, UserWithData } from '../users/models/users.model';
import { RegistrationStatus } from './models/auth.models';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

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

		if (result.success === false) {
			throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
		}
		return result;
	}

	/**
	 * if the user credentials are valid,
	 * this route handler returns a signed JWT and user's data to the calling app.
	 *
	 * AuthGuard('local') refers to local.strategy.ts, which validates user
	 * and returns accessToken that contains all necessary data (profile data and reminders)
	 */
	@UseGuards(AuthGuard('local'))
	@Post('login')
	public async login(
		@Request() { user }: { user: UserWithData },
		@Res({ passthrough: true }) response: Response,
	): Promise<string> {
		const accessToken = await this.authService.login(user);

		response.cookie(
			'accessToken',
			{ accessToken },
			{
				httpOnly: true,
				domain: process.env.FRONTEND_DOMAIN,
			},
		);

		return accessToken;
	}

	@Get('logout')
	public async logout(@Request() req: any, @Res({ passthrough: true }) response: Response) {
		response.clearCookie('accessToken', {
			httpOnly: true,
			domain: process.env.FRONTEND_DOMAIN,
		});

		return response.get('Set-Cookie');
	}

	/**
	 * if accessToken is valid,
	 * AuthGuard('jwt') returns all user data that is contained in that token
	 */
	@UseGuards(AuthGuard('jwt'))
	@Get('profile')
	getReminders(@Request() request: any): UserWithData {
		return request.user;
	}
}
