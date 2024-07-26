import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    // 글 등록
    @Post('/')
    async createArticle(@Body() data: CreateArticleDto) {
        return await this.articleService.createArticle(data);
    }
}
