import { IsNotEmpty, IsOptional, IsString} from "class-validator"

export class UpdateChoferDto{
    
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsNotEmpty()
    apellido: string

    @IsString()
    @IsNotEmpty()
    ci: string

    @IsString()
    @IsNotEmpty()
    usuario: string

    @IsString()
    @IsOptional()
    contrasena?: string

    @IsString()
    @IsNotEmpty()
    NoLicencia: string

  
}