import { Injectable, NotFoundException,HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entity/usuarios.entity';
import * as bcryptjs from 'bcryptjs';
import { isEmail } from 'class-validator';
import { UpdateUserDto } from './dto/user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, 
  ) {}

  /*** 🚀 FUNCIONES DE USUARIO 🚀 ***/

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  // Obtener un usuario por ID
  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Crear un nuevo usuario
  async create(userData: Partial<User>): Promise<User> {
    const { user_name,nombre, rol, apellido, email, password, ci } = userData;

    // Validar campos obligatorios
    if (!nombre || !user_name || !apellido || !email || !password || !ci || ! rol) {
        throw new HttpException('Faltan campos obligatorios', HttpStatus.BAD_REQUEST);
    }

    // 2. Validar formatos
    if (!isEmail(email)) {
      throw new HttpException('Email inválido', HttpStatus.BAD_REQUEST);
    }
    if (!/^\d{11}$/.test(ci)) {
      throw new HttpException('CI inválido', HttpStatus.BAD_REQUEST);
    }
    if (password.length < 8) {
      throw new HttpException('La contraseña debe tener al menos 8 caracteres', HttpStatus.BAD_REQUEST);
    }

    // Verificar duplicados en una sola consulta
    const existingUser = await this.userModel.findOne({
        $or: [
            { user_name },
            { ci },
            { email }
        ]
    });

    if (existingUser) {
        if (existingUser.user_name === user_name) {
            throw new HttpException('El nombre de usuario ya está registrado', HttpStatus.CONFLICT);
        }
        if (existingUser.ci === ci) {
            throw new HttpException('El CI ya está registrado', HttpStatus.CONFLICT);
        }
        if (existingUser.email === email) {
            throw new HttpException('El email ya está registrado', HttpStatus.CONFLICT);
        }
    }

    // Encriptar contraseña y guardar
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new this.userModel({
        user_name,
        nombre,
        rol,
        apellido,
        ci,
        email,
        password: hashedPassword,
        created_at: new Date()
    });
    
    return newUser.save();
}


    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Buscamos el usuario existente
    const user = await this.userModel.findById(id).exec();
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Actualizamos solo los campos que vienen en el DTO
    if (updateUserDto.user_name) user.user_name = updateUserDto.user_name;
    if (updateUserDto.name) user.nombre = updateUserDto.name;
    if (updateUserDto.rol) user.rol = updateUserDto.rol;
    if (updateUserDto.lastname) user.apellido = updateUserDto.lastname;
    if (updateUserDto.email) user.email = updateUserDto.email;
    
    // Actualizamos password solo si se proporciona
    if (updateUserDto.password) {
      console.log(updateUserDto.password)
      // Encriptar contraseña y guardar
    const salt = await bcryptjs.genSalt(10);
    const  hashedPassword  = await bcryptjs.hash( updateUserDto.password, salt);
      user.password = hashedPassword;
    }

    return user.save();
  }
  

  // Eliminar un usuario
  async delete(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('User not found');
  }

  
}