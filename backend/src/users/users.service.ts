import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface User {
  id: number;
  username: string;
  password: string; // hashed
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  async create(username: string, plainPassword: string): Promise<User> {
    const hashed = await bcrypt.hash(plainPassword, 10);
    const user: User = { id: this.nextId++, username, password: hashed };
    this.users.push(user);
    return { ...user, password: undefined } as any;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }

  async validatePassword(user: User, plain: string): Promise<boolean> {
    return bcrypt.compare(plain, user.password);
  }
}
