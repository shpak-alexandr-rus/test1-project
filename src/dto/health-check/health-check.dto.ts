import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from 'src/interfaces/responses';
import { IHealthCheckResponce } from 'src/interfaces/responses/health-check';

export class HealthCheckData implements IHealthCheckResponce {
  @ApiProperty()
  status: boolean;
}

export class HealthCheckResponse implements IResponse<IHealthCheckResponce> {
  @ApiProperty()
  code: number;
  @ApiProperty()
  data: HealthCheckData;
  @ApiProperty()
  message?: string;
}
