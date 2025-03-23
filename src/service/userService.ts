import { User } from "../Entity/user";
import { Repository } from "typeorm";
import { createDatabaseConnection } from "../dbconnectService";
import * as bcrypt from "bcrypt";

export class UserService {
  constructor(private userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async createUser(user: string, password: string) {
    const user_new = new User();
    user_new.user = user;
    user_new.password = password;
    const userAdd = this.userRepository.save(user_new);
    return `Usuário: ${userAdd} criado com sucesso`;
  }
  async getUser() {
    return this.userRepository.find();
  }
  async getOneUser(id: number) {
    const findOneUser = this.userRepository.findOne({
      where: { id: id },
    });
    return findOneUser;
  }
  async putUser(id: number, dataUser: { user: string; password: string }) {
    const userFind = await this.userRepository.findOne({
      where: { id },
    });
    if (!userFind) {
      throw new Error("usuário não encontrado na base de dados");
    }
    userFind.user = dataUser.user;
    userFind.password = dataUser.password;
    this.userRepository.save(userFind);
    return `usuário modificado com sucesso ${userFind.user}`;
  }
  async deleteUser(id: number) {
    const userFind = await this.userRepository.findOne({
      where: { id },
    });
    if (!userFind) {
      throw new Error("usuário não foi encontrado");
    }
    await this.userRepository.delete(id);
    return `usuário deletado com sucesso`;
  }
  async loginValidated(user: string, password: string) {
    const loginFind = await this.userRepository.findOne({
      where: { user },
    });
    if (!loginFind) {
      throw new Error(`login inválido`);
    }
    const passwordCheck = await bcrypt.compare(password, loginFind.password);
    if (!passwordCheck) {
      throw new Error("password inválido");
    }
    return { userId: loginFind.id };
  }
}
export async function serviceUserDBconect(): Promise<UserService> {
  const { userRepository } = await createDatabaseConnection();
  return new UserService(userRepository);
}
