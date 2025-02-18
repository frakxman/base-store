import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

import { UserUseCase } from '../use-cases/user.use-case';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userUseCase.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'All users obtained successfully' })
  findAll() {
    return this.userUseCase.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by its ID' })
  @ApiResponse({ status: 200, description: 'User obtained successfully' })
  findOne(@Param('id') id: string) {
    return this.userUseCase.getUserById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by its ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userUseCase.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by its ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id') id: string) {
    return this.userUseCase.deleteUser(id);
  }

  @Get(':id/invoices')
  @ApiOperation({ summary: 'Get all invoices of a user' })
  @ApiResponse({ status: 200, description: 'All invoices obtained successfully' })
  getUserInvoices(@Param('id') id: string) {
    return this.userUseCase.getUserInvoices(id);
  }
}
