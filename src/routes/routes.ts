import { AtendimentoController } from "../controllers/atendimentosController";
import { UserController } from "../controllers/userController";
import express from "express";

const userController = new UserController();
const atendimentoController = new AtendimentoController();
const router = express.Router();
router.post("/usercreate", userController.PostUser);
router.get("/usercreate", userController.getAllUsers);
router.get("/usercreate/:id", userController.getOneUser);
router.put("/usercreate/:id", userController.putUser);
router.delete("/usercreate/:id", userController.deleteUser);

router.post("/login", userController.userLogin);
router.post("/atendimentos", atendimentoController.atendimentoPost);

export default router;
