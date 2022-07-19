import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidUser } from '../../users/models/users.model';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { RemindersService } from '../../reminders/reminders.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService, private remindersService: RemindersService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					return req?.cookies['accessToken']?.accessToken;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET'),
		});
	}

	async validate(data: ValidUser) {
		const reminders = await this.remindersService.getReminders(data.phone);
		return { reminders, ...data };
	}
}
