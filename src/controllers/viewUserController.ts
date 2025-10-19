import { Handler } from "express"
import { UserRepository } from "../repositories/userRepository";

export class ViewUserController {
    constructor (private readonly userService: UserRepository) {}

    // listar usuarios
    list: Handler = async (req, res, next) => {
        try {
            const users = await this.userService.findAll()
        } catch (error) {
            next(error)
        }
    }

    // 🧩 Exibir formulário de criação
    createForm: Handler = (req, res) => {
        res.render("criarUsuario", { title: "Criar Usuário" });
    };


    // 🆕 Criar novo usuário
    create: Handler = async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            await this.userService.create({ name, email, password });
            res.redirect("/usuarios");
        } catch (error) {
            next(error);
        }
    };


    // 👀 Exibir detalhes de um usuário (opcional)
    show: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const usuario = await this.userService.findById(id);
            res.render("detalheUsuario", { title: "Detalhes do Usuário", usuario });
        } catch (error) {
            next(error);
        }
    };

    // 🗑️ Excluir usuário (opcional)
    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            await this.userService.delete(id);
            res.redirect("/usuarios");
        } catch (error) {
            next(error);
        }
    };
}
