import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  cognito_id: string;

  @Column({ type: 'int', default: 0 })
  plan: number;

  @Column({ type: 'int', default: 0 })
  capacity: number;
}