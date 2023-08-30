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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('get-categories-list')
  @ApiResponse({ status: 200, type: CategoriesListResponse })
  async getCategoriesList(): Promise<IResponse<ICategoriesList>> {
    logger.info(
      'Working controller for "/categories/get-categories-list" endpoint.',
    );
    return this.categoryService.getCategoriesList();
  }

  @Get('get-all-categories')
  @ApiResponse({ status: 200, type: AllCategoriesResponse })
  async getAllCategories(): Promise<IResponse<IAllCategories>> {
    logger.info(
      'Working controller for "/categories/get-all-categories" endpoint.',
    );
    return this.categoryService.getAllCategories();
  }

  @Get('get-category-by-id/:id')
  @ApiResponse({ status: 200, type: CategoryByIdResponse })
  async getCategoryById(
    @Param('id') id: number,
  ): Promise<IResponse<ICategory>> {
    logger.info(
      `Working controller for \"/categories/get-category-by-id/${id}\" endpoint.`,
    );
    return this.categoryService.getCategoryById(id);
  }

  // Нужно изменить на search параметр URL
  @Get('get-category-by-slug/:slug')
  @ApiResponse({ status: 200, type: CategoryByIdResponse })
  async getCategoryBySlug(
    @Param('slug') slug: string,
  ): Promise<IResponse<ICategory>> {
    logger.info(
      `Working controller for \"/categories/get-category-by-slug/${slug}\" endpoint.`,
    );
    return this.categoryService.getCategoryBySlug(slug);
  }

  @Post('create-category')
  @ApiResponse({ status: 200, type: CreateCategoryResponse })
  async createCategory(
    @Body() dto: CreateCategoryDto,
  ): Promise<IResponse<ICategory>> {
    logger.info(
      `Working controller for \"/categories/create-category\" endpoint.`,
    );
    return this.categoryService.crearteCategory(dto);
  }

  // Нужно добавить id в запрос
  @Put('update-category')
  @ApiResponse({ status: 200, type: UpdateCategoryResponse })
  async updateCategory(
    @Body() dto: UpdateCategoryDto,
  ): Promise<IResponse<IUpdateCategoryStatus>> {
    logger.info(
      `Working controller for \"/categories/update-category\" endpoint.`,
    );
    return this.categoryService.updateCategory(dto);
  }

  // Нужно добавить id в запрос
  @Patch('partialy-update-category')
  @ApiResponse({ status: 200, type: UpdateCategoryResponse })
  async partialyUpdateCategory(
    @Body() dto: PartialyUpdateCategoryDto,
  ): Promise<IResponse<IUpdateCategoryStatus>> {
    logger.info(
      `Working controller for \"/categories/update-category/partialy-update-category\" endpoint.`,
    );
    return this.categoryService.partialyUpdateCategory(dto);
  }

  @Delete('delete-category/:id')
  @ApiResponse({ status: 200, type: CategoryByIdResponse })
  async deleteCategory(
    @Param('id') id: number,
  ): Promise<IResponse<IDeleteCategoryStatus>> {
    logger.info(
      `Working controller for \"/categories/get-category-by-id/${id}\" endpoint.`,
    );
    return this.categoryService.deleteCategory(id);
  }
}
