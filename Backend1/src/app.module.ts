import { Module } from '@nestjs/common';
import { envs } from './config';
import { TarifaModule } from './Tarifa/tarifa.module';
import { ProfesorModule } from './Profesor/profesor.module';
import { ChoferModule } from './Chofer/chofer.module';
import { SeedService } from './config/admin.seeder';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './Usuarios/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Autenticacion/auth.module';


@Module({
  imports: [
  DatabaseModule,
  TarifaModule,
  ProfesorModule,
  ChoferModule,
  UserModule,
  AuthModule,
  MongooseModule.forRoot(envs.mongo_uri)
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule {}
