import { PartialType } from '@nestjs/mapped-types';
import { CreateTarifaDto } from './createTarifa.dto';


export class UpdateTarifaDto extends PartialType(CreateTarifaDto) {}