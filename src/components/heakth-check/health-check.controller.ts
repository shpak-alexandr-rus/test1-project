import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { IResponse } from 'src/interfaces/responses';
import { IHealthCheckResponce } from 'src/interfaces/responses/health-check';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckResponse } from 'src/dto/health-check/health-check.dto';
import logger from '../../logger/logger';

@Controller()
@ApiTags('Health Check')
export class HealthCheckController {
  constructor(private readonly helthCheckService: HealthCheckService) {}

  @Get('helth-check')
  @ApiResponse({ status: 200, type: HealthCheckResponse })
  async getHealthCheck(): Promise<IResponse<IHealthCheckResponce>> {
    logger.info('Working controller for "/health-check" endpoint.');
    return this.helthCheckService.getHealthCheck();
  }
}
