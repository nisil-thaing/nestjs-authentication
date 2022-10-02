import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUser, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private _jwtService: JwtService,
    private _userService: UsersService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<IUser, 'password'> | null> {
    try {
      const findingUser = await this._userService.findOne(username);

      if (!findingUser || findingUser.password !== password) {
        throw new Error('Authentication failed!');
      }

      return { ...findingUser, password: undefined };
    } catch (err) {
      return null;
    }
  }

  async login(user: IUser) {
    const payload = {
      username: user.username,
      sub: user.uuid,
    };

    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
