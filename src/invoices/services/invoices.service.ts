import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';

import { Invoice } from '../entities/invoice.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class InvoicesService {
  // private invoices: Invoice[] = [
  //   {
  //     id: '1',
  //     user_id: '1',
  //     products: [
  //       {
  //         id: '1',
  //         name: 'Product 1',
  //         price: 100,
  //         description: 'Description 1',
  //         images: [
  //           'https://picsum.photos/640/640?r=1',
  //           'https://picsum.photos/640/640?r=2',
  //           'https://picsum.photos/640/640?r=3'
  //         ],
  //         stock: 10,
  //         status: true,
  //       },
  //       {
  //         id: '2',
  //         name: 'Product 2',
  //         price: 200,
  //         description: 'Description 2',
  //         images: [
  //           'https://picsum.photos/640/640?r=4',
  //           'https://picsum.photos/640/640?r=5',
  //           'https://picsum.photos/640/640?r=6'
  //         ],
  //         stock: 20,
  //         status: true,
  //       }
  //     ],
  //     total: 100,
  //     date: new Date(),
  //   },
  //   {
  //     id: '2',
  //     user_id: '2',
  //     products: [
  //       {
  //         id: '1',
  //         name: 'Product 1',
  //         price: 100,
  //         description: 'Description 1',
  //         images: [
  //           'https://picsum.photos/640/640?r=1',
  //           'https://picsum.photos/640/640?r=2',
  //           'https://picsum.photos/640/640?r=3'
  //         ],
  //         stock: 10,
  //         status: true,
  //       },
  //       {
  //         id: '2',
  //         name: 'Product 2',
  //         price: 200,
  //         description: 'Description 2',
  //         images: [
  //           'https://picsum.photos/640/640?r=4',
  //           'https://picsum.photos/640/640?r=5',
  //           'https://picsum.photos/640/640?r=6'
  //         ],
  //         stock: 20,
  //         status: true,
  //       }
  //     ],
  //     total: 200,
  //     date: new Date(),
  //   },
  //   {
  //     id: '3',
  //     user_id: '3',
  //     products: [
  //       {
  //         id: '1',
  //         name: 'Product 1',
  //         price: 100,
  //         description: 'Description 1',
  //         images: [
  //           'https://picsum.photos/640/640?r=1',
  //           'https://picsum.photos/640/640?r=2',
  //           'https://picsum.photos/640/640?r=3'
  //         ],
  //         stock: 10,
  //         status: true,
  //       },
  //       {
  //         id: '2',
  //         name: 'Product 2',
  //         price: 200,
  //         description: 'Description 2',
  //         images: [
  //           'https://picsum.photos/640/640?r=4',
  //           'https://picsum.photos/640/640?r=5',
  //           'https://picsum.photos/640/640?r=6'
  //         ],
  //         stock: 20,
  //         status: true,
  //       }
  //     ],
  //     total: 300,
  //     date: new Date(),
  //   },
  //   {
  //     id: '4',
  //     user_id: '1',
  //     products: [
  //       {
  //         id: '1',
  //         name: 'Product 1',
  //         price: 100,
  //         description: 'Description 1',
  //         images: [
  //           'https://picsum.photos/640/640?r=1',
  //           'https://picsum.photos/640/640?r=2',
  //           'https://picsum.photos/640/640?r=3'
  //         ],
  //         stock: 10,
  //         status: true,
  //       },
  //       {
  //         id: '2',
  //         name: 'Product 2',
  //         price: 200,
  //         description: 'Description 2',
  //         images: [
  //           'https://picsum.photos/640/640?r=4',
  //           'https://picsum.photos/640/640?r=5',
  //           'https://picsum.photos/640/640?r=6'
  //         ],
  //         stock: 20,
  //         status: true,
  //       }
  //     ],
  //     total: 100,
  //     date: new Date(),
  //   },
  //   {
  //     id: '5',
  //     user_id: '1',
  //     products: [
  //       {
  //         id: '1',
  //         name: 'Product 1',
  //         price: 100,
  //         description: 'Description 1',
  //         images: [
  //           'https://picsum.photos/640/640?r=1',
  //           'https://picsum.photos/640/640?r=2',
  //           'https://picsum.photos/640/640?r=3'
  //         ],
  //         stock: 10,
  //         status: true,
  //       },
  //       {
  //         id: '2',
  //         name: 'Product 2',
  //         price: 200,
  //         description: 'Description 2',
  //         images: [
  //           'https://picsum.photos/640/640?r=4',
  //           'https://picsum.photos/640/640?r=5',
  //           'https://picsum.photos/640/640?r=6'
  //         ],
  //         stock: 20,
  //         status: true,
  //       }
  //     ],
  //     total: 100,
  //     date: new Date(),
  //   },
  // ];

  constructor(@InjectModel(Invoice.name) private invoiceModel: Model<Invoice>) {}

  async findAll() {
    const invoices = await this.invoiceModel.find().exec();
    if (invoices.length === 0) {
      throw new HttpException('No invoices found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Invoices fetched successfully',
      invoices,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const invoice = await this.invoiceModel.findById(id).exec();
    if (!invoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Invoice fetched successfully',
      invoice,
      status: HttpStatus.OK,
    };
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    const total = createInvoiceDto.products.reduce((acc, product) => acc + product.price, 0);

    const invoice = new this.invoiceModel({
      ...createInvoiceDto,
      total,
      date: new Date(),
    });

    await invoice.save();
    return {
      message: 'Invoice created successfully',
      invoice,  
      status: HttpStatus.CREATED,
    };
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const { invoice } = await this.findOne(id); 

    const updatedInvoiceData = {
      ...invoice.toObject(), 
      ...updateInvoiceDto,
      products: updateInvoiceDto.products ?? invoice.products,
      total: updateInvoiceDto.products
        ? updateInvoiceDto.products.reduce((acc, product) => acc + product.price, 0)
        : invoice.total,
    };

    const updatedInvoice = await this.invoiceModel.findByIdAndUpdate(id, updatedInvoiceData, { new: true }).exec();

    return {
      message: 'Invoice updated successfully',
      invoice: updatedInvoice,
      status: HttpStatus.OK,
    };
  }
  
  async remove(id: string) {  
    const invoice = await this.findOne(id);
    if (!invoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
    await this.invoiceModel.findByIdAndDelete(id).exec();
    return {
      message: 'Invoice deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
