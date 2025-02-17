import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProductsModule, UsersModule, InvoicesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
