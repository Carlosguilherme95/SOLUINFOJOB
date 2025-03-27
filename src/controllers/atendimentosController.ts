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
  async atendimentoDelete(req: Request, res: Response) {
    const { id_atendimento } = req.params;
    const idAtendimentoNum = parseInt(id_atendimento);
    console.log(idAtendimentoNum);
    try {
      const atendimentoRepository = await serviceAtendimentoDBconect();
      const atendimentoRepo = await atendimentoRepository.deleteAtendimento(
        idAtendimentoNum
      );
      res.status(200).send("atendimento deletado com sucesso");
    } catch (e) {
      res.status(404).send("não foi possível deletar o usuário");
    }
  }
  async atendimentoPut(req: Request, res: Response) {
    const { id_atendimento } = req.params;
    const idNumber = parseInt(id_atendimento);
    const { posto, conteudo_atendimento } = req.body;
    try {
      const atendimentoRepository = await serviceAtendimentoDBconect();
      const atendimentoRepo = await atendimentoRepository.putAtendimento(
        idNumber,
        { posto, conteudo_atendimento }
      );
      res.status(200).send("atendimento modificado com sucesso");
    } catch (e) {
      res.status(404).send("não foi possível modificar o atendimento");
    }
  }
}
