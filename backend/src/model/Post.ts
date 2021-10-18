import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    description: string;
}