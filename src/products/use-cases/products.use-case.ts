import { Injectable } from '@nestjs/common';

import { ProductsService } from '../services/products.service';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductUseCase {
  constructor(private readonly productsService: ProductsService) {}

  async getAllProducts() {
    return await this.productsService.findAll();
  }

  async getProductById(id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  async deleteProduct(id: string) {
    return await this.productsService.remove(id);
  }
}
