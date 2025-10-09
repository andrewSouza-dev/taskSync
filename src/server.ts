import http from "http";
import { Server } from "socket.io";
import app from "./app";
import initSocket from "./config/socket";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

initSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));