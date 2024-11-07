import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { Comment } from './comment.entity';
import { Notification } from './notification.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', unique: true })
    nickname: string;

    @Column({ type: 'int', default: 2 })
    role: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    //---------------------------------------------------------

    @OneToMany(() => Article, (article) => article.user, {
        cascade: true,
    })
    articles: Article[];

    @OneToMany(() => Comment, (comment) => comment.user, {
        cascade: true,
    })
    comments: Comment[];

    @OneToMany(() => Notification, (notification) => notification.sender, {
        cascade: true,
    })
    sentNotifications: Notification[];

    @OneToMany(() => Notification, (notification) => notification.receiver, {
        cascade: true,
    })
    receivedNotifications: Notification[];
}
