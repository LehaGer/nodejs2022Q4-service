import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private storage: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return this.storage.create('user', createUserDto);
  }

  async findAll() {
    return this.storage.findAll('user');
  }

  async findOne(id: string) {
    return this.storage.findById('user', id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.storage.update('user', id, updateUserDto);
  }

  async remove(id: string) {
    return this.storage.delete('user', id);
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return this.storage.updateRefreshToken('user', id, refreshToken);
  }
}
