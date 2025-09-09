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
import { ChoferService } from './chofer.service';
import { CreateChoferDto } from './dto/create-chofer.dto';
import { UpdateChoferDto } from './dto/update-chofer.dto';

@Controller('choferes')
export class ChoferController {
  constructor(private readonly choferService: ChoferService) {}

  @Post()
  create(@Body() createChoferDto: CreateChoferDto) {
    return this.choferService.createChofer(createChoferDto);
  }

  @Get()
  findAll() {
    return this.choferService.findAllChoferes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.choferService.findChoferById(id);
  }

  @Get('ci/:ci')
  findByCi(@Param('ci') ci: string) {
    return this.choferService.findChoferByCi(ci);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChoferDto: UpdateChoferDto) {
    return this.choferService.updateChofer(id, updateChoferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.choferService.deleteChofer(id);
  }

  @Post(':id/viajes/:viajeId')
  agregarViaje(
    @Param('id') id: string,
    @Param('viajeId') viajeId: string
  ) {
    return this.choferService.agregarViajeAChofer(id, viajeId);
  }

  @Get(':id/viajes')
  obtenerViajes(@Param('id') id: string) {
    return this.choferService.obtenerViajesDeChofer(id);
  }
}