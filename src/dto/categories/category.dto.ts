import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/interfaces/responses';
import {
  IAllCategories,
  ICategoriesList,
  ICategory,
  ICategoryById,
  ICreateCategory,
  IPartialyUpdateCategory,
  IStatus,
  IUpdateCategory,
  IUpdateCategoryStatus,
} from 'src/interfaces/responses/categories';

export class CategoryData implements ICategory {
  @ApiProperty()
  id: number;
  @ApiProperty()
  slug: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdDate: string;
  @ApiProperty()
  active: boolean;
}

export class UpdateCategoryStatus implements IStatus {
  @ApiProperty()
  status: boolean;
}

export class CategoriesListResponse implements IResponse<ICategoriesList> {
  @ApiProperty()
  code: number;
  @ApiProperty({ isArray: true })
  data: null | CategoryData;
  @ApiProperty()
  message?: string;
}

// Нужен, так как в дальнейшеим CategoriesListResponse будет дополнен
export class AllCategoriesResponse implements IResponse<IAllCategories> {
  @ApiProperty()
  code: number;
  @ApiProperty({ isArray: true })
  data: null | CategoryData;
  @ApiProperty()
  message?: string;
}

// Нужен, так как в дальнейшеим CategoriesListResponse будет дополнен
export class CategoryByIdResponse implements IResponse<ICategoryById> {
  @ApiProperty()
  code: number;
  @ApiProperty({ isArray: false })
  data: null | CategoryData;
  @ApiProperty()
  message?: string;
}

export class CreateCategoryResponse implements IResponse<ICreateCategory> {
  @ApiProperty()
  code: number;
  @ApiProperty({ isArray: false })
  data: null | CategoryData;
  @ApiProperty()
  message?: string;
}

export class UpdateCategoryResponse
  implements IResponse<IUpdateCategoryStatus>
{
  @ApiProperty()
  code: number;
  @ApiProperty({ isArray: false })
  data: null | UpdateCategoryStatus;
  @ApiProperty()
  message?: string;
}

export class CreateCategoryDto {
  @ApiProperty()
  readonly slug: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly description: string;
}

export class UpdateCategoryDto implements IUpdateCategory {
  @ApiProperty()
  readonly slug: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly active: boolean;
}

export class PartialyUpdateCategoryDto implements IPartialyUpdateCategory {
  @ApiProperty()
  readonly slug?: string;
  @ApiProperty()
  readonly name?: string;
  @ApiProperty()
  readonly description?: string;
  @ApiProperty()
  readonly active?: boolean;
}
