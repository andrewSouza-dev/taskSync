import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateUserAttributes, LoginAttributes, UserRepository } from "../repositories/userRepository";
import { HttpError } from "../errors/HttpError";
import { User } from "../../generated/prisma";


type safeUser = Omit<User, "password"> // tipo usado para nao retornar a senha nas requisicoes

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(data: LoginAttributes): Promise<{ user: safeUser; token: string }> {
    const { email, password } = data

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new HttpError(401, "Credenciais inválidas");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new HttpError(401, "Credenciais inválidas");

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET não definido");

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  }

  async register(data: CreateUserAttributes): Promise<safeUser> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new HttpError(400, "Email já cadastrado");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    
    // 🔒 Remove a senha antes de retornar
    const { password: _, ...safeUser } = newUser;

    return safeUser;
  }
}