import { Router } from "express"
import type { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

import { MessengerFoundationPersistenceService } from "../../../application/services/messenger-foundation-persistence.service"
import { MessengerAccessControlService } from "../../../application/services/messenger-access-control.service"
import { MessengerRoomQueryService } from "../../../application/services/messenger-room-query.service"
import { PrismaMessengerRoomRepository } from "../../../infrastructure/persistence/prisma-messenger-room.repository"
import { PrismaMessengerMemberRepository } from "../../../infrastructure/persistence/prisma-messenger-member.repository"
import { requireMessengerCurrentUser } from "../../../infrastructure/http/require-messenger-current-user"
import { getRouteCurrentUser } from "../../../infrastructure/http/messenger-route-guards"

const router = Router()
const prisma = new PrismaClient()

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function createServices() {
  const roomRepository = new PrismaMessengerRoomRepository(prisma)
  const memberRepository = new PrismaMessengerMemberRepository(prisma)

  return {
    foundation: new MessengerFoundationPersistenceService(
      roomRepository,
      memberRepository,
    ),
    access: new MessengerAccessControlService(roomRepository, memberRepository),
    query: new MessengerRoomQueryService(roomRepository, memberRepository),
  }
}

router.use(requireMessengerCurrentUser)

router.get(
  "/users/me/channels",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const { query } = createServices()

      const rooms = await query.listCreatorRoomsByKind(currentUser.id, "CHANNEL")

      res.json({
        ok: true,
        data: rooms.map((room) => room.toJSON()),
      })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  "/channels/:channelId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const channelId = asString(req.params.channelId)

      if (!channelId) throw new Error("channel_id_required")

      const { access, query } = createServices()

      const accessResult = await access.assertCanReadRoom({
        roomId: channelId,
        currentUser,
      })

      const room = await query.getRoomDetails(channelId)

      res.json({
        ok: true,
        data: {
          room: room.toJSON(),
          currentMember: accessResult.member?.toJSON() ?? null,
        },
      })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  "/channels/:channelId/members",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const channelId = asString(req.params.channelId)

      if (!channelId) throw new Error("channel_id_required")

      const { access, query } = createServices()

      await access.assertCanReadRoom({
        roomId: channelId,
        currentUser,
      })

      const members = await query.listRoomMembers(channelId)

      res.json({
        ok: true,
        data: members.map((member) => member.toJSON()),
      })
    } catch (error) {
      next(error)
    }
  },
)

router.post(
  "/channels",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const title = asString(req.body?.title)

      if (!title) throw new Error("channel_title_required")

      const { foundation } = createServices()

      const result = await foundation.createChannel({
        title,
        createdByUserId: currentUser.id,
        description: asString(req.body?.description) ?? null,
        username: asString(req.body?.username) ?? null,
        avatarUrl: asString(req.body?.avatarUrl) ?? null,
        isPublic: req.body?.isPublic === true,
      })

      res.status(201).json({
        ok: true,
        data: {
          room: result.room.toJSON(),
          ownerMember: result.ownerMember.toJSON(),
        },
      })
    } catch (error) {
      next(error)
    }
  },
)

router.post(
  "/channels/:channelId/subscribers",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const channelId = asString(req.params.channelId)

      if (!channelId) throw new Error("channel_id_required")

      const { foundation } = createServices()

      const result = await foundation.subscribeToChannel({
        roomId: channelId,
        userId: currentUser.id,
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

router.delete(
  "/channels/:channelId/subscribers/me",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const channelId = asString(req.params.channelId)

      if (!channelId) throw new Error("channel_id_required")

      const { access, foundation } = createServices()

      await access.assertIsRoomMember({
        roomId: channelId,
        currentUser,
      })

      const result = await foundation.unsubscribeFromChannel({
        roomId: channelId,
        userId: currentUser.id,
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

router.post(
  "/channels/:channelId/managers",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const channelId = asString(req.params.channelId)
      const targetUserId = asString(req.body?.targetUserId)

      if (!channelId) throw new Error("channel_id_required")
      if (!targetUserId) throw new Error("target_user_id_required")

      const role =
        req.body?.role === "ADMIN" || req.body?.role === "MODERATOR"
          ? req.body.role
          : undefined

      if (!role) throw new Error("channel_manager_role_required")

      const { foundation, access } = createServices()

      await access.assertCanManageMembers({
        roomId: channelId,
        currentUser,
      })

      const result = await foundation.addChannelManager({
        roomId: channelId,
        actingUserId: currentUser.id,
        targetUserId,
        role,
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

router.delete(
  "/channels/:channelId/members/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const channelId = asString(req.params.channelId)
      const targetUserId = asString(req.params.userId)

      if (!channelId) throw new Error("channel_id_required")
      if (!targetUserId) throw new Error("target_user_id_required")

      const { foundation, access } = createServices()

      await access.assertCanManageMembers({
        roomId: channelId,
        currentUser,
      })

      const result = await foundation.removeChannelMember({
        roomId: channelId,
        actingUserId: currentUser.id,
        targetUserId,
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