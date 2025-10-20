import { Handler } from "express";
import { UserRepository } from "../repositories/userRepository"; // seu repositório
import { safeUser } from "../security/types";

export class ViewUserController {
  constructor(private readonly userService: UserRepository) {}

  // 📝 Listar usuários
  list: Handler = async (req, res, next) => {
    try {
      const users: safeUser[] = await this.userService.findAll();
      res.render("usuarios/listar", { title: "Usuários", usuarios: users });
    } catch (error) {
      next(error);
    }
  };

  // 🧩 Exibir formulário de criação
  createForm: Handler = (req, res) => {
    res.render("usuarios/criar", { title: "Criar Usuário" });
  };

  // 🆕 Criar novo usuário
  create: Handler = async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      await this.userService.create({ name, email, password, role });
      res.redirect("/usuarios");
    } catch (error) {
      next(error);
    }
  };

  // 👀 Exibir detalhes de um usuário
  show: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const usuario = await this.userService.findById(id);
      if (!usuario) return res.status(404).send("Usuário não encontrado");
      res.render("usuarios/show", { title: "Detalhes do Usuário", usuario });
    } catch (error) {
      next(error);
    }
  };

  // 🗑️ Excluir usuário
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