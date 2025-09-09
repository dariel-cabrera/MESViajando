import { IsNotEmpty, IsOptional, IsString} from "class-validator"

export class UpdateProfesorDto{
    
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
    facultad: string

    @IsString()
    @IsNotEmpty()
    asignaturas: string[]
  
}