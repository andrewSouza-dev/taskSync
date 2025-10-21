import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";

import { router as authRoutes } from "./routes/authRoutes";
import { router as taskRoutes } from "./routes/taskRoutes";
import { router as userTaskRoutes } from "./routes/userTasksRoutes";
import { router as viewsRouter } from "./routes/viewsRoutes";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import { router as userRoutes } from "./routes/userRoutes";
import { AuthMiddleware } from "./middlewares/authMiddleware";

// 🔧 Carrega variáveis do .env
dotenv.config();

const app: Application = express();

// 🚧 Middlewares globais
app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Converte import.meta.url para caminho de arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Configuração das views (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Permite usar ?_method=PUT ou ?_method=DELETE
app.use(methodOverride("_method"));

// 📂 Arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, '..', 'public')));

// ======================= ROTAS REST (API) =======================
app.use("/api/auth", authRoutes);
app.use("/api/tasks", AuthMiddleware.verify, taskRoutes);
app.use("/api/users", AuthMiddleware.verify, userRoutes); // apenas admins
app.use("/api/usersTasks", AuthMiddleware.verify, userTaskRoutes);

// ======================= MIDDLEWARE PARA VIEWS =======================
// Disponibiliza `user` em todas as views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// ======================= ROTAS DAS VIEWS =======================
app.use("/", viewsRouter);

// ======================= MIDDLEWARE GLOBAL DE ERRO =======================
app.use(errorHandlerMiddleware);

// ======================= PORTA =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
