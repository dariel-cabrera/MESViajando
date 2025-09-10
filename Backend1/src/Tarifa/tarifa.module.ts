import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TarifasService } from './tarifa.service';
import { TarifaController } from './tarifa.controller';
import { Tarifa,TarifasSchema } from 'src/entity/tarifa.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tarifa.name, schema: TarifasSchema }
    ]),
  ],
  controllers: [TarifaController],
  providers: [TarifasService],
  exports: [TarifasService],
})
export class TarifaModule {}