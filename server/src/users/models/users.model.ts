import { firestore } from 'firebase-admin';

export interface NewUser {
	phone: number;
	username: string;
	password: string;
}

export interface CreatedUser {
	id: number;
	phone: number;
	username: string;
	password: string;
	createdAt: firestore.Timestamp;
}

export interface ExistingUser {
	phone: number;
	password: string;
	expiresIn: string;
	accessToken: string;
}

export interface UserToken {
	expiresIn: string;
	accessToken: string;
}
