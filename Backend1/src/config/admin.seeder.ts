import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { Profesor } from 'src/entity/profesor.entity';


@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Profesor.name) private userModel: Model<Profesor>,
    
  ) {}

  async onApplicationBootstrap() {
    console.log('🚀 Ejecutando operación de seed...');
    await this.seedAdminUser();
  }

  async seedAdminUser() {
    try {
      const existingUser = await this.userModel.findOne({ email: 'admin@jsonapi.com' });
      if (existingUser) {
        console.log('⚠️ El usuario administrador ya existe.');
        return;
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash('secret', salt);

      const user = new this.userModel({
        usuario: 'Decano',
        name: 'Admin',
        apellido: 'Admin',
        ci: '0000000000',
        contrasena: hashedPassword,
      });

      await user.save();
      console.log('✅ Usuario administrador creado con éxito.');
    } catch (error) {
      console.error('❌ Error creando el usuario administrador:', error);
    }
  }
}