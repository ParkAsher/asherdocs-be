import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // 카테고리 불러오기
    @Get('/')
    async getCategories() {
        return await this.categoryService.getCategories();
    }
}
