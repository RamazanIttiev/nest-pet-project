import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ExistingUser, NewUser, UserToken } from '../users/models/users.model';
import { RegistrationStatus } from './models/auth.models';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '../shared/utils';
import { getFirestore } from 'firebase-admin/firestore';

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
	async login(user: ExistingUser) {
		const { password, phone } = user;
		// find user by login in db
		const userFromDB = await this.usersService.findUserInDB(phone);

		if (!userFromDB.exists) {
			throw new HttpException('Phone number does not exist', HttpStatus.UNAUTHORIZED);
		}

		const arePasswordsSame = await comparePasswords(userFromDB.data().password, password);

		if (!arePasswordsSame) {
			throw new HttpException('Your password is incorrect', HttpStatus.UNAUTHORIZED);
		}

		const usersPhoneNumber = userFromDB.data().phone;
		const userReminders = await this.getReminders(usersPhoneNumber);
		// generate and sign token
		const token = this.createToken(usersPhoneNumber);

		return {
			userReminders,
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

	async getReminders(phone: string) {
		const db = getFirestore();
		const array: object[] = [];
		await db
			.collection('users')
			.doc(`${phone}`)
			.collection('reminders')
			.get()
			.then(res => {
				res.forEach(data => {
					const reminder = {
						title: data.data().title,
						data: data.data().date,
					};
					array.push(reminder);
				});
			});
		return array;
	}
}
