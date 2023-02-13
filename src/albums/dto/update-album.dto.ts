import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @ApiProperty({
    description: "album's name",
    example: 'Muster of Puppets',
  })
  name?: string;

  @IsInt()
  @ApiProperty({
    description: "issue's year",
    example: 2023,
  })
  year?: number;

  @ApiProperty({
    description: "issue's year",
    example: '924f2a6c-6595-46ff-ab65-1136d235d465',
    format: 'uuid',
  })
  artistId?: string | null;
}
