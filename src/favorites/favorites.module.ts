import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { InMemoryStorage } from '../database/stores/in-memory.storage';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'IDatabase',
      useClass: InMemoryStorage,
    },
  ],
  exports: [FavoritesService],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => DatabaseModule),
  ],
})
export class FavoritesModule {}
