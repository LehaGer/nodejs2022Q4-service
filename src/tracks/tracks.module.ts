import { forwardRef, Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { InMemoryTrackStorage } from './store/track.storage';
import { TracksService } from './tracks.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'ITrackStorage',
      useClass: InMemoryTrackStorage,
    },
  ],
  exports: [TracksService],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class TracksModule {}
