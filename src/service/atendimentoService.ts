import { Repository } from "typeorm";
import { createDatabaseConnection } from "../dbconnectService";
import { Atendimentos } from "../Entity/atendimentos";
import { User } from "../Entity/user";
import jwt from "jsonwebtoken";
import { SECRET } from "./userService";

export class AtendimentoService {
  constructor(
    private atendimentoRepository: Repository<Atendimentos>,
    private userRepository: Repository<User>
  ) {
    this.atendimentoRepository = atendimentoRepository;
    this.userRepository = userRepository;
  }
  async atendimento_Post(posto: string, atendimento: string, userId: number) {
    const newAtendimento = new Atendimentos();
    newAtendimento.posto = posto;
    newAtendimento.conteudo_atendimento = atendimento;
    newAtendimento.userId = userId;
    this.atendimentoRepository.save(newAtendimento);
  }
  async atendimentoCount() {
    return this.atendimentoRepository
      .createQueryBuilder("atendimento")
      .select("atendimento.posto")
      .addSelect("COUNT(*)", "count")
      .groupBy("atendimento.posto")
      .getRawMany();
  }
}
export function getUserIdFromToken(token: string): number | null {
  try {
    const decoded: any = jwt.verify(token, SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}
export async function serviceAtendimentoDBconect(): Promise<AtendimentoService> {
  const { atendimentoRepository, userRepository } =
    await createDatabaseConnection();
  return new AtendimentoService(atendimentoRepository, userRepository);
}
