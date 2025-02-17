import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

import { ProductUseCase } from '../use-cases/products.use-case';

@Controller('products')
export class ProductsController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productUseCase.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productUseCase.getAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productUseCase.getProductById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productUseCase.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productUseCase.deleteProduct(id);
  }
}
