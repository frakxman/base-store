import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserUseCase } from './use-cases/user.use-case';

import { User, UserSchema } from './entities/user.entity';

import { InvoicesModule } from 'src/invoices/invoices.module';

@Module({
  imports: [
    InvoicesModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserUseCase],
  exports: [UsersService]
})
export class UsersModule {}
