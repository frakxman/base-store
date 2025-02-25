import { Injectable } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

@Injectable()
export class UserUseCase {
  /**
   * Constructs a new UserUseCase.
   * @param userService - The user service to use.
   */
  constructor(private readonly userService: UsersService) {}

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of users.
   */
  async getAllUsers() {
    return await this.userService.findAll();
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the user.
   */
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

