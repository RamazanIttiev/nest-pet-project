import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RemindersService } from './reminders/reminders.service';

@Module({
	imports: [AuthModule, UsersModule],
	providers: [RemindersService],
})
export class AppModule {}
