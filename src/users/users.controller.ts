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
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = { ...(await this.usersService.create(createUserDto)) };
    delete user.password;
    return user;
  }

  @Get()
  async findAll() {
    return (await this.usersService.findAll()).map((userEntity) => {
      const userDto = { ...userEntity };
      delete userDto.password;
      return userDto;
    });
  }

  @Get(':id')
  async findOne(@Param() params: UuidDto) {
    const user = await this.usersService.findOne(params.id);
    if (!user) throw new NotFoundException();
    const userDto = { ...user };
    delete userDto.password;
    return userDto;
  }

  @Put(':id')
  async update(@Param() params: UuidDto, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOne(params.id);
    if (!user) throw new NotFoundException();
    if (!(await bcrypt.compare(updateUserDto.oldPassword, user.password)))
      throw new ForbiddenException();
    const userDto = {
      ...(await this.usersService.update(params.id, updateUserDto)),
    };
    delete userDto.password;
    return userDto;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: UuidDto) {
    const user = await this.usersService.findOne(params.id);
    if (!user) throw new NotFoundException();
    return this.usersService.remove(params.id);
  }
}
