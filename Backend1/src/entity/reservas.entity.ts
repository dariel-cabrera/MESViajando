import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Double } from 'typeorm';
import { Types } from 'mongoose';

@Schema({ discriminatorKey: 'tipo' })
export class Reservas  extends Document {

  @Prop([{ type: Types.ObjectId, ref: 'Viaje' }])
  viajes: Types.ObjectId[]

  @Prop([{ type: Types.ObjectId, ref: 'Profesor' }])
  profesor: Types.ObjectId[]
  
}

// ✅ Se exporta con un nombre coherente
export const ReservasSchema = SchemaFactory.createForClass(Reservas);