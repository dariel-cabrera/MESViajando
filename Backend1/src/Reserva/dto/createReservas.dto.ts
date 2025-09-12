// viajes/dto/create-viaje.dto.ts
import { IsString, IsNumber, IsDate, IsArray, IsNotEmpty, IsOptional, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservasDto {
  @IsMongoId()
  viajes: string;

  @IsMongoId()
  profesor: string;

  @IsString()
  @IsNotEmpty()
  destino: string;

  
  @IsDate()
  @Type(() => Date)
  fecha: Date;
}