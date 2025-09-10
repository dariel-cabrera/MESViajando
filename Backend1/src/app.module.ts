import { Module } from '@nestjs/common';
import { envs } from './config';
import { TarifaModule } from './Tarifa/tarifa.module';
import { ProfesorModule } from './Profesor/profesor.module';
import { ChoferModule } from './Chofer/chofer.module';
import { SeedService } from './config/admin.seeder';
import { DatabaseModule } from './config/database.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
  DatabaseModule,
  TarifaModule,
  ProfesorModule,
  ChoferModule,
  MongooseModule.forRoot(envs.mongo_uri)
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule {}
