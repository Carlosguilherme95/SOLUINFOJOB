import { verifyJwt } from "../middleware/middleware";
import { UserController } from "../controllers/userController";
import express from "express";
import { AtendimentoController } from "../controllers/atendimentosController";

const userController = new UserController();
const atendimentoController = new AtendimentoController();
const router = express.Router();
router.post("/usercreate", userController.PostUser);
router.get("/usercreate", userController.getAllUsers);
router.get("/usercreate/:id", userController.getOneUser);
router.put("/usercreate/:id", userController.putUser);
router.delete("/usercreate/:id", userController.deleteUser);
router.post("/login", userController.userLogin);

router.post("/atendimentos", verifyJwt, atendimentoController.atendimentoPost);
router.get("/atendimentos", atendimentoController.atendimentoGetall);
router.delete(
  "/atendimentos/:id_atendimento",
  atendimentoController.atendimentoDelete
);
router.put(
  "/atendimentos/:id_atendimento",
  atendimentoController.atendimentoPut
);
export default router;
