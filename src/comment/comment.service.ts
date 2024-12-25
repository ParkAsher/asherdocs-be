import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { EditCommentDto } from './dtos/edit-comment.dto';
import { NotificationService } from 'src/notification/notification.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private notificationService: NotificationService,
    ) {}

    async createComment(data: CreateCommentDto) {
        const { userId, articleId, comment, receiverId } = data;

        // 댓글 작성자 닉네임 가져오기
        const { nickname: senderNickname } = await this.userRepository.findOne({
            where: { id: userId },
        });

        // 댓글 저장
        const savedComment = await this.commentRepository.save({
            userId,
            articleId,
            comment,
        });

        const message = `${senderNickname} 님이 회원님의 글에 댓글을 작성했습니다.`;

        // 알림 저장
        await this.notificationService.createNotification(
            articleId,
            userId,
            receiverId,
            message,
        );

        return savedComment;
    }

    async deleteComment(id: number) {
        return await this.commentRepository.delete(id);
    }

    async editComment(id: number, data: EditCommentDto) {
        return await this.commentRepository.update(id, data);
    }

    async getComments(id: number, page: number) {
        const limit = 5;

        return await this.commentRepository
            .createQueryBuilder('comment')
            .select([
                'comment.id',
                'comment.comment',
                'comment.createdAt',
                'user.id',
                'user.nickname',
            ])
            .innerJoin('comment.user', 'user')
            .where('comment.articleId = :id', { id })
            .orderBy('comment.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getMany();
    }
}
