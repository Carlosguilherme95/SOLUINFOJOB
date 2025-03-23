import { DataSource } from "typeorm";
import { User } from "../src/Entity/user";
import { Atendimentos } from "../src/Entity/atendimentos";

export let dataSource: DataSource | null = null;

export async function createDatabaseConnection() {
  if (!dataSource || !dataSource.isInitialized) {
    dataSource = new DataSource({
      type: "mysql",
      host: "82.25.74.94",
      port: 3306,
      username: "root",
      password: "91016765Carlos@",
      database: "ATENDIMENTOSSOLUINFO",
      synchronize: false,
      logging: false,
      entities: [User, Atendimentos],
    });
    await dataSource.initialize();
    console.log("Conectado ao banco de dados");
  }
  return {
    userRepository: dataSource.getRepository(User),
    atendimentoRepository: dataSource.getRepository(Atendimentos),
  };
}
