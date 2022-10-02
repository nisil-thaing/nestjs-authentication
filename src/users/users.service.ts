import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type IUser = any;

const USERS: Array<IUser> = [
  {
    uuid: 1,
    username: 'john',
    password: 'changeme',
  },
  {
    uuid: 2,
    username: 'maria',
    password: 'guess',
  },
];

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<IUser | undefined> {
    return USERS.find((user: IUser) => user.username === username);
  }
}
