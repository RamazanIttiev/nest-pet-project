import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { Reminder } from './models/reminders.model';

@Injectable()
export class RemindersService {
	async getReminders(phone: string): Promise<Reminder[]> {
		const db = getFirestore();
		const reminders: Reminder[] = [];

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

	async addReminder(phone: string, reminder: Reminder) {
		const db = getFirestore();

		return await db
			.collection('users')
			.doc(`${phone}`)
			.collection('reminders')
			.doc(`${reminder.title}`)
			.set(reminder);
	}

	async deleteReminder(phone: string, reminder: string) {
		const db = getFirestore();

		return await db.collection('users').doc(`${phone}`).collection('reminders').doc(`${reminder}`).delete();
	}
}
