import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Проверяет принадлежность кошелька пользователю
 */
export const ownershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.id;
    const walletId = req.params.walletId || req.body.walletId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not authenticated",
      });
    }

    if (!walletId) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Wallet ID is required",
      });
    }

    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId },
    });

    if (!wallet) {
      return res.status(404).json({
        error: "Not Found",
        message: "Wallet not found",
      });
    }

    if (wallet.userId !== userId) {
      return res.status(403).json({
        error: "Forbidden",
        message: "You do not have access to this wallet",
      });
    }

    next();
  } catch (error) {
    console.error("Ownership middleware error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};