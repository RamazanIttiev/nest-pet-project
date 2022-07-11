import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class RemindersService {
	async getReminders(phone: string) {
		const db = getFirestore();
		const reminders: object[] = [];
		await db
			.collection('users')
			.doc(`${phone}`)
			.collection('reminders')
			.get()
			.then(res => {
				res.forEach(data => {
					const reminder = {
						title: data.data().title,
						data: data.data().date,
					};
					reminders.push(reminder);
				});
			});
		return reminders;
	}
}
