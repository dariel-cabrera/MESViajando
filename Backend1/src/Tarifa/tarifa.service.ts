// servicios/tarifas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tarifa } from 'src/entity/tarifa.entity';

@Injectable()
export class TarifasService {
  constructor(
    @InjectModel(Tarifa.name) private readonly tarifaModel: Model<Tarifa>,
  ) {}


  // Buscar una Tarifa segun el Destino 
  async obtenerTarifaPorDestino(destino: string): Promise<number> {
    const tarifa = await this.tarifaModel.findOne({ 
      destino: new RegExp(destino, 'i'), 
    }).exec();

    if (!tarifa) {
      throw new NotFoundException(`No se encontró tarifa para el destino: ${destino}`);
    }

    return tarifa.precio;
  }
 
   //Crear una Tarifa 
  async crearTarifa(destino: string, monto: number): Promise<Tarifa> {
    const tarifaExistente = await this.tarifaModel.findOne({ 
      destino: new RegExp(destino, 'i') 
    }).exec();

    if (tarifaExistente) {
      // Actualizar tarifa existente
      tarifaExistente.precio = monto;
      return tarifaExistente.save();
    }

    const nuevaTarifa = new this.tarifaModel({ destino, monto });
    return nuevaTarifa.save();
  }

  async listarTarifas(): Promise<Tarifa[]> {
    return this.tarifaModel.find().exec();
  }
}