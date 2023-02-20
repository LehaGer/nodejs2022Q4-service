import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistSqlEntity } from './artist.sql.entity';

@Entity({ name: 'albums' })
export class AlbumSqlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'numeric' })
  year: number;

  @ManyToOne(() => ArtistSqlEntity)
  @JoinColumn({ name: 'artistId' })
  artistId: string | null; // refers to Artist
}
