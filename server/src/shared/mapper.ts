import { UserDto } from '../users/dto/user.dto';
import { UserEntity } from '../users/entities/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
	const { id, username, email } = data;
	return { id, username, email };
};
