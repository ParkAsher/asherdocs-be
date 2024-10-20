import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { EditCommentDto } from './dtos/edit-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ) {}

    async createComment(data: CreateCommentDto) {
        return await this.commentRepository.save(data);
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
