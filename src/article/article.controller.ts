import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create-article.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EditArticleDto } from './dtos/edit-article.dto';

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

    // 글 검색
    @Get('search')
    async getSearchArticles(
        @Query('page') page: number,
        @Query('keyword') keyword: string,
    ) {
        console.log(keyword, page);
        return await this.articleService.getSearchArticle(keyword, page);
    }

    // 글 목록 가져오기
    @Get()
    async getArticles(
        @Query('page') page: number,
        @Query('category') category: string,
    ) {
        return await this.articleService.getArticles(category, page);
    }

    // 글 상세 가져오기
    @Get(':slug')
    async getArticle(@Param('slug') slug: string) {
        return await this.articleService.getArticle(slug);
    }

    // 글 삭제
    @Delete(':slug')
    async deleteArticle(@Param('slug') slug: string) {
        return await this.articleService.deleteArticle(slug);
    }

    // 글 수정
    @Put(':slug')
    async editArticle(
        @Param('slug') slug: string,
        @Body() data: EditArticleDto,
    ) {
        return await this.articleService.editArticle(slug, data);
    }
}
