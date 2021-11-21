import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    uid: string;

    @Column('text')
    description: string;

    @Column('text')
    file_size: string;

    @Column('text')
    file_path: string

    @CreateDateColumn()
    readonly created_at?: Date;

    @UpdateDateColumn()
    readonly updated_at?: Date;

    @Column('tinyint', { width: 1, default: 0 })
    del_flg: number;
}