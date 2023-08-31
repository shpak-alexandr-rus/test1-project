import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IPagination, IResponse, IStatus } from 'src/interfaces/responses';
import logger from '../../logger/logger';
import { ICategory } from 'src/interfaces/responses/categories';
import { CategoryEntity } from 'src/entities/category.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategory } from './dto/create-category.dto';
import { UpdateCategory } from './dto/update-category.dto';
import { PartialyUpdateCategory } from './dto/partialy-update-category.dto';
import { FilterQuery } from './dto/filter-query.dto';

const columnNames: string[] = ["id", "slug", "name", "description", "createdDate", "active"];

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  // Здесь нужно добавить пагинацию и фильтрацию
  async getCategoriesList(query: FilterQuery): Promise<IResponse<IPagination<ICategory>>> {
    logger.info('Start getCategoriesList method.');
    try {
      const findOptions: FindManyOptions<CategoryEntity> = this.buildFindOptions(query);

      const categoriesEntities: CategoryEntity[] =
        await this.categoryRepository.find(findOptions);
      const totalEntitiesCount: number = await this.categoryRepository.count(findOptions);

      return {
        code: HttpStatus.OK,
        data: {
          data: categoriesEntities,
          page: this.getValidPageNumber(query.page),
          totalPages: query.pageSize
            ? Math.ceil(totalEntitiesCount / this.getValidPageSizeNumber(query.pageSize))
            : Math.ceil(totalEntitiesCount / 2)
        }
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // Этот метод проверочный. Для получения всех категорий
  async getAllCategories(): Promise<IResponse<ICategory>> {
    logger.info('Start getAllCategories method.');
    try {
      const categoriesEntities: CategoryEntity[] =
        await this.categoryRepository.find({
          order: {
            id: 'ASC',
          },
        });
      return {
        code: HttpStatus.OK,
        data: categoriesEntities,
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
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
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
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
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async crearteCategory(
    createCategoryDto: CreateCategory,
  ): Promise<IResponse<ICategory>> {
    logger.info('Start crearteCategory method.');
    try {
      const checkSlug: RegExpMatchArray =
        createCategoryDto.slug.match(/[a-zA-Z\s]+/g);
      if (!checkSlug || checkSlug.length !== 1) {
        return {
          code: HttpStatus.FORBIDDEN,
          data: null,
          message: 'Slug value incorrect.',
        };
      }
      if (await this.isSlugUnick(createCategoryDto.slug)) {
        const category: CreateCategory = { ...createCategoryDto };
        if (createCategoryDto.active) {
          category.active = this.getActiveValue(createCategoryDto.active);
        }
        const createdCategory: CategoryEntity =
          await this.categoryRepository.save(category);
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
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateCategory(
    updateCategoryDto: UpdateCategory,
  ): Promise<IResponse<IStatus>> {
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
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async partialyUpdateCategory(
    partialyUpdateCategoryDto: PartialyUpdateCategory,
  ): Promise<IResponse<IStatus>> {
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

  async deleteCategory(categoryId: number): Promise<IResponse<IStatus>> {
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
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // Приватные методы
  private async isSlugUnick(categorySlug: string): Promise<boolean> {
    logger.info('Start isSlugUnick method.');
    const categoryBySlug: CategoryEntity =
      await this.categoryRepository.findOne({ where: { slug: categorySlug } });
    return !categoryBySlug;
  }

  //TODO: нужно переделать
  private getActiveValue(value: any): boolean {
    switch (value) {
      case 1:
      case true:
        return true;
      case 0:
      case false:
        return false;
      default:
        throw new Error('Incorrect value for Active column.');
    }
  }

  private buildFindOptions(query: FilterQuery): FindManyOptions<CategoryEntity> {
    const resultQuery: FindManyOptions<CategoryEntity> = {};

    const validPageNumber: number = this.getValidPageNumber(query.page);
    const validPageSizeNumber: number = this.getValidPageSizeNumber(query.pageSize);

    resultQuery.skip = query.page && query.pageSize ? validPageSizeNumber * (validPageNumber - 1) : 0;
    resultQuery.take = validPageSizeNumber;

    const isDescSort = query.sort && query.sort.indexOf('-') === 0;
    const isSortColumnExist = query.sort
      ? isDescSort
        ? columnNames.includes(query.sort.substring(1, query.sort.length - 1))
        : columnNames.includes(query.sort)
      : false;

    const sortColumnName = isSortColumnExist 
      ? isDescSort
        ? query.sort.substring(1, query.sort.length - 1)
        : query.sort
      : "createdDate";

    const order = {};
    order[sortColumnName] = isSortColumnExist
      ? isDescSort
        ? "DESC"
        : "ASC"
      : "DESC";
    resultQuery.order = order;
    
    return resultQuery;
  }

  private getValidPageNumber(pageNumber: number): number {
    if (!this.isIntegerNumber(pageNumber)) {
      return 1;
    }
    return pageNumber === 0
      ? 1
      : +pageNumber;
  }

  private getValidPageSizeNumber(pageSizeNumber: number): number {
    if (!this.isIntegerNumber(pageSizeNumber)) {
      return 2;
    }
    return pageSizeNumber === 0
      ? 2
      : +pageSizeNumber;
  }

  private isIntegerNumber(value: number): boolean {
    if (value) {
      return Number.isInteger(+value);
    }
    return false;
  }
}
