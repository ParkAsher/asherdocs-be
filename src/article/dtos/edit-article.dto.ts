import { IsNotEmpty, IsString } from 'class-validator';

export class EditArticleDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    content: string;

    @IsString()
    thumbnail: string;
}
