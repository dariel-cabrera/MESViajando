import { Injectable, NotFoundException } from '@nestjs/common';
import { Chofer } from 'src/entity/chofer.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateChoferDto } from './dto/create-chofer.dto';
import { UpdateChoferDto } from './dto/update-chofer.dto';

@Injectable()
export class ChoferService {
  constructor(
    @InjectModel(Chofer.name) private readonly choferModel: Model<Chofer>,
  ) {}

  // Crear un nuevo chofer
  async createChofer(createChoferDto: CreateChoferDto): Promise<Chofer> {
    const chofer = new this.choferModel({
      ...createChoferDto,
      tipo: 'Chofer', 
    });
    return chofer.save();
  }

  // Encontrar todos los choferes
  async findAllChoferes(): Promise<Chofer[]> {
    return this.choferModel.find().exec();
  }

  // Encontrar chofer por ID
  async findChoferById(id: string): Promise<Chofer> {
    const chofer = await this.choferModel.findById(id).exec();
    if (!chofer) {
      throw new NotFoundException(`Chofer con ID ${id} no encontrado`); // ✅ Mensaje corregido
    }
    return chofer;
  }

  // Encontrar chofer por CI
  async findChoferByCi(ci: string): Promise<Chofer> {
    const chofer = await this.choferModel.findOne({ ci }).exec();
    if (!chofer) {
      throw new NotFoundException(`Chofer con CI ${ci} no encontrado`);
    }
    return chofer;
  }

  // Actualizar chofer
  async updateChofer(id: string, updateChoferDto: UpdateChoferDto): Promise<Chofer> { // ✅ Tipo corregido
    const chofer = await this.choferModel
      .findByIdAndUpdate(id, updateChoferDto, { new: true })
      .exec();
    
    if (!chofer) {
      throw new NotFoundException(`Chofer con ID ${id} no encontrado`);
    }
    return chofer;
  }

  // Eliminar chofer
  async deleteChofer(id: string): Promise<void> {
    const result = await this.choferModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Chofer con ID ${id} no encontrado`);
    }
  }

  // Agregar viaje a chofer
  async agregarViajeAChofer(choferId: string, viajeId: string): Promise<Chofer> { // ✅ Tipo corregido
    return this.choferModel.findByIdAndUpdate(
      choferId,
      { $addToSet: { viajes: new Types.ObjectId(viajeId) } },
      { new: true }
    ).exec();
  }

  // Obtener viajes de un chofer
  async obtenerViajesDeChofer(choferId: string): Promise<Chofer> {
    return this.choferModel
      .findById(choferId)
      .populate('viajes') // Popula los datos de los viajes
      .exec();
  }
}