import { IsString, IsNotEmpty, IsNumber, IsArray, IsBoolean, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty() 
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  stock: number;
  @IsArray()
  @IsNotEmpty()
  images: string[];
  @IsBoolean()
  status: boolean;
}
