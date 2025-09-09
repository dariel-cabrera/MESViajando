import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { Double } from 'typeorm';

@Schema({ discriminatorKey: 'tipo' })
export class Tarifa extends Document {

  @Prop({ type: String, required: true })
  destino: string;
  @Prop({ type: Number, required: true })
  precio: number;
  
}

// ✅ Se exporta con un nombre coherente
export const TarifasSchema = SchemaFactory.createForClass(Tarifa);