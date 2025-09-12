import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as randomToken from 'random-token';

import { User,UserSchema } from 'src/entity/usuarios.entity';
@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    
  ) {
    // Configuración del transportador de nodemailer
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAILTRAP_HOST'),
      port: this.configService.get<number>('MAILTRAP_PORT'),
      auth: {
        user: this.configService.get<string>('MAILTRAP_USER'),
        pass: this.configService.get<string>('MAILTRAP_PASSWORD'),
      },
    });
  }

  // 🔐 Login de usuario
  async login(user_name: string, password: string) {
    
    const user = await this.userModel.findOne({ user_name });
    
    if (!user) {
      throw new HttpException('Las credenciales no son válidas', HttpStatus.UNAUTHORIZED);
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }
    
    // Generar token JWT
    const payload = { 
      id: user._id,
      user: user.user_name,
      rol: user.rol
      
      };
    const token = this.jwtService.sign(payload);

    return {
      id:user._id,
      user_name:user.user_name,
      role:user.rol,
      token_type: 'Bearer',
      expires_in: '1h',
      access_token: token,
      refresh_token: token,
    };
  }
 
  // 👤 Obtener perfil del usuario autenticado
  
  async getProfile(userPayload: any) {
    const user = await this.userModel.findById(userPayload).select('name lastname user_name');
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      name: user.nombre,
      lastName: user.apellido,
      user_name: user.user_name,
    };
  } 

  
}
