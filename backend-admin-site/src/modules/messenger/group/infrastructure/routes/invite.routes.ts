import { Router } from "express"
import type { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

import { MessengerAccessControlService } from "../../../application/services/messenger-access-control.service"
import { MessengerInvitePersistenceService } from "../../../application/services/messenger-invite-persistence.service"
import { PrismaMessengerRoomRepository } from "../../../infrastructure/persistence/prisma-messenger-room.repository"
import { PrismaMessengerMemberRepository } from "../../../infrastructure/persistence/prisma-messenger-member.repository"
import { PrismaMessengerInviteRepository } from "../../../infrastructure/persistence/prisma-messenger-invite.repository"
import { requireMessengerCurrentUser } from "../../../infrastructure/http/require-messenger-current-user"
import { getRouteCurrentUser } from "../../../infrastructure/http/messenger-route-guards"

const router = Router()
const prisma = new PrismaClient()

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

function asDate(value: unknown): Date | null {
  if (value instanceof Date) return value
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  return null
}

function createServices() {
  const roomRepository = new PrismaMessengerRoomRepository(prisma)
  const memberRepository = new PrismaMessengerMemberRepository(prisma)
  const inviteRepository = new PrismaMessengerInviteRepository(prisma)

  return {
    access: new MessengerAccessControlService(roomRepository, memberRepository),
    invites: new MessengerInvitePersistenceService(
      roomRepository,
      memberRepository,
      inviteRepository,
    ),
  }
}

router.use(requireMessengerCurrentUser)

router.post(
  "/rooms/:roomId/invites",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const roomId = asString(req.params.roomId)

      if (!roomId) throw new Error("room_id_required")

      const { access, invites } = createServices()

      await access.assertCanCreateInvite({
        roomId,
        currentUser,
      })

      const result = await invites.createInvite({
        roomId,
        createdByUserId: currentUser.id,
        targetUserId: asString(req.body?.targetUserId) ?? null,
        expiresAt: asDate(req.body?.expiresAt),
        maxUses: asNumber(req.body?.maxUses) ?? null,
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

router.get(
  "/rooms/:roomId/invites",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const roomId = asString(req.params.roomId)

      if (!roomId) throw new Error("room_id_required")

      const { access, invites } = createServices()

      await access.assertCanCreateInvite({
        roomId,
        currentUser,
      })

      const result = await invites.listRoomInvites({
        roomId,
      })

      res.json({
        ok: true,
        data: result.map((item) => item.toJSON()),
      })
    } catch (error) {
      next(error)
    }
  },
)

router.post(
  "/invites/join",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const code = asString(req.body?.code)

      if (!code) throw new Error("invite_code_required")

      const { invites } = createServices()

      const result = await invites.joinByCode({
        code,
        currentUserId: currentUser.id,
      })

      res.status(result.joined ? 201 : 200).json({
        ok: true,
        data: {
          room: result.room.toJSON(),
          member: result.member.toJSON(),
          invite: result.invite.toJSON(),
          joined: result.joined,
        },
      })
    } catch (error) {
      next(error)
    }
  },
)

router.post(
  "/invites/:inviteId/revoke",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const inviteId = asString(req.params.inviteId)

      if (!inviteId) throw new Error("invite_id_required")

      const { invites } = createServices()

      const result = await invites.revokeInvite({
        inviteId,
      })

      res.json({
        ok: true,
        data: result.toJSON(),
      })
    } catch (error) {
      next(error)
    }
  },
)

export default router