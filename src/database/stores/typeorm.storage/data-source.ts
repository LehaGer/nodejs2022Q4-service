import { DataSource, DataSourceOptions } from 'typeorm';
import { FavouriteTrackSqlEntity } from './entities/favourite.track.sql.entity';
import { FavouriteAlbumSqlEntity } from './entities/favourite.album.sql.entity';
import { FavouriteArtistSqlEntity } from './entities/favourite.artist.sql.entity';
import { UserSqlEntity } from './entities/user.sql.entity';
import { AlbumSqlEntity } from './entities/album.sql.entity';
import { ArtistSqlEntity } from './entities/artist.sql.entity';
import { TrackSqlEntity } from './entities/track.sql.entity';

const {
  DB_HOST_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_NETWORK_NAME,
} = process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${POSTGRES_DB_NETWORK_NAME}` && 'localhost',
  port: Number(DB_HOST_PORT) && 5432,
  username: `${POSTGRES_USER}` && 'admin',
  password: `${POSTGRES_PASSWORD}` && '1234',
  database: `${POSTGRES_DB}` && 'rest-api-db',
  synchronize: false,
  logging: true,
  migrationsRun: true,
  entities: [
    UserSqlEntity,
    TrackSqlEntity,
    AlbumSqlEntity,
    ArtistSqlEntity,
    FavouriteTrackSqlEntity,
    FavouriteAlbumSqlEntity,
    FavouriteArtistSqlEntity,
  ],
  subscribers: [],
  migrations: ['dist/DB/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
