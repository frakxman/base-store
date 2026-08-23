import { Injectable } from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';

@Injectable()
export class CategoryUseCase {
  constructor(private readonly categoriesService: CategoriesService) {}

  async getAllCategories() {
    const categories = await this.categoriesService.findAll();
    return categories;
  }

  async getCategoryById(id: string) {
    const category = await this.categoriesService.findOne(id);
    return category;
  }

  async createCategory({ name, image }) {
    const category = await this.categoriesService.create({ name, image });
    return category;
  }

  async updateCategory(id: string, { name, image }: { name?: string; image?: string }) {
    return await this.categoriesService.update(id, { name, image });
  }

  async deleteCategory(id: string) {
    return await this.categoriesService.remove(id);
  }
}