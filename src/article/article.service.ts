import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        private dataSource: DataSource,
    ) {}

    async createArticle(data: CreateArticleDto) {
        const { title, content, categoryId, userId } = data;

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            /* 비즈니스 로직 */
            // 글 저장
            await this.articleRepository.save({
                title,
                content,
                categoryId,
                userId,
            });

            // 카테고리 글 수 + 1
            await this.categoryRepository.increment(
                { id: categoryId },
                'contentsCount',
                1,
            );

            // 커밋
            await queryRunner.commitTransaction();
        } catch (error) {
            // 트랜잭션 실패 시 롤백.
            console.log(error);
            await queryRunner.rollbackTransaction();
        } finally {
            // 트랜잭션 종료 시 연결 종료.
            await queryRunner.release();
        }
    }
}
