import { ApiProperty } from '@nestjs/swagger';
import { ICreateCategory } from 'src/interfaces/responses/categories';

export class CreateCategory implements ICreateCategory {
  @ApiProperty()
  slug: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  active?: boolean;
}
