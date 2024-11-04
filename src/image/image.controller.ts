import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    // 썸네일 이미지 업로드
    @UseGuards(JwtAuthGuard)
    @Post('thumbnail/upload')
    @UseInterceptors(FileInterceptor('thumbnail'))
    async thumbnailUpload(@UploadedFile() thumbnail: Express.Multer.File) {
        const { path } = await this.imageService.thumbnailUpload(thumbnail);
        return path;
    }

    // 에디터 이미지 업로드
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async imageUpload(@UploadedFile() image: Express.Multer.File) {
        const { path } = await this.imageService.imageUpload(image);
        return path;
    }
}
