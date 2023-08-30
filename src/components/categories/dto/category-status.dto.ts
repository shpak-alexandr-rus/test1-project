import { ApiProperty } from "@nestjs/swagger";
import { IStatus } from "src/interfaces/responses/categories";

export class CategoryStatus implements IStatus {
    @ApiProperty()
    status: boolean;
  }