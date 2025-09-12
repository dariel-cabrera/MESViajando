import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ discriminatorKey: 'tipo' })
export class Reservas  extends Document {

  @Prop([{ type: Types.ObjectId, ref: 'Viaje' }])
  viajes: Types.ObjectId[]

  @Prop([{ type: Types.ObjectId, ref: 'Profesor' }])
  profesor: Types.ObjectId[]

  @Prop({ type: String, required: true })
  destino: string;

  @Prop({ type: String, required: true })
  semestre: string;

  @Prop({ type: Date, required: true })
  fecha: Date;

  @Prop({ type: Number, required: true,default: 0 })
  importe: number;

  
}

// ✅ Se exporta con un nombre coherente
export const ReservasSchema = SchemaFactory.createForClass(Reservas);