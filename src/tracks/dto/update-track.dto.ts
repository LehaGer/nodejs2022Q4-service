import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'tracks name',
    example: 'Nothing Else Matters',
  })
  name?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'tracks duration',
    example: 2.5,
  })
  duration?: number;

  @ApiProperty({
    description: "corresponding artist's id",
    example: '924f2a6c-6595-46ff-ab65-1136d235d465',
    format: 'uuid',
  })
  artistId?: string | null;

  @ApiProperty({
    description: "corresponding album's id",
    example: '924f2a6c-6595-46ff-ab65-1136d235d465',
    format: 'uuid',
  })
  albumId?: string | null;
}
