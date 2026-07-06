import { Role } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export interface JwtPayload {
  id: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
        role: string;
      };
    }
  }
}

export {};