import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ExistingUser, NewUser, UserToken } from '../users/models/users.model';
import { RegistrationStatus } from './models/auth.models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	/**
	 * JwtService service exposes utilities to help sign a JWT payload.
	 */
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	/**
	 * This function takes the NewUser (actual user's input data) as an input parameter and delegates the actual user creation to the UsersService.create() function.
	 * It returns a RegistrationStatus to indicate a success or fail user creation.
	 */
	async registerNewUser(newUser: NewUser): Promise<RegistrationStatus> {
		let status: RegistrationStatus = {
			status: HttpStatus.CREATED,
			success: true,
			message: 'user registered',
		};

		try {
			await this.usersService.create(newUser);
		} catch (err: unknown) {
			console.log(err);
			status = {
				status: HttpStatus.BAD_REQUEST,
				success: false,
				message: err,
			};
		}
		return status;
	}

	/**
	 * This function checks if the user exists in database
	 * if yes, then passes phone user's phone number to generate a unique token
	 * and returns that token
	 */
	async login(user: ExistingUser): Promise<UserToken> {
		// find user by login in db
		const userFromDB = await this.usersService.findUserInDB(user);

		if (userFromDB.empty) {
			throw new HttpException('Phone number does not exist', HttpStatus.UNAUTHORIZED);
		}

		let usersPhoneNumber;
		userFromDB.forEach(user => {
			usersPhoneNumber = user.data().phone;
		});

		// generate and sign token
		const token = this.createToken(usersPhoneNumber);

		return {
			...token,
		};
	}

	private createToken(phone: number): UserToken {
		const accessToken = this.jwtService.sign({ phone });
		return {
			expiresIn: process.env.EXPIRESIN,
			accessToken,
		};
	}
}
