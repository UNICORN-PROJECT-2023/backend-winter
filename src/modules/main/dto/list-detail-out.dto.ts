import { ApiProperty } from "@nestjs/swagger";
import { ListUserOutDto } from "./list-user-out-dto";
import { ListItemOutDto } from "./list-item-out.dto";

export class ListDetailOutDto {

  @ApiProperty({required: true})
  id: number;

  @ApiProperty({required: true})
  name: string;
  
  @ApiProperty({required: true})
  type: string;

  @ApiProperty({required: true})
  status: string;

  @ApiProperty({required: true, type: ListUserOutDto, isArray: true})
  members: ListUserOutDto[];
  
  @ApiProperty({required: true, type: ListItemOutDto, isArray: true})
  items: ListItemOutDto[];

  constructor(id: number, name: string, type: string, status: string, members: ListUserOutDto[], items: ListItemOutDto[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.status = status;
    this.members = members;
    this.items = items;
  }

}