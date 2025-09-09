import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class DestinoInfo {
  @Prop({ type: String, required: true })
  ciudad: string;

  @Prop({ type: Number, required: true })
  tarifa: number;

  @Prop([{ type: Types.ObjectId, ref: 'Profesor' }])
  profesores: Types.ObjectId[];
}

@Schema()
export class Viaje extends Document {
  
  @Prop([DestinoInfo]) // ✅ Array de destinos con sus propias tarifas y pasajeros
  destinos: DestinoInfo[];

   @Prop({ type: Number, required: true })
  capacidad: number;
  
  @Prop({ type: Date, required: true })
  fecha: Date;

  @Prop({ type: Types.ObjectId, ref: 'Chofer', required: true })
  chofer: Types.ObjectId;

   @Prop({ type: Number, default: 0 })
  recaudacionTotal?: number;

  // ✅ Opcional: referencia a la entidad Tarifa si quieres mantener relación
  @Prop({ type: Types.ObjectId, ref: 'Tarifa' })
  tarifaRef?: Types.ObjectId;
  
}
export const ViajesSchema = SchemaFactory.createForClass(Viaje);