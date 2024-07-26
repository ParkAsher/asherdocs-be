import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dtos/create-article.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    async createArticle(data: CreateArticleDto) {
        return await this.articleRepository.save(data);
    }
}
