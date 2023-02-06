import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UuidDto } from './dto/uuid.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    const user = { ...this.usersService.create(createUserDto) };
    delete user.password;
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll().map((userEntity) => {
      const userDto = { ...userEntity };
      delete userDto.password;
      return userDto;
    });
  }

  @Get(':id')
  findOne(@Param() params: UuidDto) {
    const user = this.usersService.findOne(params.id);
    if (!user) throw new NotFoundException();
    const userDto = { ...user };
    delete userDto.password;
    return userDto;
  }

  @Put(':id')
  update(@Param() params: UuidDto, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.findOne(params.id);
    if (!user) throw new NotFoundException();
    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException();
    const userDto = { ...this.usersService.update(params.id, updateUserDto) };
    delete userDto.password;
    return userDto;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: UuidDto) {
    const user = this.usersService.findOne(params.id);
    if (!user) throw new NotFoundException();
    return this.usersService.remove(params.id);
  }
}
