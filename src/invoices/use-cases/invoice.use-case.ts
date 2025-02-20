import { Injectable } from "@nestjs/common";
import { InvoicesService } from "../services/invoices.service";

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

  
  async createInvoice({ user_id, products }) {
    const productDetails = products.map(product => ({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    }));

    const total = productDetails.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const invoiceData = {
      user_id,
      products: productDetails,
      total,
      date: new Date(),
    };

    return await this.invoiceService.create(invoiceData);
  }
}
