import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import { userController } from "../../containers/index.js";

const router = Router();

router.use(AuthMiddleware.verify);
router.use(AuthMiddleware.isAdmin);


router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.get("/email/:email", userController.getByEmail);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);


export { router };