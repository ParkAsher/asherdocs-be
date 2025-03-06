import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';
import { Category } from 'src/entities/category.entity';
import { EditArticleDto } from './dtos/edit-article.dto';
import { generateSlug } from 'src/utils/slug';

const ARTICLE_PER_PAGE = 5;

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
        const { title, content, categoryId, userId, thumbnail } = data;

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            /* 비즈니스 로직 */

            // Slug 생성
            const slug = await generateSlug(title);

            // 글 저장
            await this.articleRepository.save({
                title,
                content,
                categoryId,
                userId,
                thumbnail,
                slug,
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

    async getArticles(category: string, page: number) {
        const limit = ARTICLE_PER_PAGE;

        if (category === 'undefined') {
            return await this.getAllArticles(page, limit);
        } else {
            return await this.getArticlesWithCategory(category, page, limit);
        }
    }

    async getArticlesWithCategory(
        category: string,
        page: number,
        limit: number,
    ) {
        const categoryName = category;

        return this.articleRepository
            .createQueryBuilder('article')
            .select([
                'article.id',
                'article.title',
                'article.thumbnail',
                'article.createdAt',
                'article.views',
                'article.slug',
                'category.categoryName',
            ])
            .innerJoin('article.category', 'category')
            .where('category.categoryName = :categoryName', { categoryName })
            .orderBy('article.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getMany();
    }

    async getAllArticles(page: number, limit: number) {
        return this.articleRepository.find({
            relations: {
                category: true,
            },
            select: {
                id: true,
                title: true,
                thumbnail: true,
                createdAt: true,
                views: true,
                slug: true,
                category: {
                    categoryName: true,
                },
            },
            take: limit,
            skip: (page - 1) * limit,
            order: { createdAt: 'DESC' },
        });
    }

    async getArticle(slug: string) {
        // 조회수 증가 (원자적 연산)
        await this.updateViews(slug);

        const article = await this.articleRepository.findOne({
            select: {
                category: {
                    id: true,
                    categoryName: true,
                },
            },
            where: { slug },
            relations: ['category'],
        });

        return article;
    }

    async deleteArticle(slug: string) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            /* 비즈니스 로직 */

            // 글 카테고리 정보 가져오기
            const { category } = await this.getArticle(slug);
            const { id: categoryId } = category;

            // 글 삭제
            await this.articleRepository.delete({ slug });

            // 카테고리 글 수 - 1
            await this.categoryRepository.decrement(
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

    async editArticle(slug: string, data: EditArticleDto) {
        const article = await this.articleRepository.findOne({
            where: { slug },
        });

        if (!article) throw new NotFoundException('게시글을 찾을 수 없습니다.');

        // 제목 수정 시 slug 수정
        if (data.title !== article.title) {
            const newSlug = await generateSlug(data.title, article.createdAt);

            article.slug = newSlug;
        }

        // 수정된 데이터를 엔티티에 반영
        Object.assign(article, data);

        return this.articleRepository.save(article);
    }

    async updateViews(slug: string) {
        await this.articleRepository.increment({ slug }, 'views', 1);
    }

    async getSearchArticle(keyword: string, page: number) {
        const limit = ARTICLE_PER_PAGE;

        return await this.articleRepository
            .createQueryBuilder('article')
            .select([
                'article.id',
                'article.title',
                'article.thumbnail',
                'article.createdAt',
                'article.views',
                'article.slug',
                'category.categoryName',
            ])
            .innerJoin('article.category', 'category')
            .where(
                'article.title LIKE :keyword OR article.content LIKE :keyword',
                { keyword: `%${keyword}%` },
            )
            .orderBy('article.createdAt', 'DESC')
            .take(limit)
            .skip((page - 1) * limit)
            .getMany();
    }
}
