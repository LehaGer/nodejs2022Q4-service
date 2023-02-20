import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistSqlEntity } from './artist.sql.entity';

@Entity({ name: 'favorites_artists' })
export class FavouriteArtistSqlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @OneToOne(() => ArtistSqlEntity)
  @JoinColumn({ name: 'artistId' })
  artist: ArtistSqlEntity;
}
