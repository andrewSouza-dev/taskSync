import { Server, Socket } from "socket.io";

// funcao para verificar se o usuario esta conectado ou disconectado
export default function initSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 Usuário conectado:", socket.id);

    socket.on("new-task", (task) => {
      io.emit("update-tasks", task);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Usuário desconectado:", socket.id);
    });
  });
}