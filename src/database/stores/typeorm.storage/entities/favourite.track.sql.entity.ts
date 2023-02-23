import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackSqlEntity } from './track.sql.entity';

@Entity({ name: 'favorites_tracks' })
export class FavouriteTrackSqlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @OneToOne(() => TrackSqlEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId' })
  track: TrackSqlEntity;

  @Column({ nullable: true })
  trackId: string | null;
}
