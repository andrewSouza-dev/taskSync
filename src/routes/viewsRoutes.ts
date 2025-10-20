import { Router } from "express";
import { viewTaskController, viewuserController } from "../../containers";

const router = Router();

// Página inicial (pública)
router.get("/", (req, res) => {
  res.render("index", { title: "Página Inicial" });
});

// Página de login (pública)
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// Logout
router.get("/logout", (req, res) => {
  req.user = undefined; // limpar usuário
  res.locals.user = null; // também remove da view
  res.redirect("/");
});

/* ==================== USUÁRIOS ==================== */
// Todas rotas abaixo assumem que user está logado e é admin
router.get("/users", viewuserController.list);
router.get("/users/newUser", viewuserController.createForm);
router.post("/users", viewuserController.create);
router.get("/users/:id", viewuserController.show);
router.post("/users/:id/delete", viewuserController.delete);

/* ==================== TAREFAS ==================== */
// Rotas para tarefas (usuário logado)
router.get("/tasks", viewTaskController.listAllTasks);
router.get("/tasks/newTask", viewTaskController.createForm);
router.post("/tasks", viewTaskController.create);
router.get("/tasks/:id", viewTaskController.show);
router.post("/tasks/:id/delete", viewTaskController.delete);

export { router };
