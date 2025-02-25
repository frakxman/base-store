import { Injectable } from "@nestjs/common";
import { UsersService } from "../services/users.service";

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
    const users = await this.userService.findAll();
    return users;
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

  /**
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @param role - The role of the user.
   * @returns 
   */
  async createUser({ name, email, password, role }) {
    const user = await this.userService.create({ name, email, password, role });
    return user;
  }

  /**
   * Updates an existing user.
   * @param id - The ID of the user to update.
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the updated user.
   */
  async updateUser(id: string, { name, email, password }) {
    return await this.userService.update(id, { name, email, password });
  }


  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves to the result of the deletion.
   */
  async deleteUser(id: string) {
    return await this.userService.remove(id);
  }

  /**
   * Get user invoices
   * @param id - The ID of the user to retrieve invoices
   * @returns A promise that resolves to the user invoices
   */
  async getUserInvoices(id: string) {
    return await this.userService.getUserInvoices(id);
  }
}

