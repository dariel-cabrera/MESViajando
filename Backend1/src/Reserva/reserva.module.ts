import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservasService } from './reserva.service';
import { Reservas,ReservasSchema } from 'src/entity/reservas.entity';
import { ProfesorModule } from 'src/Profesor/profesor.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservas.name, schema: ReservasSchema}
    ]),
    ProfesorModule,

  ],
  controllers: [],
  providers: [ReservasService],
  exports: [MongooseModule],
})
export class ReservasModule {}