export interface Task {
	title: string;
	date: Date;
}

export interface ProfileData {
	phone: string;
	username: string;
	tasks: Task[];
}
