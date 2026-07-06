import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { AppError } from "../utils/appError";

export const restrictTo = (...roles: Role[]) => {
  return (
    req: Request & { user?: { role: Role } },
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError("You do not have permission", 403);
    }

    next();
  };
};