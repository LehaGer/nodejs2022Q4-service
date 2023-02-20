import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumSqlEntity } from './album.sql.entity';

@Entity({ name: 'favorites_albums' })
export class FavouriteAlbumSqlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @OneToOne(() => AlbumSqlEntity)
  @JoinColumn({ name: 'albumId' })
  album: AlbumSqlEntity;
}
