import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: number; // timestamp of creation

  @UpdateDateColumn()
  updatedAt: number; // timestamp of last update
}
