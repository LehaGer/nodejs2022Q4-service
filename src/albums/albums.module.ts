import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { InMemoryStorage } from '../database/stores/in-memory.storage';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'IDatabase',
      useClass: InMemoryStorage,
    },
  ],
  exports: [AlbumsService],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => DatabaseModule),
  ],
})
export class AlbumsModule {}
