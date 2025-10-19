import { Handler } from "express";
import { TaskService } from "../services/taskService";


export class ViewTaskController {
    constructor (private readonly taskService: TaskService) {}

    // Listar todas as tarefas
    listAllTasks: Handler = async (req, res, next) => {
        try {
            const tasks = await this.taskService.getAllTasks();
            res.render("tarefas", { title: "Tarefas", tasks });
        } catch (error) {
            next(error)
        }
    }


    // Exibir formulario de criação
    createForm: Handler = (req, res) => {
        res.render("CriarTarefa", { title: "Criar Tarefa" });
    }


    // Criar uma nova tarefa
    create: Handler = async (req, res, next) => {
        try {
            const { title, description, status } = req.body;
            
            await this.taskService.create({ title, description, status });
            res.redirect("../views/tasks.ejs")
        } catch (error) {
            next(error)
        }
    }

    // Mostrar uma tarefa
    show: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const task = await this.taskService.show(id);

            res.render("detalheTarefa", { title: "Detalhes da tarefa", task });
        } catch (error) {
            next(error)
        }
    }

    
    // Excluir uma tarefa (via botao ou formulario)
    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);

            await this.taskService.delete(id);
        } catch (error) {
            next(error)
        }
    }

}