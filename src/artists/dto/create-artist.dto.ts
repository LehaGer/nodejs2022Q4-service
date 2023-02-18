import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from '../entities/artist.entity';

export class CreateArtistDto implements Omit<ArtistEntity, 'id'> {
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
