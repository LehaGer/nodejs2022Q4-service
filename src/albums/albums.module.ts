import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
    forwardRef(() => DatabaseModule),
    forwardRef(() => AuthModule),
  ],
})
export class AlbumsModule {}
