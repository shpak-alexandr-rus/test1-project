import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPagination, IResponse, IStatus } from 'src/interfaces/responses';
import { ICategory } from 'src/interfaces/responses/categories';
import logger from 'src/logger/logger';
import { CategoryService } from './categories.service';
import { AllCategoriesResponse } from './dto/all-categories-response.dto';
import { CategoryResponse } from './dto/category-response.dto';
import { CreateCategory } from './dto/create-category.dto';
import { CategoryStatusResponse } from './dto/category-status-response.dto';
import { UpdateCategory } from './dto/update-category.dto';
import { PartialyUpdateCategory } from './dto/partialy-update-category.dto';
import { FilterQuery } from './dto/filter-query.dto';
import { CategoryPaginationResponse } from './dto/category-pagination-response.dto';

@Controller('categories')
@ApiTags('Работа с категориями')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /* TODO: Эта часть будет переделана под рагинацию, сортировку и фильтрацию.
     IResponse<ICategory> нужно будет заменить на что-то с пагинацией (эта часть 100% не подойдет)
  */
  @Get('?')
  @ApiOperation({
    summary:
      'Возвращает список категорий (с пагинацией, сортировкой и фильтрацией). ПОКА БЕЗ Е И Ё',
  })
  @ApiResponse({ status: 200, type: CategoryPaginationResponse })
  async getCategoriesList(
    @Query() query: FilterQuery
  ): Promise<IResponse<IPagination<ICategory>>> {
    logger.info('Working controller for GET "/categories/" endpoint.');
    const result: IResponse<IPagination<ICategory>> = await this.categoryService.getCategoriesList(query);
    this.throwExceptionIfBadCode(result);
    return result;
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
    const result: IResponse<ICategory> = await this.categoryService.getAllCategories();
    this.throwExceptionIfBadCode(result);
    return result;
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
    const result: IResponse<ICategory> = await this.categoryService.getCategoryBySlug(slug);
    this.throwExceptionIfBadCode(result);
    return result;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Возвращает категорию с указанным id.' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  async getCategoryById(
    @Param('id') id: number,
  ): Promise<IResponse<ICategory>> {
    logger.info(`Working controller for GET \"/categories/${id}\" endpoint.`);
    const result = await this.categoryService.getCategoryById(id);
    this.throwExceptionIfBadCode(result);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Создание новой категории.' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  async createCategory(
    @Body() dto: CreateCategory,
  ): Promise<IResponse<ICategory>> {
    logger.info(`Working controller for POST \"/categories/\" endpoint.`);
    const result: IResponse<ICategory> = await this.categoryService.crearteCategory(dto);
    this.throwExceptionIfBadCode(result);
    return result;
  }

  // Нужно добавить id в запрос
  @Put(':id')
  @ApiOperation({
    summary:
      'Обновление всей категории целиком.',
  })
  @ApiResponse({ status: 200, type: CategoryStatusResponse })
  async updateCategory(
    @Param('id') id: number,
    @Body() dto: UpdateCategory,
  ): Promise<IResponse<IStatus>> {
    logger.info(`Working controller for PUT \"/categories/${id}\" endpoint.`);
    const result: IResponse<IStatus> = await this.categoryService.updateCategory(id, dto);
    this.throwExceptionIfBadCode(result);
    return result;
  }

  // Нужно добавить id в запрос
  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление категории частично.',
  })
  @ApiResponse({ status: 200, type: CategoryStatusResponse })
  async partialyUpdateCategory(
    @Param('id') id: number,
    @Body() dto: PartialyUpdateCategory,
  ): Promise<IResponse<IStatus>> {
    logger.info(`Working controller for PATCH \"/categories/${id}\" endpoint.`);
    const result: IResponse<IStatus> = await this.categoryService.partialyUpdateCategory(id, dto);
    this.throwExceptionIfBadCode(result);
    return result;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: CategoryStatusResponse })
  async deleteCategory(@Param('id') id: number): Promise<IResponse<IStatus>> {
    logger.info(
      `Working controller for DELETE \"/categories/${id}\" endpoint.`,
    );
    const result: IResponse<IStatus> = await this.categoryService.deleteCategory(id);
    this.throwExceptionIfBadCode(result);
    return result;
  }

  // Приватная часть
  private throwExceptionIfBadCode(result: IResponse<any>): void {
    if (result.code > 399) {
      throw new HttpException(result.message, result.code);
    }
  }
}
