import type { NextFunction, Request, Response } from "express"

import { getRequiredMessengerCurrentUser } from "./messenger-auth-context"

export function requireMessengerCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = getRequiredMessengerCurrentUser(req)

    ;(req as Request & { messengerCurrentUser?: { id: string } }).messengerCurrentUser =
      currentUser

    next()
  } catch (error) {
    res.status(401).json({
      ok: false,
      error:
        error instanceof Error ? error.message : "messenger_auth_required",
    })
  }
}