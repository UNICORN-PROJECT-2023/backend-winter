import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsArray, ArrayMinSize, IsString, MaxLength, MinLength } from "class-validator";

export enum ListItemStatus {
  ACTIVE = 'ACTIVE',
  PROCESSED = 'PROCESSED',
  DELETED = 'DELETED',
}

export class ListItemInDto {
  
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @ApiProperty({required: true})
  name: string;

  @IsEnum(ListItemStatus)
  @ApiProperty({required: true})
  status: ListItemStatus;

  
  constructor(name: string, status: ListItemStatus) {
    this.name = name;
    this.status = status;
  }
}
