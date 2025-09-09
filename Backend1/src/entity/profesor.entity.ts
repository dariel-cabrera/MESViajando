import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Persona } from './persona.entity';
import { Types } from 'mongoose';


@Schema({ versionKey: false })
export class Profesor extends Persona {
  @Prop({ type: String, required: true })
  facultad: string;
  @Prop({ type: Array, required: true })
  asignaturas: string[];

  @Prop([{ type: Types.ObjectId, ref: 'Viaje' }])
  viajes: Types.ObjectId[]

}

// ✅ Se exporta con un nombre coherente
export const ProfesorSchema = SchemaFactory.createForClass(Profesor);
 