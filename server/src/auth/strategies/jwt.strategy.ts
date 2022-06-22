import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDto } from '../../users/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: `${process.env.JWT_SECRET}`,
		});
	}

	/**
	 * checks if the user exists in database
	 * throws an Unauthorized exception if the user isn't valid
	 * */
	async validate(username: string): Promise<UserDto> {
		const user: UserDto = await this.authService.validateUser(username);
		if (user !== undefined) {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
		}
		return user;
	}
}
