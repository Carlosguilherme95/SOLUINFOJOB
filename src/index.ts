import "reflect-metadata";
import { AppDataSource } from "../src/data-source/data-source";
import express from "express";
import routes from "../src/routes/routes";
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/SOLUINFO", routes);

async function connect() {
  try {
    await AppDataSource.initialize(); // Conecta ao banco de dados
    console.log("Conectado com sucesso ao banco de dados!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

connect();

app.listen(port, () => {
  console.log(`Express rodando na porta ${port}`);
});
