"use server";

import { SignInCommand, SignInResponse } from "./model/types";
import { userRepository } from "./user.repository";
import { sessionRepository } from "./session.repository";

export const signInAction = async (
  command: SignInCommand,
): Promise<SignInResponse> => {
  const user = await userRepository.getUser(command);

  if (user) {
    await sessionRepository.createSession(user.id);

    return {
      isSignIn: true,
      data: "Аутентификация прошла успешно!",
    };
  } else {
    return {
      isSignIn: false,
      data: "Данный пользователь не зарегистрирован!",
    };
  }
};
