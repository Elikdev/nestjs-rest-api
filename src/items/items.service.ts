import { Injectable } from '@nestjs/common';
import { Item } from "./interfaces/item.interface"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel:Model<Item>) {}

  async findAll(): Promise<Item[]> {
   return await this.itemModel.find()
  }

  async findOne(id: string): Promise<Item> {
   return await this.itemModel.findOne({_id: id})
  }

  async create(item: Item): Promise<Item> {
    const itemExists = await this.itemModel.findOne({name: item.name.toLowerCase()})

    if(itemExists) {
      return null
    }
    item["name"] = item?.name?.toLowerCase()
    const newItem = new this.itemModel(item)
    return await newItem.save()
  }

  async update(id: string, item: Item): Promise<Item> {
    const itemExists = await this.itemModel.findOne({_id: id})

    if(!itemExists) {
      return null
    }
    item["name"] = item?.name?.toLowerCase()
    const updateItem = await this.itemModel.findByIdAndUpdate(id, {$set: { ...item }}, { new: true })
    return updateItem
  }

  async delete(id: string): Promise<Item>  {
    return await this.itemModel.findByIdAndRemove(id)
  }
}
