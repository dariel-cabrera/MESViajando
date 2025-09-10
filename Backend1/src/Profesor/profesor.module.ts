import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { Profesor,ProfesorSchema } from 'src/entity/profesor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profesor.name, schema: ProfesorSchema }
    ]),
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
  exports: [MongooseModule],
})
export class ProfesorModule {}