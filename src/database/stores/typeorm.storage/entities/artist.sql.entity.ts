import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artists' })
export class ArtistSqlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'bool' })
  grammy: boolean;
}
