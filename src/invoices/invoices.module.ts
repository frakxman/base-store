import { Module } from '@nestjs/common';
import { InvoicesService } from './services/invoices.service';
import { InvoicesController } from './controllers/invoices.controller';
import { InvoiceUseCase } from './use-cases/invoice.use-case';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoiceUseCase],

})
export class InvoicesModule {}
