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
  async deleteAtendimento(id_atendimento: number) {
    const atendimentoRepo = await this.atendimentoRepository.findOne({
      where: {
        id_atendimento: id_atendimento,
      },
    });
    console.log(atendimentoRepo);
    if (!atendimentoRepo) {
      throw new Error("o atendimento não foi encontrado");
    }
    await this.atendimentoRepository.delete(id_atendimento);
    return;
  }
  async putAtendimento(
    id_atendimento: number,
    data_atendimento: { posto: string; conteudo_atendimento: string }
  ) {
    const atendimentoRepo = await this.atendimentoRepository.findOne({
      where: {
        id_atendimento: id_atendimento,
      },
    });
    if (atendimentoRepo) {
      atendimentoRepo.posto = data_atendimento.posto;
      atendimentoRepo.conteudo_atendimento =
        data_atendimento.conteudo_atendimento;
      await this.atendimentoRepository.save(atendimentoRepo);
    } else {
      throw new Error("não foi possível modificar o atendimento");
    }
    return console.log("atendimento modificado com sucesso");
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
