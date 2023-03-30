import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import {createItemDto} from "./Dto/createItem.dto"
import { ItemsService } from  "./items.service"
import { Item } from  "./interfaces/item.interface"

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() param): Promise<Item> {
    return this.itemsService.findOne(param.id);
  }

  @Post()
  async createItem(@Body() createItemDto: createItemDto): Promise<Item> {
   return await this.itemsService.create(createItemDto)
  }

  @Patch(':id')
  async updateItem(@Param() param, @Body() updateitemDto: createItemDto): Promise<Item> {
    return await this.itemsService.update(param.id, updateitemDto)
  }

  @Delete(':id')
  async deleteItem(@Param() param): Promise<Item> {
    return await this.itemsService.delete(param.id)
  }
}
