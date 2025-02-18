import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductUseCase } from './use-cases/products.use-case';

import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductUseCase],
})
export class ProductsModule {}
