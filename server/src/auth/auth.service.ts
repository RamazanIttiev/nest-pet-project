import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UserDto } from '../users/dto/user.dto';
import { LoggedUser, RegistrationStatus } from './models/auth.models';

@Injectable()
export class AuthService {
	/**
	 * JwtService service exposes utilities to help sign a JWT payload.
	 */
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	/**
	 * This function takes the CreateUserDto as an input parameter and delegates the actual user creation to the UsersService.create() function.
	 * It returns a RegistrationStatus to indicate a success or fail user creation.
	 */
	async registerNewUser(userDto: CreateUserDto): Promise<RegistrationStatus> {
		let status: RegistrationStatus = {
			success: true,
			message: 'user registered',
		};
		try {
			await this.usersService.create(userDto);
		} catch (err) {
			status = {
				success: false,
				message: err,
			};
		}
		return status;
	}

	async login(loginUserDto: LoginUserDto): Promise<LoggedUser> {
		// find user by login in db
		const user = await this.usersService.findByLogin(loginUserDto);

		// generate and sign token
		const token = this._createToken(user.username);

		return {
			username: user.username,
			...token,
		};
	}

	private _createToken(username: string): Omit<LoggedUser, 'username'> {
		const accessToken = this.jwtService.sign(username);
		return {
			expiresIn: process.env.EXPIRESIN,
			accessToken,
		};
	}

	async validateUser(username: string): Promise<UserDto> {
		const user = await this.usersService.findUser(username);
		if (!user) {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
		}
		return user;
	}
}
