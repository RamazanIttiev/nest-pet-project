import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RemindersService } from './reminders/reminders.service';
import { RemindersController } from './reminders/reminders.controller';
import { RemindersModule } from './reminders/reminders.module';

@Module({
	imports: [AuthModule, UsersModule, RemindersModule, ConfigModule.forRoot({ isGlobal: true })],
	providers: [RemindersService],
	controllers: [RemindersController],
})
export class AppModule {}
