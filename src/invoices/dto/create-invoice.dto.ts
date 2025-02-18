import { IsString, IsNotEmpty, IsArray, IsNumber, IsDate } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateInvoiceDto {
    @IsString()
    @IsNotEmpty()   
    user_id: string;
    @IsArray()
    @IsNotEmpty()
    products: Product[];
    @IsNumber()
    @IsNotEmpty()
    total: number;
}
