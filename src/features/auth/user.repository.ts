import { dbClient } from "@/shared/lib/db";
import { SignInCommand, SignUpCommand, User } from "./model/types";

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

  getUserByEmail = (email: string): Promise<User | null> => {
    return dbClient.user.findUnique({
      where: {
        email,
      },
    });
  };

  createNewUser = (command: SignUpCommand): Promise<User> => {
    return dbClient.user.create({
      data: command,
    });
  };
}

export const userRepository = new UserRepository();
