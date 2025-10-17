import { User, Prisma } from "@prisma/client";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: ): Promise<User>;
  findById(id: number): Promise<User | null>;
}

const createUser { 

}