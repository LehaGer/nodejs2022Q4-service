import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import { FavouriteArtistSqlEntity } from './stores/typeorm.storage/entities/favourite.artist.sql.entity';
import { FavouriteTrackSqlEntity } from './stores/typeorm.storage/entities/favourite.track.sql.entity';
import { UserSqlEntity } from './stores/typeorm.storage/entities/user.sql.entity';
import { FavouriteAlbumSqlEntity } from './stores/typeorm.storage/entities/favourite.album.sql.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumSqlEntity } from './stores/typeorm.storage/entities/album.sql.entity';
import { ArtistSqlEntity } from './stores/typeorm.storage/entities/artist.sql.entity';
import { TrackSqlEntity } from './stores/typeorm.storage/entities/track.sql.entity';
import { TypeOrmStorage } from './stores/typeorm.storage';

@Module({
  providers: [
    DatabaseService,
    {
      provide: 'IDatabase',
      useClass: TypeOrmStorage,
    },
  ],
  exports: [DatabaseService, TypeOrmModule],
  imports: [
    ConfigModule.forRoot(),
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
