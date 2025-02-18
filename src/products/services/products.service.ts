import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      description: 'Description 1',
      images: [
        'https://picsum.photos/640/640?r=1',
        'https://picsum.photos/640/640?r=2',
        'https://picsum.photos/640/640?r=3'
      ],
      stock: 10,
      status: true,
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      description: 'Description 2',
      images: [
        'https://picsum.photos/640/640?r=4',
        'https://picsum.photos/640/640?r=5',
        'https://picsum.photos/640/640?r=6'
      ],
      stock: 20,
      status: true,
    },
    {
      id: '3',
      name: 'Product 3',
      price: 300,
      description: 'Description 3',
      images: [
        'https://picsum.photos/640/640?r=7',
        'https://picsum.photos/640/640?r=8',
        'https://picsum.photos/640/640?r=9'
      ],
      stock: 30,
      status: true,
    },
  ];

  create(createProductDto: CreateProductDto) { 
    const id = this.products.length + 1;
    const product: Product = {
      id: id.toString(),
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description,
      images: createProductDto.images,
      stock: createProductDto.stock,
      status: createProductDto.status,
    };
    this.products.push(product);
    return {
      message: 'Product created successfully',
      product,
      status: HttpStatus.CREATED,
    };
  }

  findAll() {
    if (this.products.length === 0) {
      throw new HttpException('No products found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Products fetched successfully',
      products: this.products,
      status: HttpStatus.OK,
    };
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Product fetched successfully',
      product,
      status: HttpStatus.OK,
    };
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Product updated successfully',
      product: updateProductDto,
      status: HttpStatus.OK,
    };
  }

  remove(id: string) {
    const product = this.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    this.products = this.products.filter((product) => product.id !== id);
    return {
      message: 'Product removed successfully',
      status: HttpStatus.OK,
    };
  }
}
