import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserUseCase } from './use-cases/user.use-case';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserUseCase],
})
export class UsersModule {}
