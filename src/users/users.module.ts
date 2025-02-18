import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserUseCase } from './use-cases/user.use-case';

import { InvoicesModule } from 'src/invoices/invoices.module';

@Module({
  imports: [InvoicesModule],
  controllers: [UsersController],
  providers: [UsersService, UserUseCase],
})
export class UsersModule {}
