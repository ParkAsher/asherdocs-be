import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    articleId: number;

    @IsOptional()
    @IsUUID()
    receiverId: string;

    @IsNotEmpty()
    @IsString()
    comment: string;
}
