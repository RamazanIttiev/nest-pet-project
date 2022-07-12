import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { NewUser, UserWithData } from '../users/models/users.model';
import { RegistrationStatus } from './models/auth.models';
import { JwtService } from '@nestjs/jwt';
import { RemindersService } from '../reminders/reminders.service';
import { comparePasswords } from '../shared/utils';

@Injectable()
export class AuthService {
	/**
	 * JwtService service exposes utilities to help sign a JWT payload.
	 */
	constructor(
		private readonly usersService: UsersService,
		private readonly remindersService: RemindersService,
		private readonly jwtService: JwtService,
	) {}

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
			status = {
				status: HttpStatus.BAD_REQUEST,
				success: false,
				message: err,
			};
		}
		return status;
	}

	/**
	 * This function accepts valid user
	 * and generates accessToken that contains payload object
	 */
	async login(user: UserWithData) {
		const payload = { phone: user.phone, username: user.username, reminders: user.reminders };

		const accessToken = this.jwtService.sign(payload);

		return {
			accessToken,
		};
	}

	async validateUser(phone: string, pass: string): Promise<UserWithData> {
		const userFromDB = await this.usersService.findUserInDB(phone);

		if (!userFromDB.exists) {
			throw new HttpException('Phone number does not exist', HttpStatus.UNAUTHORIZED);
		}

		const arePasswordsSame = await comparePasswords(userFromDB.data().password, pass);

		if (!arePasswordsSame) {
			throw new HttpException('Your password is incorrect', HttpStatus.UNAUTHORIZED);
		}

		const reminders = await this.remindersService.getReminders(userFromDB.data().phone);

		return {
			id: userFromDB.data().id,
			phone: userFromDB.data().phone,
			username: userFromDB.data().username,
			createdAt: userFromDB.data().createdAt,
			reminders,
		};
	}
}
