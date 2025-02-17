import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';

import { InvoiceUseCase } from '../use-cases/invoice.use-case';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoiceUseCase: InvoiceUseCase) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceUseCase.createInvoice(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoiceUseCase.getAllInvoices();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceUseCase.getInvoiceById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceUseCase.updateInvoice(id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceUseCase.deleteInvoice(id);
  }
}
