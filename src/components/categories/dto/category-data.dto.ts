import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from 'src/interfaces/responses/categories';

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
