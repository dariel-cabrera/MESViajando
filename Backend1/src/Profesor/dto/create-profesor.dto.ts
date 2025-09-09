import { IsNotEmpty, IsString} from "class-validator"

export class CreateProfesorDto{
    
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
    facultad: string

    @IsString()
    @IsNotEmpty()
    asignaturas: string[]
  
}
