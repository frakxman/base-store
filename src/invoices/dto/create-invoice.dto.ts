import { IsString, IsNotEmpty, IsArray, IsNumber, IsDate } from 'class-validator';

export class CreateInvoiceDto {
    @IsString()
    @IsNotEmpty()   
    user_id: string;
    @IsArray()
    @IsNotEmpty()
    products: string[];
    @IsNumber()
    @IsNotEmpty()
    total: number;
    @IsDate()
    @IsNotEmpty()
    date: Date;
}
