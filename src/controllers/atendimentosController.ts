import { Request, Response } from "express";
import { serviceAtendimentoDBconect } from "../service/atendimentoService";

export class AtendimentoController {
  async atendimentoPost(req: Request, res: Response) {
    const { posto, atendimento, userId } = req.body;

    const idNum = parseInt(userId, 10);

    try {
      const atendimentoRepository = await serviceAtendimentoDBconect();
      const atendimentoRepo = atendimentoRepository.atendimento_Post(
        posto,
        atendimento,
        idNum
      );
      if (!atendimentoRepo) {
        res.status(404).send("não foi possível criar o atendimento");
      }
      res.status(201).send("atendimento criado com sucesso");
    } catch (e) {
      res.status(500).send("erro inesperado");
    }
  }
  async atendimentoGetall(req: Request, res: Response) {
    try {
      const atendimentoRepository = await serviceAtendimentoDBconect();
      const atendimentoRepo = await atendimentoRepository.atendimentoCount();
      res.status(200).json(atendimentoRepo);
    } catch (e) {
      res.status(404).send("não encontramos atendimentos");
    }
  }
}
