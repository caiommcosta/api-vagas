import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CriarVagaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  descricao: string;

  @IsNumber()
  @IsPositive()
  salario: number;
}
