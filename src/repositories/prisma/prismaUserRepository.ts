import { prisma} from "../../database";
import { CreateUserAttributes, UserRepository } from "../userRepository";
import { User } from "../../../generated/prisma";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserAttributes): Promise<User> {
    return prisma.user.create({ data });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
}