import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @ApiProperty({
    description: 'some artists name',
    example: 'Matallica',
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    description: 'does have a grammy',
    example: false,
  })
  grammy: boolean;
}
