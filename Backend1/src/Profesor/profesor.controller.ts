import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.createProfesor(createProfesorDto);
  }

  @Get()
  findAll() {
    return this.profesorService.findAllProfesores();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.findProfesorById(id);
  }

  @Get('ci/:ci')
  findByCi(@Param('ci') ci: string) {
    return this.profesorService.findProfesorByCi(ci);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateProfesorDto: UpdateProfesorDto
  ) {
    return this.profesorService.updateProfesor(id, updateProfesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.deleteProfesor(id);
  }

  @Post(':id/viajes/:viajeId')
  agregarViaje(
    @Param('id') id: string,
    @Param('viajeId') viajeId: string
  ) {
    return this.profesorService.agregarViajeAProfesor(id, viajeId);
  }

  @Get(':id/viajes')
  obtenerViajes(@Param('id') id: string) {
    return this.profesorService.obtenerViajesDeProfesor(id);
  }
}