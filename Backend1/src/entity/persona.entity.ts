import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ discriminatorKey: 'tipo' })
export class Persona extends Document {

  @Prop({ type: String, required: true })
  nombre: string;
  @Prop({ type: String, required: true })
  apellido: string;
  @Prop({ type: String, required: true })
  ci: string;
}

// ✅ Se exporta con un nombre coherente
export const PersonaSchema = SchemaFactory.createForClass(Persona);
 