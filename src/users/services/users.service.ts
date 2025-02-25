import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity';

import { InvoicesService } from '../../invoices/services/invoices.service';

@Injectable()
export class UsersService {

  /**
   * Constructs a new UsersService.
   * @param userModel - The user model injected by Mongoose.
   * @param invoicesService - The invoices service to use.
   */
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly invoicesService: InvoicesService) {}

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of users.
   * @throws HttpException if users are not found.
   */
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the user.
   * @throws HttpException if the user is not found.
   */
  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      return user;
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Creates a new user.
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @param role - The role of the user.
   * @returns A promise that resolves to the created user.
   * @throws HttpException if the user is not created.
   */
  async create({ name, email, password, role }) {
    try {
      const user = new this.userModel({ name, email, password, role });
      await user.save();
      return user;
    } catch (error) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Updates a user by their ID.
   * @param id - The ID of the user to update.
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the updated user.
   * @throws HttpException if the user is not found.
   */
  async update(id: string, { name, email, password }) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, { $set: { name, email, password } }, { new: true }).exec();
      return user;
    } catch (error) {
      throw new HttpException('User not updated', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Removes a user by their ID.
   * @param id - The ID of the user to remove.
   * @returns A promise that resolves to the deleted user.
   * @throws HttpException if the user is not found.
   */ 
  async remove(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();
      return user;
    } catch (error) {
      throw new HttpException('User not deleted', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Retrieves the invoices for a user by their ID.
   * @param id - The ID of the user to retrieve invoices for.
   * @returns A promise that resolves to the user's invoices.
   * @throws HttpException if the user is not found.
   */
  async getUserInvoices(id: string) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const invoices = await this.invoicesService.findAll();
      const userInvoices = invoices.filter(invoice => invoice.user_id === id);
      return {
        invoices: userInvoices,
      };
    } catch (error) {
      throw new HttpException('User invoices not found', HttpStatus.NOT_FOUND);   
    }
  }
}

