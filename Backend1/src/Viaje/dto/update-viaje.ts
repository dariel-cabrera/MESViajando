// viajes/dto/create-viaje.dto.ts
import { IsString, IsNumber, IsDate, IsArray, IsNotEmpty, IsOptional, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';


// update-viaje.dto.ts (puede ser parcial)
export class UpdateViajeDto {
  @IsOptional()
  @IsString()
  nombre?:string;

  @IsOptional()
  @IsArray()
  destinos?: string[];

  @IsOptional()
  @IsNumber()
  capacidad?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha?: Date;

  @IsOptional()
  @IsMongoId()
  chofer?: string;

  @IsOptional()
  @IsNumber()
  recaudacionTotal?: number;
}