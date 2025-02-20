import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

import { ProductUseCase } from '../use-cases/products.use-case';

import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  /**
   * Constructs a new ProductsController.
   * @param productUseCase - The use case for managing product operations.
   */
  constructor(private readonly productUseCase: ProductUseCase) {}

  /**
   * Retrieves all products.
   * @param res - The response object.
   * @returns A promise that resolves to the response containing all products.
   */
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'All products obtained successfully' })
  async findAll(@Res() res: Response): Promise<Response> {
    const products = await this.productUseCase.getAllProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product to retrieve.
   * @param res - The response object.
   * @returns A promise that resolves to the response containing the product.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by its ID' })
  @ApiResponse({ status: 200, description: 'Product obtained successfully' })
  async findOne(@Param('id', MongoIdPipe) id: string, @Res() res: Response): Promise<Response> {
    const product = await this.productUseCase.getProductById(id);
    return res.status(HttpStatus.OK).json(product);
  }

  /**
   * Creates a new product.
   * @param createProductDto - The data transfer object containing product details.
   * @param res - The response object.
   * @returns A promise that resolves to the response containing the created product.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response): Promise<Response> {
    const product = await this.productUseCase.createProduct(createProductDto);
    return res.status(HttpStatus.CREATED).json(product);
  }

  /**
   * Updates a product by its ID.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data transfer object containing updated product details.
   * @param res - The response object.
   * @returns A promise that resolves to the response containing the updated product.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by its ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  async update(@Param('id', MongoIdPipe) id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response): Promise<Response> {
    const product = await this.productUseCase.updateProduct(id, updateProductDto);
    return res.status(HttpStatus.OK).json(product);
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @param res - The response object.
   * @returns A promise that resolves to the response confirming the deletion.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by its ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  async remove(@Param('id', MongoIdPipe) id: string, @Res() res: Response): Promise<Response> {
    const product = await this.productUseCase.deleteProduct(id);
    return res.status(HttpStatus.OK).json(product);
  }
}
