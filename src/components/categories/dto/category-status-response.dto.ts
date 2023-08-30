import { ApiProperty } from "@nestjs/swagger";
import { IResponse } from "src/interfaces/responses";
import { IStatus } from "src/interfaces/responses/categories";
import { CategoryStatus } from "./category-status.dto";

export class CategoryStatusResponse
  implements IResponse<IStatus>
{
  @ApiProperty()
  code: number;
  @ApiProperty({ isArray: false })
  data: null | CategoryStatus;
  @ApiProperty()
  message?: string;
}
