import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IPagination, IResponse, IStatus } from 'src/interfaces/responses';
import logger from '../../logger/logger';
import { ICategory } from 'src/interfaces/responses/categories';
import { CategoryEntity } from 'src/entities/category.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategory } from './dto/create-category.dto';
import { UpdateCategory } from './dto/update-category.dto';
import { PartialyUpdateCategory } from './dto/partialy-update-category.dto';
import { FilterQuery } from './dto/filter-query.dto';

const columnNames: string[] = [
  'id',
  'slug',
  'name',
  'description',
  'createdDate',
  'active',
];

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  // Здесь нужно добавить пагинацию и фильтрацию
  async getCategoriesList(
    query: FilterQuery,
  ): Promise<IResponse<IPagination<ICategory>>> {
    logger.info('Start getCategoriesList method.');
    try {
      const selectQuery: SelectQueryBuilder<CategoryEntity> =
        this.buildSelectQuery(this.categoryRepository, query);

      const categoriesEntities: [CategoryEntity[], number] =
        await selectQuery.getManyAndCount();

      return {
        code: HttpStatus.OK,
        data: {
          data: categoriesEntities[0],
          page: this.getValidPageNumber(query.page),
          totalPages: query.pageSize
            ? Math.ceil(
                categoriesEntities[1] /
                  this.getValidPageSizeNumber(query.pageSize),
              )
            : Math.ceil(categoriesEntities[1] / 2),
        },
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      throw new HttpException(
        e.message,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        e.message,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        e.message,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        e.message,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async crearteCategory(
    createCategoryDto: CreateCategory,
  ): Promise<IResponse<ICategory>> {
    logger.info('Start crearteCategory method.');
    try {
      if (!this.isSlugValueCorrect(createCategoryDto.slug)) {
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
      throw new HttpException(
        e.message,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategory,
  ): Promise<IResponse<IStatus>> {
    logger.info('Start updateCategory method.');
    try {
      const category: object = { ...updateCategoryDto };

      if (!this.isSlugValueCorrect(updateCategoryDto.slug)) {
        return {
          code: HttpStatus.FORBIDDEN,
          data: null,
          message: 'Slug value incorrect.',
        };
      }
      if (!(await this.isSlugUnick(updateCategoryDto.slug, categoryId))) {
        return {
          code: HttpStatus.FORBIDDEN,
          data: null,
          message: 'Slug already exists in database.',
        };
      }
      category['active'] = this.getActiveValue(updateCategoryDto.active);
      category['id'] = +categoryId;

      await this.categoryRepository.save(category);
      return {
        code: HttpStatus.OK,
        data: {
          status: true,
        },
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      throw new HttpException(
        e.message,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async partialyUpdateCategory(
    categoryId: number,
    partialyUpdateCategoryDto: PartialyUpdateCategory,
  ): Promise<IResponse<IStatus>> {
    logger.info('Start partialyUpdateCategory method.');
    try {
      const category: object = { ...partialyUpdateCategoryDto };

      if (partialyUpdateCategoryDto.slug) {
        if (!this.isSlugValueCorrect(partialyUpdateCategoryDto.slug)) {
          return {
            code: HttpStatus.FORBIDDEN,
            data: null,
            message: 'Slug value incorrect.',
          };
        }
        if (
          !(await this.isSlugUnick(partialyUpdateCategoryDto.slug, categoryId))
        ) {
          return {
            code: HttpStatus.FORBIDDEN,
            data: null,
            message: 'Slug already exists in database.',
          };
        }
      }

      if (partialyUpdateCategoryDto.active) {
        category['active'] = this.getActiveValue(
          partialyUpdateCategoryDto.active,
        );
      }

      await this.categoryRepository.update(categoryId, category);
      return {
        code: HttpStatus.OK,
        data: {
          status: true,
        },
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      throw new HttpException(
        e.message,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        e.message,
        e.status ? e.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Приватные методы
  private async isSlugUnick(
    categorySlug: string,
    categoryId?: number,
  ): Promise<boolean> {
    logger.info('Start isSlugUnick method.');
    const categoryBySlug: CategoryEntity =
      await this.categoryRepository.findOne({ where: { slug: categorySlug } });
    return !categoryBySlug || (categoryId && categoryBySlug.id === +categoryId);
  }

  //TODO: нужно переделать
  private getActiveValue(value: any): boolean {
    switch (value) {
      case 1:
      case true:
      case '1':
      case 'true':
        return true;
      case 0:
      case false:
      case '0':
      case 'false':
        return false;
      default:
        throw new HttpException(
          'Incorrect value for Active column.',
          HttpStatus.FORBIDDEN,
        );
    }
  }

  private buildSelectQuery(
    repository: Repository<CategoryEntity>,
    query: FilterQuery,
  ): SelectQueryBuilder<CategoryEntity> {
    const selectQueryBuilder: SelectQueryBuilder<CategoryEntity> = repository
      .createQueryBuilder()
      .select();

    const validPageNumber: number = this.getValidPageNumber(query.page);
    const validPageSizeNumber: number = this.getValidPageSizeNumber(
      query.pageSize,
    );

    selectQueryBuilder
      .offset(validPageSizeNumber * (validPageNumber - 1))
      .limit(validPageSizeNumber);

    const isDescSort: boolean = query.sort && query.sort.indexOf('-') === 0;
    const isSortColumnExist: boolean = query.sort
      ? isDescSort
        ? columnNames.includes(query.sort.substring(1, query.sort.length - 1))
        : columnNames.includes(query.sort)
      : false;

    const sortColumnName: string = isSortColumnExist
      ? isDescSort
        ? query.sort.substring(1, query.sort.length - 1)
        : query.sort
      : 'createdDate';

    selectQueryBuilder.orderBy(
      sortColumnName,
      isSortColumnExist ? (isDescSort ? 'DESC' : 'ASC') : 'DESC',
    );

    if (!query.search) {
      if (query.name && !this.isOnlySpaces(query.name)) {
        selectQueryBuilder.where('UPPER(name) SIMILAR TO UPPER(:searchTerm)', {
          searchTerm: `%${query.name.replaceAll('е', '(е|ё)')}%`,
        });
      } else if (query.description && !this.isOnlySpaces(query.description)) {
        selectQueryBuilder.where(
          'UPPER(description) SIMILAR TO UPPER(:searchTerm)',
          { searchTerm: `%${query.description.replaceAll('е', '(е|ё)')}%` },
        );
      } else if (query.active && !this.isOnlySpaces(query.active)) {
        selectQueryBuilder.where('active = :searchTerm', {
          searchTerm: `${this.getActiveValue(query.active)}`,
        });
      }
    } else {
      selectQueryBuilder
        .where('UPPER(name) SIMILAR TO UPPER(:searchTerm)', {
          searchTerm: `%${query.search.replaceAll('е', '(е|ё)')}%`,
        })
        .orWhere('UPPER(description) SIMILAR TO UPPER(:searchTerm)', {
          searchTerm: `%${query.search.replaceAll('е', '(е|ё)')}%`,
        });
    }

    return selectQueryBuilder;
  }

  private getValidPageNumber(pageNumber: number): number {
    if (!this.isIntegerNumber(pageNumber)) {
      return 1;
    }
    return pageNumber === 0 ? 1 : +pageNumber;
  }

  private getValidPageSizeNumber(pageSizeNumber: number): number {
    if (!this.isIntegerNumber(pageSizeNumber)) {
      return 2;
    }
    return pageSizeNumber === 0 ? 2 : +pageSizeNumber;
  }

  private isIntegerNumber(value: number): boolean {
    if (value) {
      return Number.isInteger(+value);
    }
    return false;
  }

  private isOnlySpaces(value: string): boolean {
    return value[0] === '"'
      ? value.substring(1, value.length - 2).trim().length === 0
      : value.trim().length === 0;
  }

  private isSlugValueCorrect(slugValue: string): boolean {
    const checkSlug: RegExpMatchArray = slugValue.match(/[a-zA-Z\s]+/g);
    return checkSlug && checkSlug.length === 1;
  }
}
