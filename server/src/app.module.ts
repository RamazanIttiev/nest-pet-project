import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';

@Module({
	imports: [AuthModule, UsersModule, TasksModule, ConfigModule.forRoot({ isGlobal: true })],
	providers: [TasksService],
	controllers: [TasksController],
})
export class AppModule {}
