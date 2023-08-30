import { ApiProperty } from '@nestjs/swagger';
import { IStatus } from 'src/interfaces/responses';

export class CategoryStatus implements IStatus {
  @ApiProperty()
  status: boolean;
}
