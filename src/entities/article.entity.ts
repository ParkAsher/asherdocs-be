import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Notification } from './notification.entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'int', nullable: false })
    categoryId: number;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'uuid', nullable: false })
    userId: string;

    @Column({ type: 'int', default: 0 })
    views: number;

    @Column({ type: 'varchar' })
    thumbnail: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //---------------------------------------------------------

    @ManyToOne(() => Category, (category) => category.articles, {
        onDelete: 'NO ACTION',
    })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @ManyToOne(() => User, (user) => user.articles, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Comment, (comment) => comment.article, {
        cascade: true,
    })
    comments: Comment[];

    @OneToMany(() => Notification, (notification) => notification.article, {
        cascade: true,
    })
    notifications: Notification[];
}
