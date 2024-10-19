import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createComment(@Body() data: CreateCommentDto) {
        return await this.commentService.createComment(data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteComment(@Param('id') id: number) {
        return await this.commentService.deleteComment(id);
    }
}
