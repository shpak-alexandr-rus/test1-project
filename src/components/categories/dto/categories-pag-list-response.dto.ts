import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/interfaces/responses';
import { ICategory } from 'src/interfaces/responses/categories';
import { CategoryData } from './category-data.dto';

export class CategoriesPagListResponse implements IResponse<ICategory> {
  @ApiProperty()
  code: number;
  @ApiProperty({ isArray: true })
  //TODO: Нужно будет создать CategoryPagData с полями пагинации
  data: null | CategoryData;
  @ApiProperty()
  message?: string;
}
