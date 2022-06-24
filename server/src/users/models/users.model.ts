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
