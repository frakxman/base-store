import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductUseCase } from './use-cases/products.use-case';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductUseCase],
})
export class ProductsModule {}
