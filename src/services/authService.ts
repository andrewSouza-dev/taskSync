import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateUserAttributes, LoginAttributes, UserRepository } from "../repositories/userRepository";
import { HttpError } from "../errors/HttpError";
import { User } from "../../generated/prisma";
import { safeUser } from "../security/types";

// tipo usado para não retornar a senha nas requisições


export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  private toSafeUser(user: User): safeUser {
    const { password, ...safe } = user;
    return safe;
  }

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
    // 3️⃣ Remove o campo password antes de retornar
    const { password: _, ...safeUser } = user;

    return { user: safeUser, token };
  }



  async register(data: CreateUserAttributes): Promise<safeUser> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new HttpError(400, "Email já cadastrado");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const { password: _, ...safe } = newUser;
    return safe;
  }
}