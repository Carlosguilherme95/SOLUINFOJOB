import { UserController } from "../controllers/userController";
import express from "express";

const userController = new UserController();
const router = express.Router();
router.post("/usercreate", userController.PostUser);
router.get("/usercreate", userController.getAllUsers);
router.get("/usercreate/:id", userController.getOneUser);
router.put("/usercreate/:id", userController.putUser);
router.delete("/usercreate/:id", userController.deleteUser);
router.post("/login", userController.userLogin);

export default router;
