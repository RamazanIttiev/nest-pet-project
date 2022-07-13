import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RemindersService } from './reminders/reminders.service';

@Module({
	imports: [AuthModule, UsersModule, ConfigModule.forRoot({ isGlobal: true })],
	providers: [RemindersService],
})
export class AppModule {}
