import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return {
      message: 'Product created successfully',
      product: createProductDto,
      status: HttpStatus.CREATED,
    };
  }

  findAll() {
    return {
      message: 'Products fetched successfully',
      products: [],
      status: HttpStatus.OK,
    };
  }

  findOne(id: string) {
    return {
      message: 'Product fetched successfully',
      product: {},
      status: HttpStatus.OK,
    };
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return {
      message: 'Product updated successfully',
      product: updateProductDto,
      status: HttpStatus.OK,
    };
  }

  remove(id: string) {
    return {
      message: 'Product removed successfully',
      status: HttpStatus.OK,
    };
  }
}
