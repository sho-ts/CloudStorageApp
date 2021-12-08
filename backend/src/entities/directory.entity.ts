import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Directory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  uid: string;
}