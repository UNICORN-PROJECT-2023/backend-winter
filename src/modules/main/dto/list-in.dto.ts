import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ListInDto {
  
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @ApiProperty({required: true})
  name: string;

  
  constructor(name: string) {
    this.name = name;
  }
}
