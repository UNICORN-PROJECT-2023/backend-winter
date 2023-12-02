import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Query, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/modules/guard/decorators/roles.decorator';
import { Request, Response } from 'express';
import { ResponseDto, ResponseDtoBuilder } from '../dto/response.dto';
import { ListOutDto } from '../dto/list-out.dto';
import { ListInDto } from '../dto/list-in.dto';
import { ListItemInDto } from '../dto/list-item-in.dto';
import { ListDetailOutDto } from '../dto/list-detail-out.dto';
import { ListUserOutDto } from '../dto/list-user-out-dto';
import { ListItemOutDto } from '../dto/list-item-out.dto';
import { UserService } from '../services/user.service';

@ApiBearerAuth()
@Controller("/list")
export class ListController {
  
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  @Get("/")
  @Roles("user")
  async getAllLists(@Req() req: any): Promise<ResponseDto<Array<ListOutDto>>> {
    const listOut = [
      new ListOutDto(1, "My list name", "owner", "active"),
      new ListOutDto(2, "My second name", "owner", "active")
    ];

    const response = new ResponseDtoBuilder<Array<ListOutDto>>()
      .setStatusCode(HttpStatus.OK)
      .setMessage("Received all lists")
      .setBody(listOut)
      .build();

    return response;
  }

  @Post("/")
  @Roles("user")
  async postList(@Req() req: any, @Body() listDto: ListInDto): Promise<ResponseDto<void>> {

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(HttpStatus.CREATED)
      .setMessage("List created")
      .build();

    return response;
  }

  
  @Get("/:listId")
  @Roles("user")
  @ApiParam({ name: 'listId', type: Number })
  async getList(@Req() req: any, @Param('listId') id: number): Promise<ResponseDto<ListOutDto>> {
    const cstId = req.user.id;

    if(!await this.userService.validateMemberListAccess(cstId, id)) {
      const response = new ResponseDtoBuilder<ListOutDto>()
        .setStatusCode(HttpStatus.FORBIDDEN)
        .setMessage("You are not allowed to access this list")
        .build();

      return response;
    }    

    const listOut = new ListDetailOutDto(1, "My list name", "owner", "active", [
      new ListUserOutDto(1, "username"),
    ], [
      new ListItemOutDto(1, "item name", "active"),
    ]);

    const response = new ResponseDtoBuilder<ListOutDto>()
      .setStatusCode(HttpStatus.OK)
      .setMessage("Received list")
      .setBody(listOut)
      .build();

    return response;
  }

 
  @Put("/:listId")
  @Roles("user")
  @ApiParam({ name: 'listId', type: Number })
  async updateList(@Req() req: any, @Param('listId') id: number, @Body() listDto: ListInDto): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    if(!await this.userService.validateOwnerListAccess(cstId, id)) {
      const response = new ResponseDtoBuilder<void>()
        .setStatusCode(HttpStatus.FORBIDDEN)
        .setMessage("You are not allowed to access this list")
        .build();

      return response;
    }    

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(HttpStatus.OK)
      .setMessage("List updated")
      .build();

    return response;
  }

  @Delete("/:listId")
  @Roles("user")
  @ApiParam({ name: 'listId', type: Number })
  async deleteList(@Req() req: any, @Param('listId') id: number): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    if(!await this.userService.validateOwnerListAccess(cstId, id)) {
      const response = new ResponseDtoBuilder<void>()
        .setStatusCode(HttpStatus.FORBIDDEN)
        .setMessage("You are not allowed to access this list")
        .build();

      return response;
    }    

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(HttpStatus.OK)
      .setMessage("List deleted")
      .build();
      
    return response;
  }


  @Post("/:listId/item")
  @Roles("user")
  @ApiParam({ name: 'listId', type: Number })
  async postListItem(@Req() req: any, @Param('listId') id: number, @Body() listItemDto: ListItemInDto): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    if(!await this.userService.validateMemberListAccess(cstId, id)) {
      const response = new ResponseDtoBuilder<void>()
        .setStatusCode(HttpStatus.FORBIDDEN)
        .setMessage("You are not allowed to access this list")
        .build();

      return response;
    }    

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(HttpStatus.CREATED)
      .setMessage("List created")
      .build();

    return response;
  }

  @Put("/:listId/item/:itemId")
  @Roles("user")
  @ApiParam({ name: 'listId', type: Number })
  @ApiParam({ name: 'itemId', type: Number })
  async updateListItem(@Req() req: any, @Param('listId') id: number, @Param('itemId') itemId: number, @Body() listItemDto: ListItemInDto): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    if(!await this.userService.validateMemberListAccess(cstId, id)) {
      const response = new ResponseDtoBuilder<void>()
        .setStatusCode(HttpStatus.FORBIDDEN)
        .setMessage("You are not allowed to access this list")
        .build();

      return response;
    }    

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(HttpStatus.OK)
      .setMessage("List updated")
      .build();

    return response;
  }

  @Post("/:listId/user/:username")
  @Roles("user")
  @ApiParam({ name: 'listId', type: Number })
  @ApiParam({ name: 'username', type: String })
  async postListUser(@Req() req: any, @Param('listId') id: number, @Param('username') username: String): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    if(!await this.userService.validateOwnerListAccess(cstId, id)) {
      const response = new ResponseDtoBuilder<void>()
        .setStatusCode(HttpStatus.FORBIDDEN)
        .setMessage("You are not allowed to access this list")
        .build();

      return response;
    }    

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(HttpStatus.OK)
      .setMessage("List updated")
      .build();

    return response;
  }

  @Delete("/:listId/user/:username")
  @Roles("user")
  @ApiParam({ name: 'listId', type: Number })
  @ApiParam({ name: 'username', type: String })
  async deleteListUser(@Req() req: any, @Param('listId') id: number, @Param('username') username: String): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    if(!await this.userService.validateOwnerListAccess(cstId, id)) {
      const response = new ResponseDtoBuilder<void>()
        .setStatusCode(HttpStatus.FORBIDDEN)
        .setMessage("You are not allowed to access this list")
        .build();

      return response;
    }    

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(HttpStatus.OK)
      .setMessage("List updated")
      .build();

    return response;
  }

  @Delete("/:listId/user/me")
  @Roles("user")
  @ApiParam({ name: 'listId', type: Number })
  async deleteListMe(@Req() req: any, @Param('listId') id: number): Promise<ResponseDto<void>> {
    const cstId = req.user.id;
    
    if(!await this.userService.validateMemberListAccess(cstId, id)) {
      const response = new ResponseDtoBuilder<void>()
        .setStatusCode(HttpStatus.FORBIDDEN)
        .setMessage("You are not allowed to access this list")
        .build();

      return response;
    }    

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(HttpStatus.OK)
      .setMessage("List updated")
      .build();

    return response;
  }


}
