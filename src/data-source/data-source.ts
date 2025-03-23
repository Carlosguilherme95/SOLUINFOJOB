import { DataSource } from "typeorm";
import { User } from "../Entity/user";
import { Atendimentos } from "../Entity/atendimentos";

// Configuração do TypeORM
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "82.25.74.94",
  port: 3306,
  username: "root",
  password: "91016765Carlos@",
  database: "ATENDIMENTOSSOLUINFO",
  synchronize: true,
  logging: false,
  entities: [User, Atendimentos],
  migrations: [],
  subscribers: [],
});
