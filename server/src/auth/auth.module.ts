import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { RemindersService } from '../reminders/reminders.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '30d' },
		}),
	],
	controllers: [AuthController],
	exports: [AuthService],
	providers: [AuthService, RemindersService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
