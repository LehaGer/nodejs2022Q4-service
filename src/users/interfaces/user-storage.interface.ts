import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export default interface IUserStorage {
  findAll: () => UserEntity[];
  findById: (id: string) => UserEntity | undefined;
  create: (params: CreateUserDto) => UserEntity;
  update: (id: string, params: UpdateUserDto) => UserEntity;
  delete: (id: string) => void;
}
