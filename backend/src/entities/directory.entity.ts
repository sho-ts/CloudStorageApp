import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Directory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  uid: string;

  @Column('tinyint', { width: 1, default: 0 })
  del_flg: number;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}