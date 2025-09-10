import { Module, Global } from '@nestjs/common';
import { SeedService } from './admin.seeder';
import { ProfesorModule } from 'src/Profesor/profesor.module';



@Global()
@Module({
  imports: [
    ProfesorModule,
    
  ],
  providers: [SeedService],
 
})
export class DatabaseModule {}
