import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Persona } from './persona.entity';
import { Types } from 'mongoose';


@Schema({ versionKey: false })
export class Chofer extends Persona  {
  @Prop({ type: String, required: true })
  NoLicencia: string;

  @Prop([{ type: Types.ObjectId, ref: 'Viaje' }])
  viajes: Types.ObjectId[]

}

// ✅ Se exporta con un nombre coherente
export const ChoferSchema = SchemaFactory.createForClass(Chofer);
 