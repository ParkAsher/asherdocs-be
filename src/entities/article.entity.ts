import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    // Many to One : article <-> category
    @ManyToOne(() => Category, (category) => category.articles, {
        onDelete: 'NO ACTION',
    })
    category: Category;

    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => User, (user) => user.articles, {
        onDelete: 'CASCADE',
    })
    user: User;

    @Column({ type: 'int', default: 0 })
    views: number;
}
