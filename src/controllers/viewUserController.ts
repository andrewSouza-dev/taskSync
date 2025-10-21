import { Handler } from "express";
import { UserRepository } from "../repositories/userRepository"; // seu repositório
import { safeUser } from "../security/types";

export class ViewUserController {
  constructor(private readonly userService: UserRepository) {}

  // 📝 Listar usuários
  list: Handler = async (req, res, next) => {
    try {
      const users: safeUser[] = await this.userService.findAll();
      res.render("users/users", { title: "Usuários", usuarios: users });
    } catch (error) {
      next(error);
    }
  };

  // 🧩 Exibir formulário de criação
  createForm: Handler = (req, res) => {
    res.render("users/newUser", { title: "Criar Usuário" });
  };

  // 🆕 Criar novo usuário
  create: Handler = async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      await this.userService.create({ name, email, password, role });
      res.redirect("/users");
    } catch (error) {
      next(error);
    }
  };

  // Exibir formulário de edição de usuário
  editForm: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const usuario = await this.userService.findById(Number(id));
      if (!usuario) return res.status(404).render("errors/404");
      res.render("users/editUser", { title: "Editar Usuário", usuario });
    } catch (error) {
      next(error);
    }
  }

  // 👀 Exibir detalhes de um usuário
  show: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const usuario = await this.userService.findById(id);
      if (!usuario) return res.status(404).send("Usuário não encontrado");
      res.render("users/show", { title: "Detalhes do Usuário", usuario });
    } catch (error) {
      next(error);
    }
  };

  // Atualizar usuário
  update: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, password, role } = req.body;
      
      const updatedUser = await this.userService.update(Number(id), { name, email, password, role });
      
      if (!updatedUser) return res.status(404).render("errors/404");
    
      res.redirect("/users");
    } catch (error) {
      next(error);
    }
  }

  // 🗑️ Excluir usuário
  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const deleted = await this.userService.delete(id);
      if (!deleted) return res.status(404).render("errors/404");
      res.redirect("/users");
    } catch (error) {
      next(error);
    }
  };
}