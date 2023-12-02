import { ApiProperty } from "@nestjs/swagger";

export class ListOutDto {

  @ApiProperty({required: true})
  id: number;

  @ApiProperty({required: true})
  name: string;
  
  @ApiProperty({required: true})
  type: string;

  @ApiProperty({required: true})
  status: string;

  constructor(id: number, name: string, type: string, status: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.status = status;
  }
}