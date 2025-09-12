import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class Viaje extends Document {
  @Prop({ type: String, required: true }) // ✅ Array de destinos con sus propias tarifas y pasajeros
  nombre: string;

   @Prop({ type: [Types.ObjectId], required: true, ref: 'Destino' })
  destinos: Types.ObjectId[];

   @Prop({ type: Number, required: true })
  capacidad: number;
  
  @Prop({ type: Date, required: true })
  fecha: Date;

  @Prop({ type: Types.ObjectId, ref: 'Chofer', required: true })
  chofer: Types.ObjectId;

   @Prop({ type: Number, default: 0 })
  recaudacionTotal?: number;

  // Campo para pasajeros (profesores)
  @Prop({ type: [Types.ObjectId], ref: 'Profesor', default: [] })
  profesores: Types.ObjectId[];
  
}
export const ViajesSchema = SchemaFactory.createForClass(Viaje);