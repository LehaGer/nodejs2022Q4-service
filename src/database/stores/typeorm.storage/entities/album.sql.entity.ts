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

  @Column({ type: 'int4' })
  year: number;

  @ManyToOne(() => ArtistSqlEntity, {
    onDelete: 'SET NULL',
    nullable: true,
    orphanedRowAction: 'nullify',
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistSqlEntity | null; // refers to Artist

  @Column({ nullable: true })
  artistId: string | null;
}
