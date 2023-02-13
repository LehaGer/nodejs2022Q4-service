import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'previous password',
    example: '1234',
  })
  oldPassword: string; // previous password

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'new password',
    example: '12345678',
  })
  newPassword: string; // new password
}
