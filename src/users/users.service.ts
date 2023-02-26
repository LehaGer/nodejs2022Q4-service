import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IDatabase } from '../database/interfaces/database.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('IDatabase') private storage: IDatabase) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.create('user', createUserDto);
  }

  findAll() {
    return this.storage.findAll('user');
  }

  findOne(id: string) {
    return this.storage.findById('user', id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.storage.update('user', id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.delete('user', id);
  }
}
