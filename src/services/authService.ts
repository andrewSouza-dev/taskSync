import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository";
import { HttpError } from "../errors/HttpError";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new HttpError(401, "Credenciais inválidas");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new HttpError(401, "Credenciais inválidas");

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return { user, token };
  }

  async register(data: { name: string; email: string; password: string }) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new HttpError(400, "Email já cadastrado");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }
}