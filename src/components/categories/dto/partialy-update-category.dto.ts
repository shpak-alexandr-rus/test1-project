import { ApiProperty } from '@nestjs/swagger';
import { IPartialyUpdateCategory } from 'src/interfaces/responses/categories';

export class PartialyUpdateCategory implements IPartialyUpdateCategory {
  @ApiProperty()
  readonly slug?: string;
  @ApiProperty()
  readonly name?: string;
  @ApiProperty()
  readonly description?: string;
  @ApiProperty()
  readonly active?: boolean;
}
