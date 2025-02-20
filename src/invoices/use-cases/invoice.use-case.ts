import { Injectable } from "@nestjs/common";
import { InvoicesService } from "../services/invoices.service";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";

@Injectable()
export class InvoiceUseCase {
  /**
   * Constructs a new InvoiceUseCase.
   * @param invoiceService - The invoice service to use.
   */
  constructor(private readonly invoiceService: InvoicesService  ) {}

  /**
   * Retrieves all invoices.
   * @returns A promise that resolves to an array of invoices.
   */
  async getAllInvoices() {
    return await this.invoiceService.findAll();
  }

  /**
   * Retrieves an invoice by its ID.
   * @param id - The ID of the invoice to retrieve.
   * @returns A promise that resolves to the invoice.
   */
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
}
