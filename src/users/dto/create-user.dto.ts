import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
