import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

import { User } from '../entities/user.entity';

import { InvoicesService } from '../../invoices/services/invoices.service';

@Injectable()
export class UsersService {
  // private users: User[] = [
  //   {
  //     id: '1',
  //     name: 'John Doe',
  //     email: 'john.doe@example.com',
  //     password: 'password',
  //     role: 'admin',
  //   },
  //   {
  //     id: '2',
  //     name: 'Jane Doe',
  //     email: 'jane.doe@example.com',
  //     password: 'password',
  //     role: 'user',
  //   },

  // ];

  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly invoicesService: InvoicesService) {}

  async findAll() {
    const users = await this.userModel.find().exec();
    if (users.length === 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Users fetched successfully',
      users,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User fetched successfully',
      user,
      status: HttpStatus.OK,
    };
  }

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    await user.save();
    return {
      message: 'User created successfully',
      user,
      status: HttpStatus.CREATED,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true }).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User updated successfully',
      user,
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userModel.findByIdAndDelete(id).exec();
    return {
      message: 'User deleted successfully',
    };
  }

  // getUserInvoices(id: string) {
  //   const user = this.findOne(id);
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }

  //   const { invoices } = this.invoicesService.findAll();
  //   const userInvoices = invoices.filter(invoice => invoice.user_id === id);
  //   return {
  //     message: 'User invoices fetched successfully',
  //     invoices: userInvoices,
  //     status: HttpStatus.OK,
  //   };
  // }
}

