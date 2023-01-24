import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { NewUser, UserWithData, ValidUser } from '../users/models/users.model';
import { RegistrationStatus } from './models/auth.models';
import { JwtService } from '@nestjs/jwt';
import { TasksService } from '../tasks/tasks.service';
import { comparePasswords } from '../shared/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	/**
	 * JwtService service exposes utilities to help sign a JWT payload.
	 */
	constructor(
		private readonly usersService: UsersService,
		private readonly tasksService: TasksService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
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
		const payload = { phone: user.phone, username: user.username };

		return this.jwtService.sign(payload, { expiresIn: this.configService.get<string>('EXPIRE_IN') });
	}

	async validateUser(phone: string, pass: string): Promise<ValidUser> {
		const userFromDB = await this.usersService.findUserInDB(phone);

		if (!userFromDB.exists) {
			throw new HttpException('Phone number does not exist', HttpStatus.UNAUTHORIZED);
		}

		const arePasswordsSame = await comparePasswords(userFromDB.data().password, pass);

		if (!arePasswordsSame) {
			throw new HttpException('Your password is incorrect', HttpStatus.UNAUTHORIZED);
		}

		return {
			id: userFromDB.data().id,
			phone: userFromDB.data().phone,
			username: userFromDB.data().username,
			createdAt: userFromDB.data().createdAt,
		};
	}
}
