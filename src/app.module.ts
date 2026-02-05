import { Module } from '@nestjs/common';
import { VagasController } from './vagas/vagas.controller';
import { VagasService } from './vagas/vagas.service';
import { VagasRepository } from './vagas/vagas.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [VagasController],
  providers: [VagasService, VagasRepository],
  imports: [AuthModule],
})
export class AppModule {}
