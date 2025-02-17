export class CreateInvoiceDto {
    user_id: string;
    products: string[];
    total: number;
    date: Date;
}
