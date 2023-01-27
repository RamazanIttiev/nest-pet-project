import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';

@Module({
	imports: [AuthModule, UsersModule, TasksModule, ConfigModule.forRoot({ isGlobal: true }),  ServeStaticModule.forRoot({
		rootPath: join(__dirname, '../../client'),
	}),],
	providers: [TasksService],
	controllers: [TasksController],
})
export class AppModule {}
