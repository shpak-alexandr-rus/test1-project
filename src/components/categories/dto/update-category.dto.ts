import { ApiProperty } from "@nestjs/swagger";
import { IUpdateCategory } from "src/interfaces/responses/categories";

export class UpdateCategory implements IUpdateCategory {
    @ApiProperty()
    readonly slug: string;
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly description: string;
    @ApiProperty()
    readonly active: boolean;
  }