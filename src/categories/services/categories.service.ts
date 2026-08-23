import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryModel.find().exec();
      return categories;
    } catch (error) {
      throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryModel.findById(id).exec();
      return category;
    } catch (error) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }

  async create({ name, image }) {
    try {
      const category = new this.categoryModel({ name, image });
      await category.save();
      return category;
    } catch (error) {
      throw new HttpException('Category not created', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, { name, image }: { name?: string; image?: string }) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(id, { $set: { name, image } }, { new: true }).exec();
      return category;
    } catch (error) {
      throw new HttpException('Category not updated', HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: string) {
    try {
      const category = this.categoryModel.findByIdAndDelete(id).exec();
      return category;
    } catch (error) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }
}