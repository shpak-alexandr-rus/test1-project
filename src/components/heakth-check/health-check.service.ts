import { Injectable } from '@nestjs/common';
import { IHealthCheckResponce } from 'src/interfaces/responses/health-check';
import { AppDataSource } from '../../../data-source';
import { DataSource } from 'typeorm';
import { IResponse } from 'src/interfaces/responses';
import logger from '../../logger/logger';

@Injectable()
export class HealthCheckService {
  async getHealthCheck(): Promise<IResponse<IHealthCheckResponce>> {
    try {
      logger.info('Try connect to DB and execute simpe SQL query.');
      const dataSource: DataSource = AppDataSource;
      const result = await dataSource.query('SELECT 1+1 AS result;');
      logger.info('Result from DB getted.');

      return {
        code: 200,
        data: {
          status: result[0].result === 2,
        },
      };
    } catch (e) {
      logger.error(`Getted error with message: ${e.message}`);
      return {
        code: 500,
        data: null,
        message: e.message,
      };
    }
  }
}
