import  { User }  from "../../generated/prisma";

type userRole = "MEMBER" | "ADMIN"
export interface CreateUserAttributes {
    name: string,
    email: string,
    password: string,
    role: userRole
}
export interface UserRepository {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserAttributes): Promise<User>;
  update(id: number, data: Partial<CreateUserAttributes>): Promise<User | null>;
  delete(id: number): Promise<User | null>
}

export interface LoginAttributes {
  email: string;
  password: string;
}