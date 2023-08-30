import { Module } from '@nestjs/common';
import { HealthCheckModule } from './components/health-check/health-check.module';
import { CategoryModule } from './components/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from 'data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig),
    HealthCheckModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
