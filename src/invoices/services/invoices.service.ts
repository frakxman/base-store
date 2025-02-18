import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';

import { Invoice } from '../entities/invoice.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class InvoicesService {
  private invoices: Invoice[] = [
    {
      id: '1',
      user_id: '1',
      products: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          description: 'Description 1',
          images: [
            'https://picsum.photos/640/640?r=1',
            'https://picsum.photos/640/640?r=2',
            'https://picsum.photos/640/640?r=3'
          ],
          stock: 10,
          status: true,
        },
        {
          id: '2',
          name: 'Product 2',
          price: 200,
          description: 'Description 2',
          images: [
            'https://picsum.photos/640/640?r=4',
            'https://picsum.photos/640/640?r=5',
            'https://picsum.photos/640/640?r=6'
          ],
          stock: 20,
          status: true,
        }
      ],
      total: 100,
      date: new Date(),
    },
    {
      id: '2',
      user_id: '2',
      products: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          description: 'Description 1',
          images: [
            'https://picsum.photos/640/640?r=1',
            'https://picsum.photos/640/640?r=2',
            'https://picsum.photos/640/640?r=3'
          ],
          stock: 10,
          status: true,
        },
        {
          id: '2',
          name: 'Product 2',
          price: 200,
          description: 'Description 2',
          images: [
            'https://picsum.photos/640/640?r=4',
            'https://picsum.photos/640/640?r=5',
            'https://picsum.photos/640/640?r=6'
          ],
          stock: 20,
          status: true,
        }
      ],
      total: 200,
      date: new Date(),
    },
    {
      id: '3',
      user_id: '3',
      products: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          description: 'Description 1',
          images: [
            'https://picsum.photos/640/640?r=1',
            'https://picsum.photos/640/640?r=2',
            'https://picsum.photos/640/640?r=3'
          ],
          stock: 10,
          status: true,
        },
        {
          id: '2',
          name: 'Product 2',
          price: 200,
          description: 'Description 2',
          images: [
            'https://picsum.photos/640/640?r=4',
            'https://picsum.photos/640/640?r=5',
            'https://picsum.photos/640/640?r=6'
          ],
          stock: 20,
          status: true,
        }
      ],
      total: 300,
      date: new Date(),
    },
    {
      id: '4',
      user_id: '1',
      products: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          description: 'Description 1',
          images: [
            'https://picsum.photos/640/640?r=1',
            'https://picsum.photos/640/640?r=2',
            'https://picsum.photos/640/640?r=3'
          ],
          stock: 10,
          status: true,
        },
        {
          id: '2',
          name: 'Product 2',
          price: 200,
          description: 'Description 2',
          images: [
            'https://picsum.photos/640/640?r=4',
            'https://picsum.photos/640/640?r=5',
            'https://picsum.photos/640/640?r=6'
          ],
          stock: 20,
          status: true,
        }
      ],
      total: 100,
      date: new Date(),
    },
    {
      id: '5',
      user_id: '1',
      products: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          description: 'Description 1',
          images: [
            'https://picsum.photos/640/640?r=1',
            'https://picsum.photos/640/640?r=2',
            'https://picsum.photos/640/640?r=3'
          ],
          stock: 10,
          status: true,
        },
        {
          id: '2',
          name: 'Product 2',
          price: 200,
          description: 'Description 2',
          images: [
            'https://picsum.photos/640/640?r=4',
            'https://picsum.photos/640/640?r=5',
            'https://picsum.photos/640/640?r=6'
          ],
          stock: 20,
          status: true,
        }
      ],
      total: 100,
      date: new Date(),
    },
  ];

  create(createInvoiceDto: CreateInvoiceDto) {
    if (!createInvoiceDto.products || createInvoiceDto.products.length === 0) {
      throw new HttpException('Invoice must have at least one product', HttpStatus.BAD_REQUEST);
    }
  
    const id = (this.invoices.length + 1).toString();
    
    const total = createInvoiceDto.products.reduce((acc, product) => acc + product.price, 0);
    
    const invoice: Invoice = {
      id,
      ...createInvoiceDto,
      total,
      date: new Date(), 
    };
  
    this.invoices.push(invoice);
    
    return {
      message: 'Invoice created successfully',
      invoice,
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
    const invoiceIndex = this.invoices.findIndex((inv) => inv.id === id);
    
    if (invoiceIndex === -1) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
  
    const existingInvoice = this.invoices[invoiceIndex];
    
    // Actualizar los datos de la factura, permitiendo modificar productos
    const updatedInvoice: Invoice = {
      ...existingInvoice,
      ...updateInvoiceDto,
      products: updateInvoiceDto.products ?? existingInvoice.products,
      total: updateInvoiceDto.products
        ? updateInvoiceDto.products.reduce((acc, product) => acc + product.price, 0)
        : existingInvoice.total,
    };
    
    this.invoices[invoiceIndex] = updatedInvoice;
  
    return {
      message: 'Invoice updated successfully',
      invoice: updatedInvoice,
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
      invoice,
    };
  }
}
