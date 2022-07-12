import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getExistingUser, getUsername, hashPassword } from '../shared/utils';
import { CreatedUser, NewUser } from './models/users.model';
import { getFirestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';
import Timestamp = firestore.Timestamp;

@Injectable()
export class UsersService {
	async create(newUser: NewUser) {
		const db = getFirestore();
		const { username, password, phone } = newUser;

		const hashedPassword = await hashPassword(password);

		const phoneExists = await getExistingUser(db, phone);
		const usernameExists = await getUsername(db, username);

		if (phoneExists.exists) {
			throw new HttpException('User with that phone number already exists', HttpStatus.BAD_REQUEST);
		} else if (usernameExists.empty === false) {
			throw new HttpException('User with that name already exists', HttpStatus.BAD_REQUEST);
		}

		const createdUser: CreatedUser = {
			phone,
			username,
			password: hashedPassword,
			id: new Date().getTime(),
			createdAt: Timestamp.now(),
		};
		return await db.collection('users').doc(`${phone}`).set(createdUser);
	}

	async findUserInDB(phone: string) {
		const db = getFirestore();

		return await getExistingUser(db, phone);
	}
}
