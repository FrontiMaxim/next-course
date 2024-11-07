import { dbClient } from "@/shared/lib/db";
import { Session } from "./model/types";

class SessionRepository {
  createSession = (id: string): Promise<Session> => {
    return dbClient.session.create({
      data: {
        user: {
          connect: {
            id,
          },
        },
      },
    });
  };
}

export const sessionRepository = new SessionRepository();
