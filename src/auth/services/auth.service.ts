import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
    constructor( private userService: UsersService) {}

    async validateUser(email: string, password: string): Promise<any> {
        // Añade logs para depuración
        console.log('Attempting to validate user with email:', email);
        console.log('Password provided:', password ? 'Yes (not showing for security)' : 'No');
        
        const user = await this.userService.findUserByEmail(email);
        
        if (!user) {
          console.log('User not found with email:', email);
          return null;
        }
        
        console.log('User found. Has password?', !!user.password);
        
        if (!password) {
          console.log('No password provided for comparison');
          return null;
        }
        
        if (!user.password) {
          console.log('User has no stored password hash');
          return null;
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const { password, ...result } = user;
          return result;
        }
        
        return null;
    }
}
