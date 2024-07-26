import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule {}
