import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

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
  async findAll() {
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
   * @param createProductDto - The data transfer object containing product details.
   * @returns A promise that resolves to an object containing a success message, the created product, and the status code.
   */
  async create(createProductDto: CreateProductDto) { 
    const product = new this.productModel(createProductDto);
    await product.save();
    return {
      message: 'Product created successfully',
      product,
      status: HttpStatus.CREATED,
    };
  }

  /**
   * Updates an existing product.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data transfer object containing updated product details.
   * @returns A promise that resolves to an object containing a success message, the updated product, and the status code.
   */
  async update(id: string, updateProductDto: UpdateProductDto) {
    return {
      message: 'Product updated successfully',
      product: await this.productModel.findByIdAndUpdate(id, { $set: updateProductDto }, { new: true }).exec(),
      status: HttpStatus.OK,
    };
  }

  /**
   * Removes a product by its ID.
   * @param id - The ID of the product to remove.
   * @returns An object containing a success message and the status code.
   * @throws HttpException if the product is not found.
   */
  remove(id: string) {
    const product = this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Product removed successfully',
      status: HttpStatus.OK,
    };
  }
}
