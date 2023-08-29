import { HttpStatus, Injectable } from '@nestjs/common';
import { IResponse } from 'src/interfaces/responses';
import logger from '../../logger/logger';
import {
  ICategoriesList,
  ICategory,
  IDeleteCategoryStatus,
  IUpdateCategoryStatus,
} from 'src/interfaces/responses/categories';
import { CategoryEntity } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  PartialyUpdateCategoryDto,
} from 'src/dto/categories/category.dto';
import { UpdateCategoryDto } from 'src/dto/categories/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  // Здесь нужно добавить пагинацию и фильтрацию
  async getCategoriesList(): Promise<IResponse<ICategoriesList>> {
    logger.info('Start getCategoriesList method.');
    try {
      const categoriesEntities: CategoryEntity[] =
        await this.categoryRepository.find();
      return {
        code: HttpStatus.OK,
        data: categoriesEntities,
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: e.message,
      };
    }
  }

  // Этот метод проверочный. Для получения всех категорий
  async getAllCategories(): Promise<IResponse<ICategoriesList>> {
    logger.info('Start getAllCategories method.');
    try {
      const categoriesEntities: CategoryEntity[] =
        await this.categoryRepository.find();
      return {
        code: HttpStatus.OK,
        data: categoriesEntities,
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: e.message,
      };
    }
  }

  async getCategoryById(categoryId: number): Promise<IResponse<ICategory>> {
    logger.info('Start getCategoryById method.');
    try {
      const categoryEntity: CategoryEntity =
        await this.categoryRepository.findOne({ where: { id: categoryId } });
      return {
        code: HttpStatus.OK,
        data: categoryEntity,
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: e.message,
      };
    }
  }

  async getCategoryBySlug(categorySlug: string): Promise<IResponse<ICategory>> {
    logger.info('Start getCategoryBySlug method.');
    try {
      // Нужно добавить всякие проверки
      const categoryEntity: CategoryEntity =
        await this.categoryRepository.findOne({
          where: { slug: categorySlug },
        });
      return {
        code: HttpStatus.OK,
        data: categoryEntity,
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: e.message,
      };
    }
  }

  async crearteCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<IResponse<ICategory>> {
    logger.info('Start crearteCategory method.');
    try {
      if (!this.isSlugUnick(createCategoryDto.slug)) {
        const createdCategory: CategoryEntity =
          await this.categoryRepository.save(createCategoryDto);
        return {
          code: HttpStatus.OK,
          data: createdCategory,
        };
      }
      return {
        code: HttpStatus.FORBIDDEN,
        data: null,
        message: 'Slug already exists in database.',
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: e.message,
      };
    }
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<IResponse<IUpdateCategoryStatus>> {
    logger.info('Start updateCategory method.');
    try {
      // Need to implement
      return {
        code: HttpStatus.OK,
        data: {
          status: true,
        },
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: e.message,
      };
    }
  }

  async partialyUpdateCategory(
    partialyUpdateCategoryDto: PartialyUpdateCategoryDto,
  ): Promise<IResponse<IUpdateCategoryStatus>> {
    logger.info('Start partialyUpdateCategory method.');
    try {
      // Need to implement
      return {
        code: HttpStatus.OK,
        data: {
          status: true,
        },
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: e.message,
      };
    }
  }

  async deleteCategory(
    categoryId: number,
  ): Promise<IResponse<IDeleteCategoryStatus>> {
    logger.info('Start deleteCategory method.');
    try {
      // Проверка на наличие не проводиться
      // Если указан id несуществующей или уже удаленной категории - возвращается true
      await this.categoryRepository.delete({ id: categoryId });
      return {
        code: HttpStatus.OK,
        data: {
          status: true,
        },
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: e.message,
      };
    }
  }

  private async isSlugUnick(categorySlug: string): Promise<boolean> {
    logger.info('Start isSlugUnick method.');
    const categoryBySlug: CategoryEntity =
      await this.categoryRepository.findOne({ where: { slug: categorySlug } });
    return !!categoryBySlug;
  }
}
