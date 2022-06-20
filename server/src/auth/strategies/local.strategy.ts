import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { User } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<Omit<User, 'password'> | null> {
		const user = await this.authService.validateUser(username, password);
		if (user === undefined) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
