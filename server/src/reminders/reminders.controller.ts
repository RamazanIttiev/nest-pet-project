import { Body, Controller, Delete, Post } from '@nestjs/common';
import { RemindersService } from './reminders.service';

@Controller()
export class RemindersController {
	constructor(private readonly reminderService: RemindersService) {}

	@Post('add-reminder')
	public async setReminder(@Body() req: any) {
		return await this.reminderService.addReminder(req.phone, req.reminder);
	}

	@Delete('delete-reminder')
	public async removeReminder(@Body() req: any) {
		return await this.reminderService.deleteReminder(req.phone, req.reminder);
	}
}
