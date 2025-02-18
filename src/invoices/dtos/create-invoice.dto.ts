import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

import { Product } from 'src/products/entities/product.entity';

export class CreateInvoiceDto {
    @ApiProperty({ description: 'ID of the user that creates the invoice' })
    @IsString()
    @IsNotEmpty()   
    user_id: string;

    @ApiProperty({ description: 'Products included in the invoice' })
    @IsArray()
    @IsNotEmpty()
    products: Product[];

    @ApiProperty({ description: 'Total of the invoice' })
    @IsNumber()
    @IsNotEmpty()
    total: number;
}
