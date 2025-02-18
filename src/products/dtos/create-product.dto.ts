import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray, IsBoolean, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  @IsNotEmpty() 
  name: string;

  @ApiProperty({ description: 'The description of the product' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The price of the product' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'The stock of the product' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  stock: number;

  @ApiProperty({ description: 'The images of the product' })
  @IsArray()
  @IsNotEmpty()
  images: string[];

  @ApiProperty({ description: 'The status of the product' })
  @IsBoolean()
  status: boolean;
}
