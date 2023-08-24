import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { IResponse } from 'src/interfaces/responses';
import { IHealthCheckResponce } from 'src/interfaces/responses/health-check';
import { ApiResponse } from '@nestjs/swagger';
import { HealthCheckResponse } from 'src/dto/health-check/health-check.dto';

@Controller()
@ApiResponse({ status: 200, type: HealthCheckResponse })
export class HealthCheckController {
  constructor(private readonly helthCheckService: HealthCheckService) {}

  @Get('helth-check')
  async getHealthCheck(): Promise<IResponse<IHealthCheckResponce>> {
    return this.helthCheckService.getHealthCheck();
  }
}
