import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserWithData } from '../../users/models/users.model';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService) {
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

	async validate(data: UserWithData) {
		return data;
	}
}
