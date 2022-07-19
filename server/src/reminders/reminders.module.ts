import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';

@Module({
	providers: [RemindersService],
	exports: [RemindersService],
})
export class RemindersModule {}
