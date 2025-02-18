import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

import { ProductUseCase } from '../use-cases/products.use-case';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'All products obtained successfully' })
  findAll() {
    return this.productUseCase.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by its ID' })
  @ApiResponse({ status: 200, description: 'Product obtained successfully' })
  findOne(@Param('id') id: string) {
    return this.productUseCase.getProductById(id);
  }

  // @Post()
  // @ApiOperation({ summary: 'Create a new product' })
  // @ApiBody({ type: CreateProductDto })
  // @ApiResponse({ status: 201, description: 'Product created successfully' })
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productUseCase.createProduct(createProductDto);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update a product by its ID' })
  // @ApiBody({ type: UpdateProductDto })
  // @ApiResponse({ status: 200, description: 'Product updated successfully' })
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productUseCase.updateProduct(id, updateProductDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a product by its ID' })
  // @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  // remove(@Param('id') id: string) {
  //   return this.productUseCase.deleteProduct(id);
  // }
}
