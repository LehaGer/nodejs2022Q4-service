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

  @ManyToOne(() => ArtistSqlEntity, {
    onDelete: 'SET NULL',
    nullable: true,
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'artistId', foreignKeyConstraintName: 'artistId' })
  artist: ArtistSqlEntity | null; // refers to Artist

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => AlbumSqlEntity, {
    onDelete: 'SET NULL',
    nullable: true,
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumSqlEntity | null; // refers to Album

  @Column({ nullable: true })
  albumId: string | null;

  @Column({ type: 'float8' })
  duration: number; // integer number
}
