import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      email: 'manager@example.com',
      password: '123456',
    },
    {
      email: 'recruiter@example.com',
      password: '123456',
    },
  ];

  async findOne(email: string): Promise<LoginDto | undefined> {
    return Promise.resolve(this.users.find((user) => user.email === email));
  }
}
