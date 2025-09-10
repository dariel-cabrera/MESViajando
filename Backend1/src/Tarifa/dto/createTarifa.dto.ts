import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateTarifaDto {
  @IsString()
  @IsNotEmpty()
  destino: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  precio: number;
}