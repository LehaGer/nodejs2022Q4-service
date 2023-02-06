import { IsUUID } from 'class-validator';
import { FavoriteType } from '../types/favorite.type';

export class IncomeParamsFavoritesDto {
  @IsUUID()
  id: string;

  target: FavoriteType;
}
