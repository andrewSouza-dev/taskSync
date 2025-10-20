import { Router } from "express";
import { viewTaskController, viewuserController } from "../../containers";


const router = Router();

// Página inicial
router.get("/", (req, res) => {
  res.render("index", { title: "Página Inicial" });
});

/* ==================== USUÁRIOS ==================== */
// Listar usuários
router.get("/users", viewuserController.list);
// Formulário criar usuário
router.get("/users/newUser", viewuserController.createForm);
// Criar usuário
router.post("/users", viewuserController.create);
// Detalhes do usuário
router.get("/users/:id", viewuserController.show);
// Excluir usuário
router.post("/users/:id/delete", viewuserController.delete);



/* ==================== TAREFAS ==================== */
// Listar tarefas
router.get("/tasks", viewTaskController.listAllTasks);
// Formulário criar tarefa
router.get("/tasks/newTask", viewTaskController.createForm);
// Criar tarefa
router.post("/tasks", viewTaskController.create);
// Detalhes da tarefa
router.get("/tasks/:id", viewTaskController.show);
// Excluir tarefa
router.post("/tasks/:id/delete", viewTaskController.delete);


export { router };