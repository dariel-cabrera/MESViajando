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

    // Crear una Reservas
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
        }
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

  // Funcion para saber en que semestre se esta haciendo la reserva
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

    // Buscar un pasajero en un viaje determinado
    async buscarProfesorCIFecha(ci: string, fecha:Date):Promise<Reservas>{
      const profesor = await this.profesorModel.findOne({
        ci:ci
      })

      if (!profesor) {
        throw new NotFoundException('Profesor no encontrado');
      }

      const ReservaEncontrada = await this.reservaModel.findOne({
        profesor:profesor._id,
        fecha:fecha,
      })
       
      if(!ReservaEncontrada){
          throw new NotFoundException('En esa Fecha no hay Rerservas realizadas por ese Profesor');
      }

      return ReservaEncontrada;
    }

     // Contar la cantidad de Viajes realizados por un profesor
     async countViajeProfesor (ci: string): Promise<number> {
     const profesor = await this.profesorModel.findOne({
        ci:ci
      })

      if (!profesor) {
        throw new NotFoundException('Profesor no encontrado');
      }

    // Contar los viajes del profespr
    const count = await this.reservaModel.countDocuments({ profesor: profesor._id }).exec();
    return count;
 }

    // Funcion para Contar la cantidad de Viajes realizados en un Semestre 
    async contarViajesSemestreCI(ci:string,semestre:string):Promise<Number> {
      const profesor = await this.profesorModel.findOne({
        ci:ci
      })
      if (!profesor) {
        throw new NotFoundException('Profesor no encontrado');
      }

      const count = await this.reservaModel.countDocuments({
        profesor:profesor._id,
        semestre:semestre,
      })
      return count;
    }
    
    // Lista de Destinos de un Viaje segun la Fecha
    async ListaDestinosViaje(fecha: Date): Promise<any[]> {
      const viaje = await this.viajeModel.findOne({
        fecha: fecha 
        })
        .select('destinos')
        .exec();

      if (!viaje) {
        throw new NotFoundException('No hay viajes en la fecha especificada');
      }

      return viaje.destinos || [];
    }

     // Lista de Pasajeros de un Viaje por Destino
    async ListaPasajerosDestinos(idViaje:string, destino:string): Promise<any[]> {
       
      const reservas = await this.reservaModel.find({
        viajes: idViaje, 
        destino: destino 
      })
      .populate('profesor', 'nombre apellido ci') 
      .exec();

      if (reservas.length === 0) {
        throw new NotFoundException('No hay profesores para ese destino en el viaje especificado');
      }
      const profesores = reservas.flatMap(reserva => reserva.profesor);
      return profesores;
    }
    
    // Lista de profesores que viajan por primera vez
    async ListaProfesoresPrimeraVez(semestre:string):Promise<any[]>{
       
        const reservas = await this.reservaModel.find({
        semestre:semestre,
        importe: 0, 
      })
      .populate('profesor', 'nombre apellido ci') 
      .lean()
      .exec();
      if(!reservas){
        throw new NotFoundException('No hay profesores que viajan por primera vez');
      }

      const profesores = reservas.flatMap(reserva => reserva.profesor);
      return profesores;
    }

     /* // Cantidad de profesores por facultad que viajan
     async contarProfesoresporFacultad(idViaje:string,facultad:string):Promise<Number> {
     
      const reservas = await this.reservaModel.find({
        viajes: idViaje, 
      })
      .populate('profesor', 'nombre apellido ci facultad') 
      .exec();
      
      if(!reservas){
        throw new NotFoundException('No hay profesores en este viaje');
      }
    } */

    // Datos de los profesores que han viajado en el Semestre
    async ProfesoresViajadoPorSemestre(semestre: string): Promise<any[]> {
      const reservas = await this.reservaModel.find({
        semestre: semestre,
      })
      .populate('profesor', 'nombre apellido ci') 
      .exec();

      if (!reservas || reservas.length === 0) {
        throw new NotFoundException('No hay profesores que hayan viajado en este semestre');
      }

      const profesores = reservas.flatMap(reserva => 
        Array.isArray(reserva.profesor) ? reserva.profesor : [reserva.profesor]
      ).filter(profesor => profesor && profesor._id);

      // Eliminar duplicados por ID
      const profesoresUnicos = profesores.reduce((unique, profesor) => {
        const exists = unique.find(p => 
          p._id.toString() === profesor._id.toString()
        );
        return exists ? unique : [...unique, profesor];
      }, [] as any[]);

      return profesoresUnicos;
    }
  

}