import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IResponse, IStatus } from 'src/interfaces/responses';
import { ICategory } from 'src/interfaces/responses/categories';
import logger from 'src/logger/logger';
import { CategoryService } from './categories.service';
import { CategoriesPagListResponse } from './dto/categories-pag-list-response.dto';
import { AllCategoriesResponse } from './dto/all-categories-response.dto';
import { CategoryResponse } from './dto/category-response.dto';
import { CreateCategory } from './dto/create-category.dto';
import { CategoryStatusResponse } from './dto/category-status-response.dto';
import { UpdateCategory } from './dto/update-category.dto';
import { PartialyUpdateCategory } from './dto/partialy-update-category.dto';

@Controller('categories')
@ApiTags('Работа с категориями')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /* TODO: Эта часть будет переделана под рагинацию, сортировку и фильтрацию.
     IResponse<ICategory> нужно будет заменить на что-то с пагинацией (эта часть 100% не подойдет)
  */
  @Get()
  @ApiOperation({
    summary:
      'Возвращает список категорий (с пагинацией, сортировкой и фильтрацией).',
  })
  @ApiResponse({ status: 200, type: CategoriesPagListResponse })
  async getCategoriesList(): Promise<IResponse<ICategory>> {
    logger.info('Working controller for GET "/categories/" endpoint.');
    return this.categoryService.getCategoriesList();
  }

  @Get('get-all-categories')
  @ApiOperation({
    summary:
      'Возвращает ВЕСЬ список категорий (весь без пагинации, сортировки и фильтрации).',
  })
  @ApiResponse({ status: 200, type: AllCategoriesResponse })
  async getAllCategories(): Promise<IResponse<ICategory>> {
    logger.info(
      'Working controller for GET "/categories/get-all-categories" endpoint.',
    );
    return this.categoryService.getAllCategories();
  }

  @Get('slug?')
  @ApiOperation({ summary: 'Возвращает категорию с указанным slug.' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  async getCategoryBySlug(
    @Query('slug') slug: string,
  ): Promise<IResponse<ICategory>> {
    logger.info(
      `Working controller for \"/categories?slug=${slug}\" endpoint.`,
    );
    return this.categoryService.getCategoryBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Возвращает категорию с указанным id.' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  async getCategoryById(
    @Param('id') id: number,
  ): Promise<IResponse<ICategory>> {
    logger.info(`Working controller for GET \"/categories/${id}\" endpoint.`);
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создание новой категории.' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  async createCategory(
    @Body() dto: CreateCategory,
  ): Promise<IResponse<ICategory>> {
    logger.info(`Working controller for POST \"/categories/\" endpoint.`);
    return this.categoryService.crearteCategory(dto);
  }

  // Нужно добавить id в запрос
  @Put()
  @ApiOperation({
    summary:
      'Обновление всей категории целиком (НА ДАННЫЙ МОМЕНТ НЕ РАБОТАЕТ).',
  })
  @ApiResponse({ status: 200, type: CategoryStatusResponse })
  async updateCategory(
    @Body() dto: UpdateCategory,
  ): Promise<IResponse<IStatus>> {
    logger.info(`Working controller for PUT \"/categories/\" endpoint.`);
    return this.categoryService.updateCategory(dto);
  }

  // Нужно добавить id в запрос
  @Patch()
  @ApiOperation({
    summary: 'Обновление категории частично (НА ДАННЫЙ МОМЕНТ НЕ РАБОТАЕТ).',
  })
  @ApiResponse({ status: 200, type: CategoryStatusResponse })
  async partialyUpdateCategory(
    @Body() dto: PartialyUpdateCategory,
  ): Promise<IResponse<IStatus>> {
    logger.info(`Working controller for PATCH \"/categories/\" endpoint.`);
    return this.categoryService.partialyUpdateCategory(dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: CategoryStatusResponse })
  async deleteCategory(@Param('id') id: number): Promise<IResponse<IStatus>> {
    logger.info(
      `Working controller for DELETE \"/categories/${id}\" endpoint.`,
    );
    return this.categoryService.deleteCategory(id);
  }
}
