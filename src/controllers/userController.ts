import { Request, Response } from "express";
import { serviceUserDBconect } from "../service/userService";
import { error } from "console";

export class UserController {
  async PostUser(req: Request, res: Response) {
    const { user, password } = req.body;
    console.log(req.body);
    try {
      const userRepository = await serviceUserDBconect();
      const userRepo = await userRepository.createUser(user, password);
      res.status(201).send("user created");
    } catch (Error) {
      console.error(error);
      res.status(404).send("user invalid");
    }
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const userRepository = await serviceUserDBconect();
      const userDatabase = await userRepository.getUser();
      res.status(200).json(userDatabase);
    } catch (Error) {
      res.status(404).send("não encontramos usuários na base de dados");
    }
  }
  async getOneUser(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const userRepository = await serviceUserDBconect();
      const userFind = await userRepository.getOneUser(idNumber);
      res.status(200).json(userFind);
    } catch (Error) {
      res.status(404).send("usuário não encontrado");
    }
  }
  async putUser(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    const { user, password } = req.body;
    try {
      const userRepository = await serviceUserDBconect();
      const userRepo = await userRepository.putUser(idNumber, {
        user,
        password,
      });
      res.status(200).send("usuário modificado com sucesso");
    } catch (Error) {
      res.status(404).send("não foi possível modificar o usuário");
    }
  }
  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const idNumber = parseInt(id);
    try {
      const userRepository = await serviceUserDBconect();
      const userRepo = await userRepository.deleteUser(idNumber);
      res.status(200).send("usuário deletado com sucesso");
    } catch (Error) {
      res.status(404).send("não foi possível deletar o usuário");
    }
  }
  async userLogin(req: Request, res: Response) {
    const { user, password } = req.body;
    try {
      const userRepository = await serviceUserDBconect();

      const { userId, token } = await userRepository.loginValidated(
        user,
        password
      );
      console.log("Login bem-sucedido:", { userId, token }); // Log de sucesso
      res
        .status(200)
        .json({ message: "Login bem-sucedido", token: token, userId: userId });
    } catch (Error) {
      console.error("erro", Error);

      res.status(404).send("não foi possível realizar o login");
    }
  }
}
