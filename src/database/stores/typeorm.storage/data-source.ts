import { DataSource, DataSourceOptions } from 'typeorm';
import { FavouriteTrackSqlEntity } from './entities/favourite.track.sql.entity';
import { FavouriteAlbumSqlEntity } from './entities/favourite.album.sql.entity';
import { FavouriteArtistSqlEntity } from './entities/favourite.artist.sql.entity';
import { UserSqlEntity } from './entities/user.sql.entity';
import { AlbumSqlEntity } from './entities/album.sql.entity';
import { ArtistSqlEntity } from './entities/artist.sql.entity';
import { TrackSqlEntity } from './entities/track.sql.entity';

const defaultProps = {
  DB_HOST_PORT: 5432,
  POSTGRES_DB: 'rest-api-db',
  POSTGRES_USER: 'admin',
  POSTGRES_PASSWORD: '1234',
  POSTGRES_DB_NETWORK_NAME: 'localhost',
};

const {
  DB_HOST_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_NETWORK_NAME,
} = process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${POSTGRES_DB_NETWORK_NAME ?? defaultProps.POSTGRES_DB_NETWORK_NAME}`,
  port: Number(DB_HOST_PORT ?? defaultProps.DB_HOST_PORT),
  username: `${POSTGRES_USER ?? defaultProps.POSTGRES_USER}`,
  password: `${POSTGRES_PASSWORD ?? defaultProps.POSTGRES_PASSWORD}`,
  database: `${POSTGRES_DB ?? defaultProps.POSTGRES_DB}`,
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
