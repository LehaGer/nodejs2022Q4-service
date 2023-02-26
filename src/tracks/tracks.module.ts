import { forwardRef, Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { DatabaseModule } from '../database/database.module';
import { InMemoryStorage } from '../database/stores/in-memory.storage';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'IDatabase',
      useClass: InMemoryStorage,
    },
  ],
  exports: [TracksService],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => DatabaseModule),
  ],
})
export class TracksModule {}
