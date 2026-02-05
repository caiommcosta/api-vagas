import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VagasService } from './vagas.service';
import { CriarVagaDto } from './dto/create-vagas.dto';
import { Vaga } from './entity/vaga.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('vagas')
export class VagasController {
  constructor(private readonly vagasService: VagasService) {}

  @Get()
  async listAll() {
    return await this.vagasService.listAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Vaga> {
    return await this.vagasService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: CriarVagaDto): Promise<Vaga> {
    return await this.vagasService.create(data);
  }
}
