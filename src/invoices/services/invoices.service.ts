import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';

import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoicesService {
  private invoices: Invoice[] = [
    {
      id: '1',
      user_id: '1',
      products: [
        'https://picsum.photos/640/640?r=1',
        'https://picsum.photos/640/640?r=2',
        'https://picsum.photos/640/640?r=3'
      ],
      total: 100,
      date: new Date(),
    },
    {
      id: '2',
      user_id: '2',
      products: [
        'https://picsum.photos/640/640?r=4',
        'https://picsum.photos/640/640?r=5',
        'https://picsum.photos/640/640?r=6'
      ],
      total: 200,
      date: new Date(),
    },
    {
      id: '3',
      user_id: '3',
      products: [
        'https://picsum.photos/640/640?r=7',
        'https://picsum.photos/640/640?r=8',
        'https://picsum.photos/640/640?r=9'
      ],
      total: 300,
      date: new Date(),
    },
  ];

  create(createInvoiceDto: CreateInvoiceDto) {
    const id = this.invoices.length + 1;
    const invoice: Invoice = {
      id: id.toString(),
      ...createInvoiceDto,
    };
    this.invoices.push(invoice);
    return {
      message: 'Invoice created successfully',
      invoices: this.invoices,
      status: HttpStatus.CREATED,
    };
  }

  findAll() {
    if (this.invoices.length === 0) {
      throw new HttpException('No invoices found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Invoices fetched successfully',
      invoices: this.invoices,
      status: HttpStatus.OK,
    };
  }

  findOne(id: string) {
    const invoice = this.invoices.find((invoice) => invoice.id === id);
    if (!invoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Invoice fetched successfully',
      invoice,
    };
  }

  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = this.findOne(id);
    if (!invoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Invoice updated successfully',
      invoice: updateInvoiceDto,
    };
  }

  remove(id: string) {  
    const invoice = this.findOne(id);
    if (!invoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
    this.invoices = this.invoices.filter((invoice) => invoice.id !== id);
    return {
      message: 'Invoice deleted successfully',
      invoices: this.invoices,
    };
  }
}
