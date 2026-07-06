import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Role } from "@prisma/client";

export const generateAccessToken = (
  userId: string,
  role: Role
) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};