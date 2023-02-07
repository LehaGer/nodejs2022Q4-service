import IUserStorage from '../interfaces/user-storage.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class InMemoryUserStorage implements IUserStorage {
  private users: UserEntity[] = [];

  create(params: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...params,
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  findById(id: string): UserEntity | undefined {
    return this.users.find((user) => user.id === id);
  }

  findAll(): UserEntity[] {
    return this.users;
  }

  update(id: string, params: UpdateUserDto): UserEntity {
    const userEntityIndex = this.users.findIndex((user) => user.id === id);
    this.users[userEntityIndex] = {
      ...this.users[userEntityIndex],
      password: params.newPassword,
      version: ++this.users[userEntityIndex].version,
      updatedAt: Date.now(),
    };
    return this.users[userEntityIndex];
  }
}
