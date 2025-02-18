import { Injectable } from "@nestjs/common";
import { InvoicesService } from "../services/invoices.service";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";
import { UpdateInvoiceDto } from "../dtos/update-invoice.dto";

@Injectable()
export class InvoiceUseCase {
  constructor(private readonly invoiceService: InvoicesService  ) {}

  async getAllInvoices() {
    return await this.invoiceService.findAll();
  }

  async getInvoiceById(id: string) {
    const invoice = await this.invoiceService.findOne(id);
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    return invoice;
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    return await this.invoiceService.create(createInvoiceDto);
  }

  async updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoiceService.update(id, updateInvoiceDto);
  }

  async deleteInvoice(id: string) {
    return await this.invoiceService.remove(id);
  }
}
