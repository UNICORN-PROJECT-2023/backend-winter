import { ApiProperty } from "@nestjs/swagger";

export class ListItemOutDto {

  @ApiProperty({required: true})
  id: number;

  @ApiProperty({required: true})
  name: string;

  @ApiProperty({required: true})
  status: string;

  constructor(id: number, name: string, status: string) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}