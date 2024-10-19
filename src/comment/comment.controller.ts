import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EditCommentDto } from './dtos/edit-comment.dto';

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

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async editComment(@Param('id') id: number, @Body() data: EditCommentDto) {
        return await this.commentService.editComment(id, data);
    }
}
