import { UserRepository } from "../repositories/userRepository";
import { User } from "../../generated/prisma";
import { CreateUserRequest, UpdateUserRequest } from "../controllers/schemas/userRequestSchema";

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

  async create(data: CreateUserRequest): Promise<User> {
    return this.userRepository.create(data);
  }

  async update(id: number, data: UpdateUserRequest): Promise<User | null> {
    return this.userRepository.update(id, data)
  }

  async delete(id: number): Promise<User | null> {
    return this.userRepository.delete(id);
  }
}