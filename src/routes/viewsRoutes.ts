import { Router } from "express";
import { viewTaskController, viewuserController } from "../../containers";

const router = Router();

// Página inicial
router.get("/", (req, res) => {
    res.render("index", { title: "Página Inicial" });
});


// Usuários
router.get("/usuarios", viewuserController.list);
router.get("/usuarios/criar", viewuserController.createForm);
router.post("/usuarios", viewuserController.create);


// Tarefas
router.get("/tarefas", viewTaskController.listAllTasks);
router.get("/tarefas/criar", viewTaskController.createForm);
router.post("/tarefas", viewTaskController.create);


// (opcionais)
router.get("/tarefas/:id", viewTaskController.show);
router.post("/tarefas/:id/delete", viewTaskController.delete);
router.get("/usuarios/:id", viewuserController.show);
router.post("/usuarios/:id/delete", viewuserController.delete);

export { router };