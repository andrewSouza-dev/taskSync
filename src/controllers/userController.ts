import { Handler } from "express";
import { UserService } from "../services/userService";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getAll: Handler = async (req, res, next) => {
    try {
      const users = await this.userService.findAll();
      
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getById: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const userById = await this.userService.findById(id);

      res.json(userById);
    } catch (error) {
      next(error);
    }
  };

  getByEmail: Handler = async (req, res, next) => {
    try {
        const email = (req.params.email);
        const userByEmail = await this.userService.findByEmail(email)

        res.json(userByEmail)
    } catch (error) {
        next(error)
    }
  }

  create: Handler = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.userService.create({ name, email, password });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name , email, password } = req.body;
        const updateUser = await this.userService.update(id, {
            name,
            email,
            password
        })

        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
  }


  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const deleted = await this.userService.delete(id);

      res.status(200).json({ deleted });
    } catch (error) {
      next(error);
    }
  };
}