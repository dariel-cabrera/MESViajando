import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User , UserSchema} from 'src/entity/usuarios.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema:  UserSchema },
    ]),
    
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, MongooseModule], // Exportamos para usarlo en otros módulos
})
export class UserModule {}
