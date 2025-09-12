import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  // Obtener todos los usuarios
  async findAll(): Promise<Viaje[]> {
    const users = await this.viajeModel.find().exec();
    return users;
  }

  // Obtener un usuario por ID
  async findOne(id: string): Promise<Viaje> {
    const user = await this.viajeModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

     // Crear un nuevo viaje con tarifas automáticas por destino
  async create(createViajeDto: CreateViajeDto): Promise<Viaje> {

    const choferExists = await this.choferModel.findById(createViajeDto.chofer);
    if (!choferExists) {
      throw new NotFoundException('Chofer no encontrado');
    }

    // Verificar que no existe un viaje en la misma fecha
    const viajeExistente = await this.viajeModel.findOne({ fecha: createViajeDto.fecha });
    if (viajeExistente) {
      throw new ConflictException('Ya existe un viaje programado para esta fecha');
    }
    
    const viajeData = {
      ...createViajeDto,
    };

    const viaje = new this.viajeModel(viajeData);
    return await viaje.save();
  }

 // Actualizar un viaje
  async update(id: string, updateViajeDto: UpdateViajeDto): Promise<Viaje> {
    // Verificar si el viaje existe
    const viajeExistente = await this.viajeModel.findById(id);
    if (!viajeExistente) {
      throw new NotFoundException(`Viaje con ID ${id} no encontrado`);
    }

    // Si se está actualizando el chofer, verificar que existe
    if (updateViajeDto.chofer) {
      const choferExists = await this.choferModel.findById(updateViajeDto.chofer);
      if (!choferExists) {
        throw new NotFoundException('Chofer no encontrado');
      }
    }

    // Si se está actualizando la fecha, verificar que no haya conflictos
    if (updateViajeDto.fecha) {
      const choferId = updateViajeDto.chofer || viajeExistente.chofer;
      
      const viajeMismaFecha = await this.viajeModel.findOne({
        fecha: updateViajeDto.fecha,
        chofer: choferId,
        _id: { $ne: id } // Excluir el viaje actual de la búsqueda
      });

      if (viajeMismaFecha) {
        throw new ConflictException('Ya existe un viaje programado para esta fecha con este chofer');
      }
    }
    const viajeData = {
      ...updateViajeDto,
    };

    const viaje = await this.viajeModel
      .findByIdAndUpdate(id, viajeData, { 
        new: true, // Devuelve el documento actualizado
        runValidators: true // Ejecuta las validaciones del schema
      })
      .populate('chofer', 'nombre licencia')
      .populate('destinos', 'nombre direccion')
      .populate('pasajeros', 'nombre apellido')
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

   //Agregar un profesor a la lista de profesores
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
  
  async countViajesByLicenciaChofer(noLicencia: string): Promise<number> {
  // Buscar el chofer por número de licencia
  const chofer = await this.choferModel.findOne({ NoLicencia: noLicencia }).exec();
  
  if (!chofer) {
    throw new NotFoundException(`Chofer con licencia ${noLicencia} no encontrado`);
  }

  // Contar los viajes del chofer
  const count = await this.viajeModel.countDocuments({ chofer: chofer._id }).exec();
  
  return count;
 }

} 
