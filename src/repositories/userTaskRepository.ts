import  { Task, UserTask }  from "../../generated/prisma"

export type UserRole = "MEMBER" | "ADMIN";

export interface UserTaskRepository {
    // Buscar todas as tasks associadas a um usuário
    findAllByUser(userId: number): Promise<UserTask[]>

    // Buscar uma task específica de um usuário
    findByIdTaskAndUser(taskId: number, userId: number) : Promise<UserTask | null>

    // Criar uma task por usuario
    createTaskByUser(userid: number, taskId: number, role?: UserRole): Promise<UserTask | null>

    // Atualizar task de um usuário (role ou campos do relacionamento)
    updateUserTask(userId: number, taskId: number, role?: UserRole ): Promise<UserTask | null>

    // Deletar task de um usuário (sem deletar a task global)
    deleteUserTask(userId: number, taskId: number): Promise<UserTask | null>
}   