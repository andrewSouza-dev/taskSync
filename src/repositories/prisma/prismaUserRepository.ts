import { prisma} from "../../database";
import { CreateUserAttributes, UserRepository } from "../userRepository";
import { User } from "../../../generated/prisma";

export class PrismaUserRepository implements UserRepository {

  async findAll(): Promise<User[]> {
    return prisma.user.findMany() 
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: CreateUserAttributes): Promise<User> {
    return prisma.user.create({ data });
  }

  async update(id: number, data: Partial<CreateUserAttributes>): Promise<User | null> {
    return prisma.user.update({ 
      where:  {id} ,
      data,
    })
  }

  async delete(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } })
  }
}