import { ApiProperty } from '@nestjs/swagger';
import { IHealthCheckResponce } from 'src/interfaces/responses/health-check';

export class HealthCheckData implements IHealthCheckResponce {
  @ApiProperty()
  status: boolean;
}