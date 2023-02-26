import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto implements Pick<UserEntity, 'login' | 'password'> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'some login',
    example: 'Me',
  })
  login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'some password',
    example: '1234',
  })
  password: string;
}
