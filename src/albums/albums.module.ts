import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { InMemoryAlbumStorage } from './store/album.storage';
import { AlbumsService } from './albums.service';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'IAlbumStorage',
      useClass: InMemoryAlbumStorage,
    },
  ],
  exports: [AlbumsService],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
  ],
})
export class AlbumsModule {}
