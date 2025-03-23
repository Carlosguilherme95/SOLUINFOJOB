import { Request, Response } from "express";
import { serviceAtendimentoDBconect } from "../service/atendimentoService";

export class AtendimentoController {
  async atendimentoPost(req: Request, res: Response) {
    const { posto, atendimento, userId } = req.body;
    try {
      const atendimentoRepository = await serviceAtendimentoDBconect();
      const atendimentoRepo = await atendimentoRepository.atendimentosPost(
        posto,
        atendimento,
        userId
      );
      res.status(201).send("atendimento registrado com sucesso");
    } catch (error) {
      console.error("não foi possível registrar o atendimento", error);
      res.status(404).send("não foi possível registrar seu atendimento");
    }
  }
}
