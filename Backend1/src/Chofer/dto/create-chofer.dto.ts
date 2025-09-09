import { IsNotEmpty, IsString} from "class-validator"

export class CreateChoferDto{
    
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
    @IsNotEmpty()
    contrasena: string

    @IsString()
    @IsNotEmpty()
    NoLicencia: string
    
}
