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
import { Comment } from './comment.entity';

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', nullable: false })
    userId: string;

    @Column({ type: 'int', nullable: false })
    commentId: number;

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

    @ManyToOne(() => Comment, (comment) => comment.replies, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'commentId' })
    comment: Comment;
}
