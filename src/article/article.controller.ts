import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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
        console.log(data);
        return await this.articleService.createArticle(data);
    }

    // 글 가져오기
    @Get()
    async getArticles(
        @Query('page') page: number,
        @Query('category') category: string,
    ) {
        return await this.articleService.getArticles(category, page);
    }
}
