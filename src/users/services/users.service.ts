import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { User } from '../entities/user.entity';

import { InvoicesService } from '../../invoices/services/invoices.service';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 'admin',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password',
      role: 'user',
    },
  ];

  constructor(private readonly invoicesService: InvoicesService) {}

  create(createUserDto: CreateUserDto) {
    const id = this.users.length + 1;
    const user: User = {
      id: id.toString(),
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
    };
    this.users.push(user);
    return {
      message: 'User created successfully',
      user,
    };
  }

  findAll() {
    if (this.users.length === 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Users fetched successfully',
      users: this.users,
    };
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User fetched successfully',
      user,
    };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };

    return {
      message: 'User updated successfully',
      user: this.users[userIndex],
    };
  }

  remove(id: string) {
    const user = this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.users = this.users.filter((user) => user.id !== id);
    return {
      message: 'User deleted successfully',
    };
  }

  getUserInvoices(id: string) {
    const user = this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { invoices } = this.invoicesService.findAll();
    const userInvoices = invoices.filter(invoice => invoice.user_id === id);
    return {
      message: 'User invoices fetched successfully',
      invoices: userInvoices,
      status: HttpStatus.OK,
    };
  }
}

