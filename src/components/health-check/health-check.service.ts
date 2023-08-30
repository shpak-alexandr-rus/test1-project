import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../../data-source';
import { DataSource } from 'typeorm';
import logger from '../../logger/logger';
import { IResponse } from 'src/interfaces/responses';
import { IHealthCheckResponce } from 'src/interfaces/responses/health-check';

@Injectable()
export class HealthCheckService {
  async getHealthCheck(): Promise<IResponse<IHealthCheckResponce>> {
    try {
      logger.info('Try connect to DB and execute simpe SQL query.');
      const dataSource: DataSource = await AppDataSource.initialize();
      const result = await dataSource.query('SELECT 1+1 AS result;');
      logger.info('Result from DB getted.');

      await AppDataSource.destroy();
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
