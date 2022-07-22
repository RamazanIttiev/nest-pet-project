export interface Task {
	title: string;
	date: Date;
}

export interface DoneTask {
	title: string;
	date: Date;
	done: boolean;
}
