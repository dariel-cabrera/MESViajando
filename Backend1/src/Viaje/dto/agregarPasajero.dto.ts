// viajes/dto/agregar-pasajero.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class AgregarPasajeroDto {
  @IsString()
  @IsNotEmpty()
  profesorId: string; // ID del profesor a agregar
}