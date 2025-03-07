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
    id: number;

    // 댓글 작성자
    @Column({ type: 'uuid', nullable: false })
    senderId: string;

    // 알림 수신자
    @Column({ type: 'uuid', nullable: true })
    receiverId: string | null;

    // 댓글이 달린 글
    @Column({ type: 'int', nullable: false })
    articleId: number;

    @Column({ type: 'boolean', default: false })
    isRead: boolean;

    @Column({ type: 'varchar' })
    message: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

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
