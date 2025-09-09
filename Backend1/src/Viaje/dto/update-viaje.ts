// viajes/dto/create-viaje.dto.ts
import { IsString, IsNumber, IsDate, IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateViajeDto {
  @IsString()
  @IsNotEmpty()
  destino: string;

  @IsNumber()
  @IsNotEmpty()
  capacidad: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  chofer: string; // ID del chofer

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  listaPasajeros?: string[]; // Array de IDs de profesores

  @IsNumber()
  @IsOptional()
  tarifa?: number; // Agregado basado en la tabla de tarifas
}