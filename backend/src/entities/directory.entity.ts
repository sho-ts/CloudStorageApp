import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Post } from '@entity/post.entity';

@Entity()
export class Directory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  uid: string;

  @Column('tinyint', { width: 1, default: 0 })
  del_flg: number;

  @Column('text')
  name: string;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;

  @OneToMany(type => Post, post => post.directory)
  @JoinColumn()
  post: Post
}