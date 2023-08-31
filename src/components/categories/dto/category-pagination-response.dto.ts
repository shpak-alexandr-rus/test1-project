import { ApiProperty } from '@nestjs/swagger';
import { IPagination, IResponse } from 'src/interfaces/responses';
import { ICategory } from 'src/interfaces/responses/categories';
import { CategoryPagination } from './category-pagination.dto';

export class CategoryPaginationResponse
  implements IResponse<IPagination<ICategory>>
{
  @ApiProperty()
  code: number;
  @ApiProperty({ isArray: false })
  data: null | CategoryPagination;
  @ApiProperty()
  message?: string;
}
