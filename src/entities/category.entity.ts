import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false, unique: true })
    categoryNumber: number;

    @Column({ type: 'varchar', unique: true })
    categoryName: string;

    @Column({ type: 'int' })
    contentsCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // One to Many : category <-> article
    @OneToMany(() => Article, (article) => article.category, {
        cascade: true,
    })
    articles: Article[];
}
