import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  /**
   * Constructs a new ProductsService.
   * @param productModel - The product model injected by Mongoose.
   */
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of products.
   * @throws HttpException if products are not found.
   */
  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productModel.find().exec();
      return products;
    } catch (error) {
      throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to the product.
   * @throws HttpException if the product is not found.
   */
  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id).exec();
      return product;
    } catch (error) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Creates a new product.
   * @param name - The name of the product.
   * @param description - The description of the product.
   * @param price - The price of the product.
   * @param stock - The stock of the product.
   * @param images - The images of the product.
   * @param status - The status of the product.
   * @param quantity - The quantity of the product.
   * @returns A promise that resolves to the created product.
   * @throws HttpException if the product is not created.
   */
  async create({ name, description, price, stock, images, status, quantity }) { 
    try { 
      const product = new this.productModel({ name, description, price, stock, images, status, quantity });
      await product.save();
      return product;
    } catch (error) {
      throw new HttpException('Product not created', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Updates an existing product.
   * @param id - The ID of the product to update.
   * @param name - The name of the product.
   * @param description - The description of the product.
   * @param price - The price of the product.
   * @param stock - The stock of the product.
   * @param images - The images of the product.
   * @param status - The status of the product.
   * @param quantity - The quantity of the product.
   * @returns A promise that resolves to an object containing a success message, the updated product, and the status code.
   */
  async update(id: string, { name, description, price, stock, images, status, quantity }) {
    try {
      const product = await this.productModel.findByIdAndUpdate(id, { $set: { name, description, price, stock, images, status, quantity } }, { new: true }).exec();
      return product;
    } catch (error) {
      throw new HttpException('Product not updated', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Removes a product by its ID.
   * @param id - The ID of the product to remove.
   * @returns An object containing a success message and the status code.
   * @throws HttpException if the product is not found.
   */
  remove(id: string) {
    try {
      const product = this.productModel.findByIdAndDelete(id).exec();
      return product;
    } catch (error) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
