
import { Injectable, NotFoundException } from '@nestjs/common';
import { Profesor } from 'src/entity/profesor.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectModel(Profesor.name) private readonly profesorModel: Model<Profesor>,
  ) {}

  // Crear un nuevo profesor
  async createProfesor(createProfesorDto: CreateProfesorDto): Promise<Profesor> {
    const profesor = new this.profesorModel({
      ...createProfesorDto,
      tipo: 'Profesor', // Importante para discriminadores
    });
    return profesor.save();
  }

  // Encontrar todos los profesores
  async findAllProfesores(): Promise<Profesor[]> {
    return this.profesorModel.find().exec();
  }

  // Encontrar profesor por ID
  async findProfesorById(id: string): Promise<Profesor> {
    const profesor = await this.profesorModel.findById(id).exec();
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
    return profesor;
  }

  // Encontrar profesor por CI
  async findProfesorByCi(ci: string): Promise<Profesor> {
    const profesor = await this.profesorModel.findOne({ ci }).exec();
    if (!profesor) {
      throw new NotFoundException(`Profesor con CI ${ci} no encontrado`);
    }
    return profesor;
  }

  // Actualizar profesor
  async updateProfesor(id: string, updateProfesorDto: UpdateProfesorDto): Promise<Profesor> {
    const profesor = await this.profesorModel
      .findByIdAndUpdate(id, updateProfesorDto, { new: true })
      .exec();
    
    if (!profesor) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
    return profesor;
  }

  // Eliminar profesor
  async deleteProfesor(id: string): Promise<void> {
    const result = await this.profesorModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Profesor con ID ${id} no encontrado`);
    }
  }

  // Agregar viaje a profesor
  async agregarViajeAProfesor(profesorId: string, viajeId: string): Promise<Profesor> {
    return this.profesorModel.findByIdAndUpdate(
      profesorId,
      { $addToSet: { viajes: new Types.ObjectId(viajeId) } },
      { new: true }
    ).exec();
  }

  // Obtener viajes de un profesor
  async obtenerViajesDeProfesor(profesorId: string): Promise<Profesor> {
    return this.profesorModel
      .findById(profesorId)
      .populate('viajes') // Popula los datos de los viajes
      .exec();
  }
}
