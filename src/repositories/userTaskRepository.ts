import  { Task, UserTask }  from "../../generated/prisma"


export interface UserTaskRepository {
    // Buscar todas as tasks associadas a um usuário
    findAllByUser(userId: number): Promise<Task[]>

    // Buscar uma task específica de um usuário
    findByIdTaskAndUser(taskId: number, userId: number) : Promise<UserTask | null>
}