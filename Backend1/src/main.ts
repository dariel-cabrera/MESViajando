import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 // Configuración de CORS
  app.enableCors({

  origin: (origin, callback) => {
    const whitelist = [
      envs.app_url_client,
      envs.app_url_api,
    ];
    if (!origin || whitelist.includes(origin.replace(/\/$/, ''))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});

// Configuración de validación global
  app.useGlobalPipes(new ValidationPipe());


  await app.listen(envs.port);
  console.log(`Backend running on port ${envs.port}`)
}
bootstrap();
