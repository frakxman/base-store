import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateInvoiceDto } from '../dtos/create-invoice.dto';

import { InvoiceUseCase } from '../use-cases/invoice.use-case';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  /**
   * Constructs a new InvoicesController.
   * @param invoiceUseCase - The invoice use case to use.
   */
  constructor(private readonly invoiceUseCase: InvoiceUseCase) {}

  /**
   * Creates a new invoice.
   * @param createInvoiceDto - The data transfer object containing invoice details.
   * @returns A promise that resolves to the created invoice.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceUseCase.createInvoice(createInvoiceDto);
  }

  /**
   * Retrieves all invoices.
   * @returns A promise that resolves to an array of invoices.
   */
  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200, description: 'All invoices obtained successfully' })
  findAll() {
    return this.invoiceUseCase.getAllInvoices();
  }

  /**
   * Retrieves an invoice by its ID.
   * @param id - The ID of the invoice to retrieve.
   * @returns A promise that resolves to the invoice.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice by its ID' })
  @ApiResponse({ status: 200, description: 'Invoice obtained successfully' })
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.invoiceUseCase.getInvoiceById(id);
  }  
}
