import { firestore } from 'firebase-admin';

export interface NewUser {
	phone: string;
	username: string;
	password: string;
}

export interface CreatedUser {
	id: number;
	phone: string;
	username: string;
	password: string;
	createdAt: firestore.Timestamp;
}

export interface ValidUser {
	id: number;
	phone: string;
	username: string;
	createdAt: firestore.Timestamp;
}

export interface Reminders {
	title: string;
	date: Date;
}

export interface UserWithData extends ValidUser {
	reminders: Reminders[];
}
