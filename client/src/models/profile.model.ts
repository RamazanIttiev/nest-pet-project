export interface Task {
	title: string;
	date: Date;
	done: boolean;
}

export interface ProfileData {
	phone: string;
	username: string;
	tasks: Task[];
}
