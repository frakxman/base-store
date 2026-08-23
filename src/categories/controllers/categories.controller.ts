import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

import { CategoryUseCase } from '../use-cases/categories.use-case';

import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { Public } from '../../auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryUseCase: CategoryUseCase) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'All categories obtained successfully' })
  async findAll(@Res() res: Response): Promise<Response> {
    const categories = await this.categoryUseCase.getAllCategories();
    return res.status(HttpStatus.OK).json(categories);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a category by its ID' })
  @ApiResponse({ status: 200, description: 'Category obtained successfully' })
  async findOne(@Param('id', MongoIdPipe) id: string, @Res() res: Response): Promise<Response> {
    const category = await this.categoryUseCase.getCategoryById(id);
    return res.status(HttpStatus.OK).json(category);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response): Promise<Response> {
    const category = await this.categoryUseCase.createCategory(createCategoryDto);
    return res.status(HttpStatus.CREATED).json(category);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by its ID' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  async update(@Param('id', MongoIdPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Res() res: Response): Promise<Response> {
    const category = await this.categoryUseCase.updateCategory(id, updateCategoryDto);
    return res.status(HttpStatus.OK).json(category);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by its ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  async remove(@Param('id', MongoIdPipe) id: string, @Res() res: Response): Promise<Response> {
    const category = await this.categoryUseCase.deleteCategory(id);
    return res.status(HttpStatus.OK).json(category);
  }
}
