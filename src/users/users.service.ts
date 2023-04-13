import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './interfaces/users.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly UsersModel: Model<Users>,
  ) {}

  async findUserById(id: string): Promise<Users> {
    return await this.UsersModel.findOne({ _id: id, deleted: false }).select('-password -deleted');
  }

  async saveUser(user: Users): Promise<Users> {
    return await new this.UsersModel(user).save();
  }

  async findUserWhere(queryOptions = {}): Promise<Users | null> {
    return await this.UsersModel.findOne({ ...queryOptions }).select('-password -deleted');
  }

  async getAllUsers(
    queryOptions = {},
    limit: number | null = null,
    skip: number | null = null,
  ): Promise<Users[] | []> {
    if (limit) {
      return await this.UsersModel.find({ ...queryOptions })
        .select('-password -deleted')
        .limit(limit)
        .skip(skip);
    }

    return await this.UsersModel.find({ ...queryOptions }).select('-password');
  }

  async updateUser(userId: string, updateOptions: Partial<Users>): Promise<Users> {
    return this.UsersModel.findOneAndUpdate(
      { _id: userId },
      { $set: { ...updateOptions } },
      { new: true },
    ).select('-password -deleted');
  }

  async deleteUser(userId: string): Promise<Users> {
    return this.UsersModel.findOneAndUpdate(
      { _id: userId },
      { $set: { user_deleted: true } },
      { new: true },
    ).select('-password -deleted');
  }
}
