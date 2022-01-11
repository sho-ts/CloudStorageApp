import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Directory } from '@entity/directory.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  uid: string;

  @Column('text')
  description: string;

  @Column('text')
  file_size: number;

  @Column('text')
  file_path: string

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;

  @Column('tinyint', { width: 1, default: 0 })
  del_flg: number;

  @Column('tinyint', { width: 1, default: 0 })
  disclosure_range: number;

  @Column({ nullable: true, type: 'longtext' })
  allowed_email: string

  @Column({ nullable: true, type: 'text' })
  password: string

  @ManyToOne(type => Directory)
  @JoinColumn()
  directory: Directory;
}