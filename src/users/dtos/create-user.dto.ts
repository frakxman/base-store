import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'El nombre del usuario' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'El email del usuario' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'La contraseña del usuario' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'El rol del usuario' })
    @IsString()
    @IsNotEmpty()
    role: string;
}
