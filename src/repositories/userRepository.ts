import  { User }  from "../../generated/prisma";

export interface CreateUserAttributes {
    name: string,
    email: string,
    password: string
}
export interface UserRepository {
  findById(id: number): Promise<User | null>,
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserAttributes): Promise<User>;
}

export interface LoginAttributes {
  email: string;
  password: string;
}