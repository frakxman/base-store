import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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
   * Retrieves all invoices.
   * @returns A promise that resolves to an array of invoices.
   */
  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200, description: 'All invoices obtained successfully' })
  async findAll(@Res() res: Response): Promise<Response> {
    const invoices = await this.invoiceUseCase.getAllInvoices();
    return res.status(HttpStatus.OK).json(invoices);
  }

  /**
   * Retrieves an invoice by its ID.
   * @param id - The ID of the invoice to retrieve.
   * @returns A promise that resolves to the invoice.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice by its ID' })
  @ApiResponse({ status: 200, description: 'Invoice obtained successfully' })
  async findOne(@Param('id', MongoIdPipe) id: string, @Res() res: Response): Promise<Response> {
    const invoice = await this.invoiceUseCase.getInvoiceById(id);
    return res.status(HttpStatus.OK).json(invoice);
  }
  
  /**
   * Creates a new invoice.
   * @param user_id - The ID of the user that creates the invoice.
   * @param products - The products included in the invoice.
   * @returns A promise that resolves to the created invoice.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  async create(@Body() createInvoiceDto: CreateInvoiceDto, @Res() res: Response ): Promise<Response> {
    const { user_id, products } = createInvoiceDto;
    const invoice = await this.invoiceUseCase.createInvoice({ user_id, products });
    return res.status(HttpStatus.CREATED).json(invoice);
  }
}
