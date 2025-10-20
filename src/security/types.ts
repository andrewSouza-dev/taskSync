import { User } from "../../generated/prisma";

export type safeUser = Omit<User, "password"> 

