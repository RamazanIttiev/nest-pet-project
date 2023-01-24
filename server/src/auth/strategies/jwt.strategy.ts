import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidUser } from '../../users/models/users.model';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TasksService } from '../../tasks/tasks.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService, private tasksService: TasksService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					return req?.cookies['accessToken'];
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET'),
		});
	}

	async validate(data: ValidUser) {
		const tasks = await this.tasksService.getTasks(data.phone);
		return { tasks, ...data };
	}
}
