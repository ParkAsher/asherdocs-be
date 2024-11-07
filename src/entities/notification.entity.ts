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
export class Notification {
    @PrimaryGeneratedColumn()
    id: string;

    // 댓글 작성자
    @Column({ type: 'uuid', nullable: false })
    senderId: string;

    // 알림 수신자
    @Column({ type: 'uuid', nullable: false })
    receiverId: string;

    // 댓글이 달린 글
    @Column({ type: 'int', nullable: false })
    articleId: number;

    @Column({ type: 'boolean' })
    isRead: boolean;

    @Column({ type: 'varchar' })
    message: string;

    @CreateDateColumn()
    createdAt: null;

    @UpdateDateColumn()
    updatedAt: null;

    //---------------------------------------------------------

    @ManyToOne(() => User, (user) => user.sentNotifications, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedNotifications, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'receiverId' })
    receiver: User;

    @ManyToOne(() => Article, (article) => article, {
        onDelete: 'NO ACTION',
    })
    @JoinColumn({ name: 'articleId' })
    article: Article;
}
