import { Body, Controller, Delete } from '@nestjs/common';
import { RemindersService } from './reminders.service';

@Controller()
export class RemindersController {
	constructor(private readonly reminderService: RemindersService) {}

	@Delete('delete-reminder')
	public async removeReminder(@Body() req: any) {
		return await this.reminderService.deleteReminder(req.phone, req.reminder);
	}
}
