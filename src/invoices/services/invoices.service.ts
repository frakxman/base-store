import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateInvoiceDto } from '../dtos/create-invoice.dto';

import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoicesService {
  /** 
   * Constructs a new InvoicesService.
   * @param invoiceModel - The invoice model injected by Mongoose.
   */
  constructor(@InjectModel(Invoice.name) private invoiceModel: Model<Invoice>) {}

  /**
   * Retrieves all invoices.
   * @returns A promise that resolves to an array of invoices.
   * @throws HttpException if invoices are not found.
   */
  async findAll() {
    try {
      const invoices = await this.invoiceModel.find().exec();
      return invoices;
    } catch (error) {
      throw new HttpException('Invoices not found', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Retrieves an invoice by its ID.
   * @param id - The ID of the invoice to retrieve.
   * @returns A promise that resolves to the invoice.
   * @throws HttpException if the invoice is not found.
   */
  async findOne(id: string) {
    try {
      const invoice = await this.invoiceModel.findById(id).exec();
      return invoice;
    } catch (error) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Creates a new invoice.
   * @param createInvoiceDto - The data transfer object containing invoice details.
   * @returns A promise that resolves to the created invoice.
   * @throws HttpException if the invoice is not created.
   */
  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const total = createInvoiceDto.products.reduce((acc, product) => acc + product.price, 0);

      const invoice = new this.invoiceModel({
        ...createInvoiceDto,
        total,
        date: new Date(),
      });       
      await invoice.save();
      return invoice;
    } catch (error) {
      throw new HttpException('Invoice not created', HttpStatus.BAD_REQUEST);
    }
  }
}
