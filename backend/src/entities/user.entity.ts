import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  cognito_id: string;

  @Column({ type: 'int', default: 0 })
  plan: number;

  @Column({ type: 'int', default: 0 })
  storage: number;

  @Column('text')
  name: string;

  @Column('tinyint', { width: 1, default: 0 })
  del_flg: number;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}