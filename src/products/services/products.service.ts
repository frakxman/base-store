import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  // private products: Product[] = [
  //   {
  //     id: '1',
  //     name: 'Product 1',
  //     price: 100,
  //     description: 'Description 1',
  //     images: [
  //       'https://picsum.photos/640/640?r=1',
  //       'https://picsum.photos/640/640?r=2',
  //       'https://picsum.photos/640/640?r=3'
  //     ],
  //     stock: 10,
  //     status: true,
  //   },
  //   {
  //     id: '2',
  //     name: 'Product 2',
  //     price: 200,
  //     description: 'Description 2',
  //     images: [
  //       'https://picsum.photos/640/640?r=4',
  //       'https://picsum.photos/640/640?r=5',
  //       'https://picsum.photos/640/640?r=6'
  //     ],
  //     stock: 20,
  //     status: true,
  //   },
  //   {
  //     id: '3',
  //     name: 'Product 3',
  //     price: 300,
  //     description: 'Description 3',
  //     images: [
  //       'https://picsum.photos/640/640?r=7',
  //       'https://picsum.photos/640/640?r=8',
  //       'https://picsum.photos/640/640?r=9'
  //     ],
  //     stock: 30,
  //     status: true,
  //   },
  // ];

  async findAll() {
    const products = await this.productModel.find().exec();
    return {
      message: 'Products fetched successfully',
      products,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Product fetched successfully',
      product,
      status: HttpStatus.OK,
    };
  }

  async create(createProductDto: CreateProductDto) { 
    const product = new this.productModel(createProductDto);
    await product.save();
    return {
      message: 'Product created successfully',
      product,
      status: HttpStatus.CREATED,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return {
      message: 'Product updated successfully',
      product: await this.productModel.findByIdAndUpdate(id, { $set: updateProductDto }, { new: true }).exec(),
      status: HttpStatus.OK,
    };
  }

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
