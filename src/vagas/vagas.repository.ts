import { Injectable } from '@nestjs/common';
import { Vaga } from './entity/vaga.entity';

@Injectable()
export class VagasRepository {
  private baseDeDados: Vaga[] = [];

  async save(vaga: Vaga): Promise<Vaga> {
    this.baseDeDados.push(vaga);
    return await Promise.resolve(vaga);
  }

  async findAll(): Promise<Vaga[]> {
    return await Promise.resolve(this.baseDeDados);
  }

  async findById(id: number): Promise<Vaga | undefined> {
    const vaga = this.baseDeDados.find((v) => v.id === id);
    return await Promise.resolve(vaga);
  }
}
