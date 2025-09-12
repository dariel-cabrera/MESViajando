import { Module, Global } from '@nestjs/common';
import { SeedService } from './admin.seeder';
import { UserModule } from 'src/Usuarios/user.module';

@Global()
@Module({
  imports: [
    UserModule,
    
  ],
  providers: [SeedService],
 
})
export class DatabaseModule {}
