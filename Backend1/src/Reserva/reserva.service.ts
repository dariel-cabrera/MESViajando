import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Reservas } from "src/entity/reservas.entity";
import { Model } from 'mongoose';
import { CreateReservasDto } from "./dto/createReservas.dto";
import { Profesor } from "src/entity/profesor.entity";
import { ViajesService } from "src/Viaje/viajes.service";
import { Viaje } from "src/entity/viajes.entity";
import { TarifasService } from "src/Tarifa/tarifa.service";

@Injectable()
export class ReservasService {
    constructor(
    @InjectModel(Reservas.name) private readonly reservaModel: Model<Reservas>,
    @InjectModel(Profesor.name) private readonly profesorModel: Model<Profesor>,
    @InjectModel(Viaje.name) private readonly viajeModel: Model<Viaje>,
    private readonly viajesService: ViajesService, 
    private readonly tarifaService: TarifasService, 

  ) {}

    // Crear un nuevo viaje con tarifas automáticas por destino
  async create(createReservasDto: CreateReservasDto): Promise<Reservas> {
    
    const profesorExists = await this.profesorModel.findById(createReservasDto.profesor);
        if (!profesorExists) {
          throw new NotFoundException('Profesor no encontrado');
    }

    // Verificar que no existe un viaje en la misma fecha
    const viajeExistente = await this.viajeModel.findOne({ fecha: createReservasDto.fecha });
      if (!viajeExistente) {
        throw new ConflictException('No hay viajes para esta fecha');
      }
    
    const AgregarPasajero = await this.viajesService.agregarPasajero(
       viajeExistente._id.toString(), // ID del viaje
      { profesorId: createReservasDto.profesor } // DTO para agregar pasajero
    )
    if (! AgregarPasajero){
      throw new ConflictException('Error no Se pudo añadir el profesor a la lista');
    }

    const fechaDeterminante = new Date(); 
    const semestre = this.obtenerSemestre(fechaDeterminante);

    const yaViajo = await this.verificarViajeEnSemestre(createReservasDto.profesor, semestre)
    let tarifa;

    if(yaViajo){
        tarifa= this.tarifaService.obtenerPrecioPorDestino(createReservasDto.destino);
        const recaudacion = viajeExistente.recaudacionTotal;
        const recaudacionTotal= recaudacion + tarifa
        const updateViajes = {
          recaudacionTotal :recaudacionTotal
        }'
        this.viajesService.update(viajeExistente._id.toString(), updateViajes)
    }

    // Crear la reserva
    const nuevaReserva = new this.reservaModel({
      ...createReservasDto,
      semestre: semestre,
      viaje: viajeExistente._id,
      importe:tarifa,
    });

    return nuevaReserva.save();
  
  }
   
  

  private obtenerSemestre(fecha: Date): string {
    const mes = fecha.getMonth() + 1;
    if (mes >= 10 || mes <= 3) {
      return 'Primer Semestre';
    } else if (mes >= 4 && mes <= 7) {
      return 'Segundo Semestre';
    } else {
      return 'Primer Semestre';
    }
  }

  
    
    
  
  
      // ✅ Función pública para verificar si un profesor viajó en un semestre específico
    async verificarViajeEnSemestre(profesorId: string, semestre: string): Promise<boolean> {

        // Buscar reservas del profesor en el mismo semestre
        const reservaExistente = await this.reservaModel.findOne({
            profesor: profesorId,
           semestre: semestre,
        });

        return !!reservaExistente;
    }
  

}