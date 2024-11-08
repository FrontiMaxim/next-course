"use server";

import { SignUpCommand, SignUpResponse } from "./model/types";
import { userRepository } from "./user.repository";
import { sessionRepository } from "./session.repository";
import bcrypt from "bcryptjs";

export const signUpAction = async (
  command: SignUpCommand,
  fingerprint: number,
): Promise<SignUpResponse> => {
  const user = await userRepository.getUserByEmail(command.email);

  if (user) {
    return {
      isSignUp: false,
      data: "This user already exists",
    };
  } else {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT!));
    const hash = await bcrypt.hash(command.password, salt);

    const newUser = await userRepository.createNewUser({
      ...command,
      password: hash,
    });

    const newSession = await sessionRepository.createSession(
      newUser.id,
      fingerprint,
    );

    return {
      isSignUp: true,
      data: newSession.id,
    };
  }
};
