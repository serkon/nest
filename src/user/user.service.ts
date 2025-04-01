import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      name: 'John',
      email: 'john@example.com',
      surname: 'Doe',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      name: 'Maria',
      email: 'maria@example.com',
      surname: 'Doe',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        const user = this.users.find((user) => user.username === username);
        resolve(user);
      }, 2000);
    });
  }
}
