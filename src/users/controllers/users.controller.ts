import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { UserUseCase } from '../use-cases/user.use-case';

@Controller('users')
export class UsersController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userUseCase.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userUseCase.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userUseCase.getUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userUseCase.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userUseCase.deleteUser(id);
  }

  @Get(':id/invoices')
  getUserInvoices(@Param('id') id: string) {
    return this.userUseCase.getUserInvoices(id);
  }
}
