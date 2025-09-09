import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChoferService } from './chofer.service';
import { ChoferController } from './chofer.controller';
import { Chofer, ChoferSchema } from 'src/entity/chofer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chofer.name, schema: ChoferSchema }
    ]),
  ],
  controllers: [ChoferController],
  providers: [ChoferService],
  exports: [ChoferService],
})
export class ChoferModule {}