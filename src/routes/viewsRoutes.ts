import { Router } from "express";
import { viewTaskController, viewuserController } from "../../containers";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/* ======== PÁGINA INICIAL E LOGIN ======== */
router.get("/", (req, res) => res.render("index", { title: "Página Inicial" }));
router.get("/login", (req, res) => res.render("login", { title: "Login" }));
router.get("/register", (req, res) => res.render("register", { title: "Registro" }));

router.get("/logout", (req, res) => {
  res.clearCookie("token"); // remove o JWT do navegador
  res.locals.user = null;
  res.redirect("/");
});

/* ======== ÁREA LOGADA ======== */
router.get("/dashboard", AuthMiddleware.verify, (req, res) => {
  res.render("dashboard", { title: "Dashboard", user: req.user });
});

/* ======== CRUD DE TAREFAS (MEMBER e ADMIN) ======== */
// Apenas usuários autenticados podem ver/editar suas próprias tarefas
router.get("/my-tasks", AuthMiddleware.verify, viewTaskController.listByUser);
router.get("/my-tasks/new", AuthMiddleware.verify, viewTaskController.createForm);
router.post("/my-tasks", AuthMiddleware.verify, viewTaskController.create);
router.get("/my-tasks/:id", AuthMiddleware.verify, viewTaskController.show);
router.get("/my-tasks/:id/edit", AuthMiddleware.verify, AuthMiddleware.isMemberOrOwner, viewTaskController.editForm);
router.put("/my-tasks/:id", AuthMiddleware.verify, AuthMiddleware.isMemberOrOwner, viewTaskController.update);
router.delete("/my-tasks/:id", AuthMiddleware.verify, AuthMiddleware.isMemberOrOwner, viewTaskController.delete);



/* ======== CRUD DE USUÁRIOS (ADMIN APENAS) ======== */
router.get("/users", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewuserController.list);
router.get("/users/new", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewuserController.createForm);
router.post("/users", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewuserController.create);
router.get("/users/:id", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewuserController.show);
router.get("/users/:id/edit", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewuserController.editForm);
router.put("/users/:id", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewuserController.update);
router.delete("/users/:id", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewuserController.delete);



/* ======== CRUD DE TODAS AS TAREFAS (ADMIN APENAS) ======== */
router.get("/tasks", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.listAllTasks);
router.get("/tasks/new", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.createGlobalForm);
router.get("/tasks/:id", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.showGlobal);
router.post("/tasks", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.createGlobal);
router.get("/tasks/:id/edit", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.editGlobalForm);
router.put("/tasks/:id", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.updateGlobal);
router.delete("/tasks/:id", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.deleteTaskAsAdmin);



/* ======== CRUD DE USER-TASKS (ADMIN APENAS) ======== */
router.get("/users/:userId/tasks", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.listUserTasks); // listar tasks de um usuário
router.post("/users/:userId/tasks", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.createUserTask); // criar task e associar ao user
router.put("/users/:userId/tasks/:taskId", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.updateUserTask); // atualizar associação
router.delete("/users/:userId/tasks/:taskId", AuthMiddleware.verify, AuthMiddleware.isAdmin, viewTaskController.deleteUserTask); // remover associação


router.use((req, res) => {
  res.status(404).render("errors/error", { message: "Página não encontrada" });
});


export { router };
