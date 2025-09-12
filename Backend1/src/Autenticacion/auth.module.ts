import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/entity/usuarios.entity';


@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'token',
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService], // Se eliminó JwtAuthGuard como proveedor innecesario.
  exports: [AuthService, JwtModule], // Asegúrate de exportar JwtModule para que otros módulos tengan acceso.
})
export class AuthModule {}
