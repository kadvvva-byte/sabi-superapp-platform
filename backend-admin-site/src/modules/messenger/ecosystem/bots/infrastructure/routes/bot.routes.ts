import { Router } from "express"
import type { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

import { MessengerFoundationPersistenceService } from "../../../../application/services/messenger-foundation-persistence.service"
import { MessengerAccessControlService } from "../../../../application/services/messenger-access-control.service"
import { MessengerBotQueryService } from "../../../../application/services/messenger-bot-query.service"
import { PrismaMessengerRoomRepository } from "../../../../infrastructure/persistence/prisma-messenger-room.repository"
import { PrismaMessengerMemberRepository } from "../../../../infrastructure/persistence/prisma-messenger-member.repository"
import { PrismaMessengerBotRepository } from "../../../../infrastructure/persistence/prisma-messenger-bot.repository"
import { requireMessengerCurrentUser } from "../../../../infrastructure/http/require-messenger-current-user"
import { getRouteCurrentUser } from "../../../../infrastructure/http/messenger-route-guards"

const router = Router()
const prisma = new PrismaClient()

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function createServices() {
  const roomRepository = new PrismaMessengerRoomRepository(prisma)
  const memberRepository = new PrismaMessengerMemberRepository(prisma)
  const botRepository = new PrismaMessengerBotRepository(prisma)

  return {
    foundation: new MessengerFoundationPersistenceService(
      roomRepository,
      memberRepository,
      botRepository,
    ),
    access: new MessengerAccessControlService(roomRepository, memberRepository),
    query: new MessengerBotQueryService(botRepository),
  }
}

router.use(requireMessengerCurrentUser)

router.get(
  "/bots/owner/me",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const { query } = createServices()

      const bots = await query.listOwnerBots(currentUser.id)

      res.json({
        ok: true,
        data: bots.map((bot) => bot.toJSON()),
      })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  "/bots/:botId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const botId = asString(req.params.botId)

      if (!botId) throw new Error("bot_id_required")

      const { query } = createServices()

      const bot = await query.getBotById(botId)

      res.json({
        ok: true,
        data: bot.toJSON(),
      })
    } catch (error) {
      next(error)
    }
  },
)

router.post(
  "/bots",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const title = asString(req.body?.title)

      if (!title) throw new Error("bot_title_required")

      const { foundation } = createServices()

      const result = await foundation.createBot({
        ownerUserId: currentUser.id,
        title,
        username: asString(req.body?.username) ?? null,
        description: asString(req.body?.description) ?? null,
        avatarUrl: asString(req.body?.avatarUrl) ?? null,
        webhookUrl: asString(req.body?.webhookUrl) ?? null,
      })

      res.status(201).json({
        ok: true,
        data: result.toJSON(),
      })
    } catch (error) {
      next(error)
    }
  },
)

router.post(
  "/bots/dialogs",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const botId = asString(req.body?.botId)
      const botTitle = asString(req.body?.botTitle)

      if (!botId) throw new Error("bot_dialog_bot_id_required")
      if (!botTitle) throw new Error("bot_dialog_bot_title_required")

      const { foundation } = createServices()

      const result = await foundation.createBotDialog({
        ownerUserId: currentUser.id,
        botId,
        botTitle,
        botAvatarUrl: asString(req.body?.botAvatarUrl) ?? null,
        botUserId: asString(req.body?.botUserId) ?? null,
      })

      res.status(201).json({
        ok: true,
        data: {
          room: result.room.toJSON(),
          humanMember: result.humanMember.toJSON(),
          botMember: result.botMember.toJSON(),
        },
      })
    } catch (error) {
      next(error)
    }
  },
)

router.post(
  "/bots/:botId/rooms/:roomId/attach",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const botId = asString(req.params.botId)
      const roomId = asString(req.params.roomId)

      if (!botId) throw new Error("bot_id_required")
      if (!roomId) throw new Error("room_id_required")

      const { foundation, access } = createServices()

      await access.assertCanUseBotInRoom({
        roomId,
        currentUser,
      })

      const result = await foundation.attachBotToRoom({
        roomId,
        actingUserId: currentUser.id,
        botId,
        botUserId: asString(req.body?.botUserId) ?? null,
      })

      res.status(201).json({
        ok: true,
        data: result.toJSON(),
      })
    } catch (error) {
      next(error)
    }
  },
)

export default router