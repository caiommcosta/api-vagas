import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarVagaDto } from './dto/create-vagas.dto';
import { VagasRepository } from './vagas.repository';
import { Vaga } from './entity/vaga.entity';

@Injectable()
export class VagasService {
  constructor(private readonly repository: VagasRepository) {}
  idCounter = 1;

  async create(vaga: CriarVagaDto): Promise<Vaga> {
    const novaVaga = new Vaga();
    novaVaga.id = this.idCounter++;
    novaVaga.titulo = vaga.titulo;
    novaVaga.descricao = vaga.descricao;
    novaVaga.salario = vaga.salario;

    return await this.repository.save(novaVaga);
  }

  async listAll(): Promise<Vaga[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Vaga> {
    const vaga = await this.repository.findById(id);
    if (!vaga) {
      throw new NotFoundException(`Vaga com id ${id} não encontrada`);
    }
    return vaga;
  }
}
