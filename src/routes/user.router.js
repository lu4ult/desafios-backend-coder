import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import { verifyToken } from "../middleWares/verifyToken.js";
const controller = new UserController();

const router = Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/profile", verifyToken, controller.profile);

export default router;
