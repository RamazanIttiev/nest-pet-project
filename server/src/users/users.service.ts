import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { comparePasswords } from '../shared/utils';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	private userRepo: any;

	async findUser(username?: string): Promise<UserDto> {
		const user = await this.userRepo.findOne({ where: { username } });
		return user;
	}

	async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
		const user = await this.userRepo.findOne({ where: { username } });

		if (!user) {
			throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
		}

		// compare passwords
		const arePasswordsEqual = await comparePasswords(user.password, password);

		if (!arePasswordsEqual) {
			throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
		}

		return user;
	}

	async create(userDto: CreateUserDto): Promise<UserDto> {
		const { username, password, email } = userDto;

		// check if the user exists in the db
		const userInDb = await this.userRepo.findOne({
			where: { username },
		});
		if (userInDb) {
			throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
		}

		const user = await this.userRepo.create({ username, password, email });
		await this.userRepo.save(user);
		return user;
	}
}
