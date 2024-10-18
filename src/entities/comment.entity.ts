import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Article } from './article.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'uuid', nullable: false })
    userId: string;

    @Column({ type: 'int', nullable: false })
    articleId: number;

    @Column({ type: 'text', nullable: false })
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //---------------------------------------------------------

    @ManyToOne(() => User, (user) => user.comments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Article, (article) => article.comments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'articleId' })
    article: Article;
}
