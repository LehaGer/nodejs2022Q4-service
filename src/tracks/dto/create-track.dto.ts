import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TrackEntity } from '../entities/track.entity';

export class CreateTrackDto implements Omit<TrackEntity, 'id'> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'tracks name',
    example: 'The Unforgiven',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'tracks duration',
    example: 2.5,
  })
  duration: number;

  @ApiProperty({
    description: "corresponding artist's id",
    example: '924f2a6c-6595-46ff-ab65-1136d235d465',
    format: 'uuid',
  })
  artistId: string | null;

  @ApiProperty({
    description: "corresponding album's id",
    example: '924f2a6c-6595-46ff-ab65-1136d235d465',
    format: 'uuid',
  })
  albumId: string | null;
}
