import { Repository } from "typeorm";
import { createDatabaseConnection } from "../dbconnectService";
import { Atendimentos } from "../Entity/atendimentos";
import { User } from "../Entity/user";
export class AtendimentoService {
  constructor(
    private atendimentoRepository: Repository<Atendimentos>,
    private userRepository: Repository<User>
  ) {
    this.atendimentoRepository = atendimentoRepository;
    this.userRepository = userRepository;
  }

  async atendimentosPost(posto: string, atendimento: string, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const newAtendimento = new Atendimentos();
    newAtendimento.posto = posto;
    newAtendimento.conteudo_atendimento = atendimento;
    newAtendimento.userId = userId;
    const atendimentoAdicionado = await this.atendimentoRepository.save(
      newAtendimento
    );
    return `atendimento registrado com sucesso ${atendimentoAdicionado}`;
  }
}
export async function serviceAtendimentoDBconect(): Promise<AtendimentoService> {
  const { atendimentoRepository, userRepository } =
    await createDatabaseConnection();
  return new AtendimentoService(atendimentoRepository, userRepository);
}
