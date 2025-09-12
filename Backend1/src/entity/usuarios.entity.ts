import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Persona } from './persona.entity';


@Schema({  versionKey: false })  // ✅ Agrega createdAt y updatedAt automáticamente
export class User extends Persona {
  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  rol: string;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

