import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { Category } from 'src/entities/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article, Category])],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule {}
