import { Injectable } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

@Injectable()
export class UserUseCase {
  constructor(private readonly userService: UsersService) {}

  async getAllUsers() {
    return await this.userService.findAll();
  }

  async getUserById(id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  async deleteUser(id: string) {
    return await this.userService.remove(id);
  }

  async getUserInvoices(id: string) {
    return await this.userService.getUserInvoices(id);
  }
}

