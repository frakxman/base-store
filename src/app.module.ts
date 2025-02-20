import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { environments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV || '.env'],
      load: [config],
      isGlobal: true,
      // validationSchema: Joi.object({
      //   API_KEY: Joi.string().required(),
      //   DATABASE_HOST: Joi.string().required(),
      //   DATABASE_PORT: Joi.number().required(),
      // }),
    }),
    DatabaseModule,
    InvoicesModule, 
    ProductsModule, 
    UsersModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
