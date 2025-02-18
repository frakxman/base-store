import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InvoicesService } from './services/invoices.service';
import { InvoicesController } from './controllers/invoices.controller';
import { InvoiceUseCase } from './use-cases/invoice.use-case';

import { Invoice, InvoiceSchema } from './entities/invoice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceSchema },
    ]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoiceUseCase],
  exports: [InvoicesService],
})
export class InvoicesModule {}
