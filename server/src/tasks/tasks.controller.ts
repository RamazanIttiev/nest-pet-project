import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	@Post('add-task')
	public async setTask(@Body() req: any) {
		return await this.taskService.addTask(req.phone, req.task);
	}

	@Put('update-task')
	public async editTask(@Body() req: any) {
		return await this.taskService.updateTask(req.phone, req.task);
	}

	@Delete('delete-task')
	public async removeTask(@Body() req: any) {
		return await this.taskService.deleteTask(req.phone, req.task);
	}
}
