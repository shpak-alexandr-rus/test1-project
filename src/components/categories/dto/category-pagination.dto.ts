import { IPagination } from 'src/interfaces/responses';
import { ICategory } from 'src/interfaces/responses/categories';
import { CategoryData } from './category-data.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryPagination implements IPagination<ICategory> {
  @ApiProperty()
  page: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty({ isArray: true })
  data: null | CategoryData | CategoryData[];
}
