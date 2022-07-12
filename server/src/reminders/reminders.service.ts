import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { Reminders } from '../users/models/users.model';

@Injectable()
export class RemindersService {
	async getReminders(phone: string): Promise<Reminders[]> {
		const db = getFirestore();
		const reminders: Reminders[] = [];

		await db
			.collection('users')
			.doc(`${phone}`)
			.collection('reminders')
			.get()
			.then(res => {
				res.forEach(data => {
					const reminder = {
						title: data.data().title,
						date: data.data().date,
					};
					reminders.push(reminder);
				});
			});
		return reminders;
	}
}
