import { dbClient } from "@/shared/lib/db";
import { SignInCommand, User } from "./model/types";

class UserRepository {
  getUser = (command: SignInCommand): Promise<User | null> => {
    const { email, password } = command;

    return dbClient.user.findFirst({
      where: {
        email,
        password,
      },
    });
  };
}

export const userRepository = new UserRepository();
