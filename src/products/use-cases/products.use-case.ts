import { Injectable } from '@nestjs/common';

import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductUseCase {
  /**
   * Constructs a new ProductUseCase.
   * @param productsService - The service used to manage product operations.
   */
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of products.
   */
  async getAllProducts() {
    const products = await this.productsService.findAll();
    return products;
  }

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to the product.
   */
  async getProductById(id: string) {
    const product = await this.productsService.findOne(id);
    return product;
  }

  /**
   * Creates a new product.
   * @param createProductDto - The data transfer object containing product details.
   * @returns A promise that resolves to the created product.
   */
  async createProduct({ name, description, price, stock, images, status, quantity }) {
    const product = await this.productsService.create({ name, description, price, stock, images, status, quantity });
    return product;
  }

  /**
   * Updates an existing product.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data transfer object containing updated product details.
   * @returns A promise that resolves to the updated product.
   */
  async updateProduct(id: string, { name, description, price, stock, images, status, quantity }) {
    return await this.productsService.update(id, { name, description, price, stock, images, status, quantity });
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves to the result of the deletion.
   */
  async deleteProduct(id: string) {
    return await this.productsService.remove(id);
  }
}
