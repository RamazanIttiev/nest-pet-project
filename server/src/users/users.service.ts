import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { toUserDto } from '../shared/mapper';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { comparePasswords } from '../shared/utils';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
	username: string;
	password: string;
}

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>,
	) {}

	async findUser(options?: object): Promise<UserDto> {
		const user = await this.userRepo.findOne(options);
		return toUserDto(user);
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

		return toUserDto(user);
	}

	async findByPayload({ username }: { username: string }): Promise<UserDto> {
		return await this.findUser({
			where: { username },
		});
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

		const user: UserEntity = await this.userRepo.create({ username, password, email });
		await this.userRepo.save(user);
		return toUserDto(user);
	}
}
