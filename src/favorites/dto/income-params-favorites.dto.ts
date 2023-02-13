import { IsUUID } from 'class-validator';
import { FavoriteType } from '../types/favorite.type';
import { ApiProperty } from '@nestjs/swagger';

export class IncomeParamsFavoritesDto {
  @IsUUID()
  @ApiProperty({
    format: 'uuid',
    example: '924f2a6c-6595-46ff-ab65-1136d235d465',
  })
  id: string;

  @ApiProperty({
    enum: FavoriteType,
    enumName: 'FavoriteType',
    example: FavoriteType.track,
  })
  target: FavoriteType;
}
