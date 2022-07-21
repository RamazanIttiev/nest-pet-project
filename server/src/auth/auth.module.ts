import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { TasksService } from '../tasks/tasks.service';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				return {
					secret: configService.get<string>('JWT_SECRET'),
					signOptions: { expiresIn: configService.get<string>('EXPIRE_IN') },
				};
			},
			inject: [ConfigService],
		}),
	],

	controllers: [AuthController],
	exports: [AuthService],
	providers: [AuthService, TasksService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
