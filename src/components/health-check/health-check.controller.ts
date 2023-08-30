import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { IResponse } from 'src/interfaces/responses';
import { IHealthCheckResponce } from 'src/interfaces/responses/health-check';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckResponse } from 'src/components/health-check/dto/health-check-responce.dto';
import logger from '../../logger/logger';

@Controller()
@ApiTags('Проверка доступности сервера')
export class HealthCheckController {
  constructor(private readonly helthCheckService: HealthCheckService) {}

  @Get('health-check')
  @ApiOperation({
    summary: 'Проверка доступности сервера и наличия связи с базой данных.',
  })
  @ApiResponse({ status: 200, type: HealthCheckResponse })
  async getHealthCheck(): Promise<IResponse<IHealthCheckResponce>> {
    logger.info('Working controller for "/health-check" endpoint.');
    return this.helthCheckService.getHealthCheck();
  }
}
