import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { RemindersService } from '../reminders/reminders.service';

@Module({
	imports: [
		UsersModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
			property: 'user',
			session: false,
		}),
		JwtModule.register({
			secret: `${process.env.JWT_SECRET}`,
			signOptions: { expiresIn: '30d' },
		}),
	],
	providers: [AuthService, RemindersService, JwtStrategy],
	exports: [PassportModule, JwtModule],
	controllers: [AuthController],
})
export class AuthModule {}
