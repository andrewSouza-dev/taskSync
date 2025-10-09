import express, { Application } from "express"; 
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

// para poder tipar o app e gerar autocompletar 
const app: Application = express();

app.use(cors());
app.use(express.json());


// Definindo os caminhos das rotas(completas)
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

export default app;
