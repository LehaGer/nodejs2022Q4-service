import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserSqlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ type: 'varchar', length: 255 })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @Column({ type: 'int8' })
  createdAt: number; // timestamp of creation

  @Column({ type: 'int8' })
  updatedAt: number; // timestamp of last update
}
