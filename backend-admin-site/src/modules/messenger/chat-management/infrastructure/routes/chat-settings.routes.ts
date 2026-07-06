import { Router } from "express"
import type { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

import { MessengerAccessControlService } from "../../../application/services/messenger-access-control.service"
import { MessengerRoomSettingsService } from "../../../application/services/messenger-room-settings.service"
import { PrismaMessengerRoomRepository } from "../../../infrastructure/persistence/prisma-messenger-room.repository"
import { PrismaMessengerMemberRepository } from "../../../infrastructure/persistence/prisma-messenger-member.repository"
import { requireMessengerCurrentUser } from "../../../infrastructure/http/require-messenger-current-user"
import { getRouteCurrentUser } from "../../../infrastructure/http/messenger-route-guards"

const router = Router()
const prisma = new PrismaClient()

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value
  if (typeof value === "string") {
    if (value === "true") return true
    if (value === "false") return false
  }
  return undefined
}

function createServices() {
  const roomRepository = new PrismaMessengerRoomRepository(prisma)
  const memberRepository = new PrismaMessengerMemberRepository(prisma)

  return {
    access: new MessengerAccessControlService(roomRepository, memberRepository),
    settings: new MessengerRoomSettingsService(roomRepository),
  }
}

router.use(requireMessengerCurrentUser)

router.get(
  "/rooms/:roomId/settings",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const roomId = asString(req.params.roomId)

      if (!roomId) throw new Error("room_id_required")

      const { access, settings } = createServices()

      await access.assertCanManageRoom({
        roomId,
        currentUser,
      })

      const result = await settings.getSettings(roomId)

      res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
)

router.patch(
  "/rooms/:roomId/settings",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const roomId = asString(req.params.roomId)

      if (!roomId) throw new Error("room_id_required")

      const { access, settings } = createServices()

      await access.assertCanManageRoom({
        roomId,
        currentUser,
      })

      const result = await settings.updateSettings(roomId, {
        title: asString(req.body?.title),
        description:
          req.body?.description === null
            ? null
            : asString(req.body?.description),
        username:
          req.body?.username === null ? null : asString(req.body?.username),
        avatarUrl:
          req.body?.avatarUrl === null ? null : asString(req.body?.avatarUrl),
        isPublic: asBoolean(req.body?.isPublic),
        allowMemberMessages: asBoolean(req.body?.allowMemberMessages),
        allowComments: asBoolean(req.body?.allowComments),
        isArchived: asBoolean(req.body?.isArchived),
      })

      res.json({
        ok: true,
        data: result,
      })
    } catch (error) {
      next(error)
    }
  },
)

export default router