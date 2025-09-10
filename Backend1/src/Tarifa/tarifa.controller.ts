import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query 
} from '@nestjs/common';
import { CreateTarifaDto } from './dto/createTarifa.dto';
import { UpdateTarifaDto } from './dto/updateTarifa.dto';
import { TarifasService } from './tarifa.service';

@Controller('tarifas')
export class TarifaController {
  constructor(private readonly tarifasService: TarifasService) {}

  @Post()
  create(@Body() createTarifaDto: CreateTarifaDto) {
    return this.tarifasService.crearTarifa(createTarifaDto);
  }

  @Get()
  findAll() {
    return this.tarifasService.listarTarifas();
  }

  @Get('destino/:destino')
  findByDestino(@Param('destino') destino: string) {
    return this.tarifasService.obtenerTarifaPorDestino(destino);
  }

  @Get('buscar')
  buscarPorDestino(@Query('destino') destino: string) {
    return this.tarifasService.obtenerTarifaPorDestino(destino);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarifaDto: UpdateTarifaDto) {
    return this.tarifasService.actualizarTarifa(id, updateTarifaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarifasService.eliminarTarifa(id);
  }
}