import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    articleId: number;

    @IsNotEmpty()
    @IsString()
    comment: string;
}
