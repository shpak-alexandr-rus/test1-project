import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/interfaces/responses';
import {
  IAllCategories,
  ICategoriesList,
  ICategory,
  IDeleteCategoryStatus,
  IUpdateCategoryStatus,
} from 'src/interfaces/responses/categories';
import logger from 'src/logger/logger';
import { CategoryService } from './categories.service';
import {
  AllCategoriesResponse,
  CategoriesListResponse,
  CategoryByIdResponse,
  CreateCategoryResponse,
  PartialyUpdateCategoryDto,
  UpdateCategoryDto,
  UpdateCategoryResponse,
} from 'src/dto/categories/category.dto';
import { CreateCategoryDto } from 'src/dto/categories/category.dto';

@Controller('categories')
@ApiTags('Работа с категориями')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({summary: "Возвращает список категорий (с пагинацией, сортировкой и фильтрацией)."})
  @ApiResponse({ status: 200, type: CategoriesListResponse })
  async getCategoriesList(): Promise<IResponse<ICategoriesList>> {
    logger.info(
      'Working controller for GET "/categories/" endpoint.',
    );
    return this.categoryService.getCategoriesList();
  }

  @Get('get-all-categories')
  @ApiOperation({summary: "Возвращает ВЕСЬ список категорий (весь без пагинации, сортировки и фильтрации)."})
  @ApiResponse({ status: 200, type: AllCategoriesResponse })
  async getAllCategories(): Promise<IResponse<IAllCategories>> {
    logger.info(
      'Working controller for GET "/categories/get-all-categories" endpoint.',
    );
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  @ApiOperation({summary: "Возвращает категорию с указанным id."})
  @ApiResponse({ status: 200, type: CategoryByIdResponse })
  async getCategoryById(
    @Param('id') id: number,
  ): Promise<IResponse<ICategory>> {
    logger.info(
      `Working controller for GET \"/categories/${id}\" endpoint.`,
    );
    return this.categoryService.getCategoryById(id);
  }

  // Нужно изменить на search параметр URL
  @Get(':slug')
  @ApiOperation({summary: "Возвращает категорию с указанным slug."})
  @ApiResponse({ status: 200, type: CategoryByIdResponse })
  async getCategoryBySlug(
    @Param('slug') slug: string,
  ): Promise<IResponse<ICategory>> {
    logger.info(
      `Working controller for \"/categories/${slug}\" endpoint.`,
    );
    return this.categoryService.getCategoryBySlug(slug);
  }

  @Post()
  @ApiOperation({summary: "Создание новой категории."})
  @ApiResponse({ status: 200, type: CreateCategoryResponse })
  async createCategory(
    @Body() dto: CreateCategoryDto,
  ): Promise<IResponse<ICategory>> {
    logger.info(
      `Working controller for POST \"/categories/\" endpoint.`,
    );
    return this.categoryService.crearteCategory(dto);
  }

  // Нужно добавить id в запрос
  @Put()
  @ApiOperation({summary: "Обновление всей категории целиком."})
  @ApiResponse({ status: 200, type: UpdateCategoryResponse })
  async updateCategory(
    @Body() dto: UpdateCategoryDto,
  ): Promise<IResponse<IUpdateCategoryStatus>> {
    logger.info(
      `Working controller for PUT \"/categories/\" endpoint.`,
    );
    return this.categoryService.updateCategory(dto);
  }

  // Нужно добавить id в запрос
  @Patch()
  @ApiOperation({summary: "Обновление категории частично."})
  @ApiResponse({ status: 200, type: UpdateCategoryResponse })
  async partialyUpdateCategory(
    @Body() dto: PartialyUpdateCategoryDto,
  ): Promise<IResponse<IUpdateCategoryStatus>> {
    logger.info(
      `Working controller for PATCH \"/categories/\" endpoint.`,
    );
    return this.categoryService.partialyUpdateCategory(dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: CategoryByIdResponse })
  async deleteCategory(
    @Param('id') id: number,
  ): Promise<IResponse<IDeleteCategoryStatus>> {
    logger.info(
      `Working controller for DELETE \"/categories/${id}\" endpoint.`,
    );
    return this.categoryService.deleteCategory(id);
  }
}
