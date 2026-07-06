import { Request, Response, NextFunction } from "express"
import { prisma } from "../config/prisma"

export const idempotencyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const key = req.header("Idempotency-Key")

  if (!key) {
    return next()
  }

  const existing = await prisma.idempotencyKey.findUnique({
    where: { key }
  })

  if (existing && existing.responseBody) {
    return res.json(existing.responseBody)
  }

  res.locals.idempotencyKey = key

  next()
}