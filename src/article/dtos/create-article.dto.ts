import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    userId: string;
}
