/*import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Viaje } from 'src/entity/viajes.entity';
import { Profesor } from 'src/entity/profesor.entity';
import { Chofer } from 'src/entity/chofer.entity';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje';
import { AgregarPasajeroDto } from './dto/agregarPasajero.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TarifasService } from 'src/Tarifa/tarifa.service';
import { Model } from 'mongoose';

@Injectable()
export class ViajesService {
  constructor(
    @InjectModel(Viaje.name) private readonly viajeModel: Model<Viaje>,
    @InjectModel(Profesor.name) private readonly profesorModel: Model<Profesor>,
    @InjectModel(Chofer.name) private readonly choferModel: Model<Chofer>,
    private readonly tarifasService: TarifasService, // ✅ Inyectar servicio de tarifas
  ) {}

  

   // ✅ Crear un nuevo viaje con múltiples destinos
  async create(createViajeDto: CreateViajeDto): Promise<Viaje> {
    // Verificar que el chofer existe
    const choferExists = await this.choferModel.findById(createViajeDto.chofer);
    if (!choferExists) {
      throw new NotFoundException('Chofer no encontrado');
    }

    // Verificar que no existe un viaje en la misma fecha
    const viajeExistente = await this.viajeModel.findOne({ fecha: createViajeDto.fecha });
    if (viajeExistente) {
      throw new ConflictException('Ya existe un viaje programado para esta fecha');
    }

    // Crear el viaje con destinos inicializados
    const viaje = new this.viajeModel({
      fecha: createViajeDto.fecha,
      capacidad: createViajeDto.capacidad,
      chofer: createViajeDto.chofer,
      destinos: [],
      recaudacionTotal: 0
    });

    return viaje.save();
    }
  

  // Actualizar un viaje
  async update(id: string, updateViajeDto: UpdateViajeDto): Promise<Viaje> {
    const viajeExistente = await this.viajeModel.findById(id);
    if (!viajeExistente) {
      throw new NotFoundException(`Viaje con ID ${id} no encontrado`);
    }

    // ✅ Si cambia el destino, actualizar la tarifa
    if (updateViajeDto.destino && updateViajeDto.destino !== viajeExistente.destino) {
      const nuevaTarifa = await this.tarifasService.obtenerTarifaPorDestino(updateViajeDto.destino);
      updateViajeDto.tarifa = nuevaTarifa;
    }

    const viaje = await this.viajeModel
      .findByIdAndUpdate(id, updateViajeDto, { new: true })
      .populate('chofer')
      .populate('profesores')
      .exec();

    return viaje;
  }

   // ✅ Actualizar un viaje
  async update(id: string, updateViajeDto: UpdateViajeDto): Promise<Viaje> {
    const viaje = await this.viajeModel.findByIdAndUpdate(id, updateViajeDto, { 
      new: true 
    })
    
    .populate('chofer')
    .populate('destinos.profesores')
    .exec();

    if (!viaje) {
      throw new NotFoundException(`Viaje con ID ${id} no encontrado`);
    }

    return viaje;
  }

  // Eliminar profesor
  async delete (id: string): Promise<void> {
    const result = await this.viajeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Viaje con ID ${id} no encontrado`);
    }
  }

  //Agregar un Pasajero
  async agregarPasajero(id: string, agregarPasajeroDto: AgregarPasajeroDto): Promise<Viaje> {
    const viaje = await this.viajeModel.findById(id);
    if (!viaje) {
      throw new NotFoundException(`Viaje con ID ${id} no encontrado`);
    }

    // Verificar que el profesor existe
    const profesorExists = await this.profesorModel.findById(agregarPasajeroDto.profesorId);
    if (!profesorExists) {
      throw new NotFoundException('Profesor no encontrado');
    }
    // Verificar capacidad
    if (viaje.profesores.length >= viaje.capacidad) {
      throw new BadRequestException('El viaje está lleno');
    }

    // Verificar si el profesor ya está en el viaje
    if (viaje.profesores.includes(agregarPasajeroDto.profesorId as any)) {
      throw new BadRequestException('El profesor ya está en este viaje');
    }

    // Agregar profesor al viaje
    viaje.profesores.push(agregarPasajeroDto.profesorId as any);
    
    return viaje.save();
  }
  

} */
