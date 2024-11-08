import { dbClient } from "@/shared/lib/db";
import { Session } from "./model/types";

class SessionRepository {
  createSession = (userId: string, fingerprint: number): Promise<Session> => {
    return dbClient.session.create({
      data: {
        fingerprint,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  };
}

export const sessionRepository = new SessionRepository();
