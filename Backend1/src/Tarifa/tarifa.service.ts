import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tarifa } from 'src/entity/tarifa.entity';
import { CreateTarifaDto } from './dto/createTarifa.dto';
import { UpdateTarifaDto } from './dto/updateTarifa.dto';


@Injectable()
export class TarifasService {
  constructor(
    @InjectModel(Tarifa.name) private readonly tarifaModel: Model<Tarifa>,
  ) {}

  // ✅ Crear una tarifa usando DTO
  async crearTarifa(createTarifaDto: CreateTarifaDto): Promise<Tarifa> {
    // Verificar si ya existe una tarifa para este destino
    const tarifaExistente = await this.tarifaModel.findOne({ 
      destino: new RegExp(`^${createTarifaDto.destino}$`, 'i') 
    }).exec();

    if (tarifaExistente) {
      throw new ConflictException(`Ya existe una tarifa para el destino: ${createTarifaDto.destino}`);
    }

    const nuevaTarifa = new this.tarifaModel({
      destino: createTarifaDto.destino,
      precio: createTarifaDto.precio
    });

    return nuevaTarifa.save();
  }

  // ✅ Obtener tarifa por destino
  async obtenerTarifaPorDestino(destino: string): Promise<Tarifa> {
    const tarifa = await this.tarifaModel.findOne({ 
      destino: new RegExp(`^${destino}$`, 'i')
    }).exec();

    if (!tarifa) {
      throw new NotFoundException(`No se encontró tarifa para el destino: ${destino}`);
    }

    return tarifa;
  }

  // ✅ Obtener precio por destino (solo el número)
  async obtenerPrecioPorDestino(destino: string): Promise<number> {
    const tarifa = await this.obtenerTarifaPorDestino(destino);
    return tarifa.precio;
  }

  // ✅ Listar todas las tarifas
  async listarTarifas(): Promise<Tarifa[]> {
    return this.tarifaModel.find().sort({ destino: 1 }).exec();
  }

  // ✅ Actualizar tarifa usando DTO
  async actualizarTarifa(id: string, updateTarifaDto: UpdateTarifaDto): Promise<Tarifa> {
    const tarifa = await this.tarifaModel.findById(id).exec();
    
    if (!tarifa) {
      throw new NotFoundException(`Tarifa con ID ${id} no encontrada`);
    }

    // Si se está actualizando el destino, verificar que no exista otro con el mismo nombre
    if (updateTarifaDto.destino && updateTarifaDto.destino !== tarifa.destino) {
      const destinoExistente = await this.tarifaModel.findOne({
        destino: new RegExp(`^${updateTarifaDto.destino}$`, 'i'),
        _id: { $ne: id }
      }).exec();

      if (destinoExistente) {
        throw new ConflictException(`Ya existe una tarifa para el destino: ${updateTarifaDto.destino}`);
      }
    }

    // Actualizar los campos proporcionados
    if (updateTarifaDto.destino) {
      tarifa.destino = updateTarifaDto.destino;
    }
    
    if (updateTarifaDto.precio !== undefined) {
      if (updateTarifaDto.precio < 0) {
        throw new BadRequestException('El precio no puede ser negativo');
      }
      tarifa.precio = updateTarifaDto.precio;
    }

    
    
    return tarifa.save();
  }

  // ✅ Eliminar tarifa
  async eliminarTarifa(id: string): Promise<void> {
    const result = await this.tarifaModel.findByIdAndDelete(id).exec();
    
    if (!result) {
      throw new NotFoundException(`Tarifa con ID ${id} no encontrada`);
    }
  }

  // ✅ Inicializar tarifas por defecto (según tu documento)
  async inicializarTarifasPorDefecto(): Promise<void> {
    const tarifasPorDefecto = [
      { destino: 'Matanzas', precio: 15.00 },
      { destino: 'Cienfuegos', precio: 34.35 },
      { destino: 'Santa Clara', precio: 36.20 },
      { destino: 'Sancti Spíritus', precio: 46.70 },
      { destino: 'Ciego de Ávila', precio: 56.70 },
      { destino: 'Camaguey', precio: 71.50 },
      { destino: 'Las Tunas', precio: 88.10 },
      { destino: 'Holguín', precio: 98.40 },
      { destino: 'Bayamo', precio: 101.70 },
      { destino: 'Santiago de Cuba', precio: 115.30 },
      { destino: 'Guantánamo', precio: 122.00 }
    ];

    for (const tarifaData of tarifasPorDefecto) {
      try {
        await this.crearTarifa(tarifaData);
      } catch (error) {
        // Si ya existe, la ignoramos
        if (error instanceof ConflictException) {
          console.log(`Tarifa para ${tarifaData.destino} ya existe`);
        } else {
          throw error;
        }
      }
    }
  }

  // ✅ Buscar tarifas por término de búsqueda
  async buscarTarifas(termino: string): Promise<Tarifa[]> {
    return this.tarifaModel.find({
      destino: new RegExp(termino, 'i')
    }).sort({ destino: 1 }).exec();
  }
}