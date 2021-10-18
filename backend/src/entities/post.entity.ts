import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    description: string;

    @CreateDateColumn()
    readonly created_at?: Date;

    @UpdateDateColumn()
    readonly updated_at?: Date;

    @Column('tinyint', { width: 1, default: 1 })
    del_flg: number;
}