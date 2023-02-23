import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumSqlEntity } from './album.sql.entity';

@Entity({ name: 'favorites_albums' })
export class FavouriteAlbumSqlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @OneToOne(() => AlbumSqlEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId' })
  album: AlbumSqlEntity;

  @Column({ nullable: true })
  albumId: string | null;
}
