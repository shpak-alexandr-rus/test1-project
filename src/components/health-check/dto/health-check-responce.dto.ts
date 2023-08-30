import { ApiProperty } from "@nestjs/swagger";
import { IResponse } from "src/interfaces/responses";
import { IHealthCheckResponce } from "src/interfaces/responses/health-check";
import { HealthCheckData } from "./health-check-data.dto";

export class HealthCheckResponse implements IResponse<IHealthCheckResponce> {
    @ApiProperty()
    code: number;
    @ApiProperty()
    data: HealthCheckData;
    @ApiProperty()
    message?: string;
  }