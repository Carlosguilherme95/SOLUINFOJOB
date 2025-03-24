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
  async atendimentoPost(posto: string, atendimento: string, userId: number) {
    const newAtendimento = new Atendimentos();
    newAtendimento.posto = posto;
    newAtendimento.conteudo_atendimento = atendimento;
    newAtendimento.userId = userId;
    this.atendimentoRepository.save(newAtendimento);
  }
}

export async function serviceAtendimentoDBconect(): Promise<AtendimentoService> {
  const { atendimentoRepository, userRepository } =
    await createDatabaseConnection();
  return new AtendimentoService(atendimentoRepository, userRepository);
}
