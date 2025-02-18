import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';

import { InvoiceUseCase } from '../use-cases/invoice.use-case';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoiceUseCase: InvoiceUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceUseCase.createInvoice(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200, description: 'All invoices obtained successfully' })
  findAll() {
    return this.invoiceUseCase.getAllInvoices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice by its ID' })
  @ApiResponse({ status: 200, description: 'Invoice obtained successfully' })
  findOne(@Param('id') id: string) {
    return this.invoiceUseCase.getInvoiceById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an invoice by its ID' })
  @ApiBody({ type: UpdateInvoiceDto })
  @ApiResponse({ status: 200, description: 'Invoice updated successfully' })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceUseCase.updateInvoice(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an invoice by its ID' })
  @ApiResponse({ status: 200, description: 'Invoice deleted successfully' })
  remove(@Param('id') id: string) {
    return this.invoiceUseCase.deleteInvoice(id);
  }
}
