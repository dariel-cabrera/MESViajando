// viajes/dto/create-viaje.dto.ts
import { IsString, IsNumber, IsDate, IsArray, IsNotEmpty, IsOptional, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateViajeDto {
  @IsArray()
  destinos: string[];

  @IsNumber()
  capacidad: number;

  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsMongoId()
  chofer: string;

  @IsArray()
  profesores:string[] | [];;

  @IsOptional()
  @IsNumber()
  recaudacionTotal?: number;
}