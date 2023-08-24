import { Module } from '@nestjs/common';
import { HealthCheckModule } from './components/heakth-check/health-check.module';

@Module({
  imports: [HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
