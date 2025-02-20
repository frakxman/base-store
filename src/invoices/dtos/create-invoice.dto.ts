import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Represents a product included in the invoice.
 */
class ProductDetailDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Price of the product' })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'Quantity of the product' })
  @IsNotEmpty()
  quantity: number;
}

export class CreateInvoiceDto {
    @ApiProperty({ description: 'ID of the user that creates the invoice' })
    @IsString()
    @IsNotEmpty()   
    user_id: string;

    @ApiProperty({ description: 'Products included in the invoice' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDetailDto)
    products: ProductDetailDto[];
}
