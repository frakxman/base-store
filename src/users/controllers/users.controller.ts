import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

import { UserUseCase } from '../use-cases/user.use-case';

import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { Public } from '../../auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  /**
   * Construct a new UsersController
   * @param userUseCase - The use case for managing user operations
   */
  constructor(private readonly userUseCase: UserUseCase) {}

  /**
   * Get all users
   * @param res - The response object
   * @returns The promise that resolves to the response containing all users
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'All users obtained successfully' })
  async findAll(@Res() res: Response): Promise<Response> {
    const users = await this.userUseCase.getAllUsers();
    return res.status(HttpStatus.OK).json(users);     
  }

  /**
   * Get a user by its ID
   * @param id - The ID of the user to retrieve
   * @param res - The response object
   * @returns The promise that resolves to the response containing the user
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by its ID' })
  @ApiResponse({ status: 200, description: 'User obtained successfully' })
  async findOne(@Param('id', MongoIdPipe) id: string, @Res() res: Response): Promise<Response> {
    const user = await this.userUseCase.getUserById(id);
    return res.status(HttpStatus.OK).json(user);  
  }

  /**
   * Create a new user
   * @param name - The name of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @param role - The role of the user
   * @param res - The response object
   * @returns The promise that resolves to the response containing the created user
   */
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<Response> {
    const user = await this.userUseCase.createUser(createUserDto);
    return res.status(HttpStatus.CREATED).json(user); 
  }

  /**
   * Update a user by its ID
   * @param id - The ID of the user to update
   * @param name - The name of the user
   * @param email - The email of the user
   * @param password - The password of the user
   * @param res - The response object
   * @returns The promise that resolves to the response containing the updated user
   */
  @Public()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by its ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async update(@Param('id', MongoIdPipe) id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response): Promise<Response> {
    const { name, email, password } = updateUserDto;
    const user = await this.userUseCase.updateUser(id, { name, email, password });
    return res.status(HttpStatus.OK).json(user);
  }

  /**
   * Delete a user by its ID
   * @param id - The ID of the user to delete
   * @param res - The response object
   * @returns The promise that resolves to the response containing the deleted user
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by its ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async remove(@Param('id', MongoIdPipe) id: string, @Res() res: Response): Promise<Response> {
    await this.userUseCase.deleteUser(id);
    return res.status(HttpStatus.OK).send();
  }

  /**
   * Get all invoices of a user
   * @param id - The ID of the user
   * @param res - The response object
   * @returns All promises that resolve to the response containing all invoices of the user
   */
  @Get(':id/invoices')
  @ApiOperation({ summary: 'Get all invoices of a user' })
  @ApiResponse({ status: 200, description: 'All invoices obtained successfully' })
  async getUserInvoices(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const invoices = await this.userUseCase.getUserInvoices(id);
    return res.status(HttpStatus.OK).json(invoices);
  }
}
