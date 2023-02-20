import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistSqlEntity } from './artist.sql.entity';
import { AlbumSqlEntity } from './album.sql.entity';

@Entity({ name: 'tracks' })
export class TrackSqlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => ArtistSqlEntity)
  @JoinColumn({ name: 'artistId' })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => AlbumSqlEntity)
  @JoinColumn({ name: 'albumId' })
  albumId: string | null; // refers to Album

  @Column({ type: 'float8' })
  duration: number; // integer number
}
