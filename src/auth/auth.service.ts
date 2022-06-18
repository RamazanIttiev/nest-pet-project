import { Injectable } from '@nestjs/common';

import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Accepts user's credentials and checks whether they are valid
   * Checks with 'database' and input
   * */
  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findUser(username);
    if (user && user.password === pass) {
      const { password, ...validatedUser } = user;
      return validatedUser;
    }
    return null;
  }
}
