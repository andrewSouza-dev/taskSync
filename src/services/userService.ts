import { UserRepository } from "../repositories/userRepository";
import { User } from "../../generated/prisma";
import { id } from "zod/v4/locales";

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(data: CreateUser): Promise<User> {
    return this.userRepository.create(data);
  }

  async update(id: number, data: Partial<CreateUser>): Promise<User | null> {
    return this.userRepository.update(id, data)
  }

  async delete(id: number): Promise<User | null> {
    return this.userRepository.delete(id);
  }
}