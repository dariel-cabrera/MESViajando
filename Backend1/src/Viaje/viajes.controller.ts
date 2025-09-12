import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje';
import { AgregarPasajeroDto } from './dto/agregarPasajero.dto';

@Controller('viajes')
export class ViajesController {
  constructor(private readonly viajesService: ViajesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createViajeDto: CreateViajeDto) {
    return this.viajesService.create(createViajeDto);
  }

  @Get()
  async findAll() {
    return this.viajesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.viajesService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateViajeDto: UpdateViajeDto,
  ) {
    return this.viajesService.update(id, updateViajeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.viajesService.delete(id);
  }

  @Post(':id/pasajeros')
  @UsePipes(new ValidationPipe({ transform: true }))
  async agregarPasajero(
    @Param('id') id: string,
    @Body() agregarPasajeroDto: AgregarPasajeroDto,
  ) {
    return this.viajesService.agregarPasajero(id, agregarPasajeroDto);
  }

  @Get('count-by-licencia/:licencia')
  async countViajesByLicencia(@Param('licencia') licencia: string) {
    return this.viajesService.countViajesByLicenciaChofer(licencia);
  }
}