import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { InMemoryStorage } from './stores/in-memory.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteArtistSqlEntity } from './stores/typeorm.storage/entities/favourite.artist.sql.entity';
import { FavouriteTrackSqlEntity } from './stores/typeorm.storage/entities/favourite.track.sql.entity';
import { UserSqlEntity } from './stores/typeorm.storage/entities/user.sql.entity';
import { FavouriteAlbumSqlEntity } from './stores/typeorm.storage/entities/favourite.album.sql.entity';
import { AlbumSqlEntity } from './stores/typeorm.storage/entities/album.sql.entity';
import { ArtistSqlEntity } from './stores/typeorm.storage/entities/artist.sql.entity';
import { TrackSqlEntity } from './stores/typeorm.storage/entities/track.sql.entity';

@Module({
  providers: [
    DatabaseService,
    {
      provide: 'IDatabase',
      useClass: InMemoryStorage,
    },
  ],
  exports: [DatabaseService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([
      UserSqlEntity,
      TrackSqlEntity,
      AlbumSqlEntity,
      ArtistSqlEntity,
      FavouriteTrackSqlEntity,
      FavouriteAlbumSqlEntity,
      FavouriteArtistSqlEntity,
    ]),
  ],
})
export class DatabaseModule {}
