import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { Task } from './models/tasks.model';

@Injectable()
export class TasksService {
	async getTasks(phone: string): Promise<Task[]> {
		const db = getFirestore();
		const tasks: Task[] = [];

		await db
			.collection('users')
			.doc(`${phone}`)
			.collection('tasks')
			.get()
			.then(res => {
				res.forEach(data => {
					const task = {
						title: data.data().title,
						date: data.data().date,
					};
					tasks.push(task);
				});
			});
		return tasks;
	}

	async addTask(phone: string, task: Task) {
		const db = getFirestore();

		return await db.collection('users').doc(`${phone}`).collection('tasks').doc(`${task.title}`).set(task);
	}

	async deleteTask(phone: string, task: string) {
		const db = getFirestore();

		return await db.collection('users').doc(`${phone}`).collection('tasks').doc(`${task}`).delete();
	}
}
