import { Router } from "express";
import CartController from '../controllers/cart.controllers.js';
const controller = new CartController();


const router = Router();


router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;




