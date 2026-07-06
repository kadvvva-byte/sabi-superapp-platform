import type { Request } from "express"

import type { MessengerCurrentUser } from "../../application/types/messenger-current-user"
import { getRequiredMessengerCurrentUser } from "./messenger-auth-context"

export function getRouteCurrentUser(req: Request): MessengerCurrentUser {
  const requestWithMessengerUser = req as Request & {
    messengerCurrentUser?: MessengerCurrentUser
  }

  return requestWithMessengerUser.messengerCurrentUser ??
    getRequiredMessengerCurrentUser(req)
}

export function getRouteRoomId(
  req: Request,
  candidates: string[] = ["roomId", "chatId", "groupId", "channelId"],
): string {
  for (const key of candidates) {
    const fromParams = req.params?.[key]
    if (typeof fromParams === "string" && fromParams.trim().length > 0) {
      return fromParams.trim()
    }

    const bodyRecord = req.body as Record<string, unknown> | undefined
    const fromBody = bodyRecord?.[key]
    if (typeof fromBody === "string" && fromBody.trim().length > 0) {
      return fromBody.trim()
    }
  }

  throw new Error("messenger_room_id_required")
}