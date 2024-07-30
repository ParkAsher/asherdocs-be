import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    // 글 등록
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createArticle(@Body() data: CreateArticleDto) {
        return await this.articleService.createArticle(data);
    }
}
