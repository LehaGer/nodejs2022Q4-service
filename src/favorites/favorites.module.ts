import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { InMemoryFavoriteStorage } from './store/favorites.storage';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'IFavoriteStorage',
      useClass: InMemoryFavoriteStorage,
    },
  ],
})
export class FavoritesModule {}
