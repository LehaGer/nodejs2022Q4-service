import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsString()
  @ApiProperty({
    description: 'some artists name',
    example: 'Queen',
  })
  name?: string;

  @IsBoolean()
  @ApiProperty({
    description: 'does have a grammy',
    example: true,
  })
  grammy?: boolean;
}
