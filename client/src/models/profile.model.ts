export interface Reminder {
	title: string;
	date: Date;
}

export interface ProfileData {
	phone: string;
	username: string;
	reminders: Reminder[];
}
