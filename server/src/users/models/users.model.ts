import { firestore } from 'firebase-admin';
import { Reminder } from '../../reminders/models/reminders.model';

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

export interface UserWithData extends ValidUser {
	reminders: Reminder[];
}
