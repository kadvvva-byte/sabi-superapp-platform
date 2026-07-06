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
  "/users/me/groups",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const { query } = createServices()

      const rooms = await query.listCreatorRoomsByKind(currentUser.id, "GROUP")

      res.json({
        ok: true,
        data: rooms.map((room) => room.toJSON()),
      })
    } catch (error) {
      next(error)
    }
  },
)


// SABI_GROUP_DIRECTORY_SEARCH
router.post(
  "/groups/profile-sync",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)

      const requestedId =
        asString(req.body?.chatId) ||
        asString(req.body?.groupId) ||
        asString(req.body?.id)

      const title =
        asString(req.body?.title) ||
        asString(req.body?.name) ||
        asString(req.body?.groupName)

      if (!requestedId) throw new Error("group_id_required")
      if (!title) throw new Error("group_title_required")

      const avatarUrl = asString(req.body?.avatarUrl) || asString(req.body?.photoUrl) || null
      const chat = (prisma as any).chat
      const chatMember = (prisma as any).chatMember

      const existing = await chat.findUnique({
        where: { id: requestedId },
        select: { id: true },
      })

      if (existing?.id) {
        await chat.update({
          where: { id: requestedId },
          data: {
            type: "GROUP",
            title,
            avatarUrl,
            createdBy: currentUser.id,
            updatedAt: new Date(),
          },
        })
      } else {
        await chat.create({
          data: {
            id: requestedId,
            type: "GROUP",
            title,
            avatarUrl,
            createdBy: currentUser.id,
          },
        })
      }

      const member = await chatMember.findFirst({
        where: {
          chatId: requestedId,
          userId: currentUser.id,
        },
        select: { id: true },
      })

      if (!member?.id) {
        await chatMember.create({
          data: {
            chatId: requestedId,
            userId: currentUser.id,
            role: "OWNER",
            isArchived: false,
          },
        })
      }

      res.json({
        ok: true,
        data: {
          id: requestedId,
          chatId: requestedId,
          title,
          type: "GROUP",
          avatarUrl,
          createdBy: currentUser.id,
        },
      })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  "/groups/search",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = asString(req.query?.query) || asString(req.query?.q) || ""
      const normalized = query.trim()

      if (!normalized) {
        res.json({ ok: true, data: [] })
        return
      }

      const chat = (prisma as any).chat

      const rows = await chat.findMany({
        where: {
          type: "GROUP",
          OR: [
            { title: { contains: normalized, mode: "insensitive" } },
            { id: { contains: normalized, mode: "insensitive" } },
          ],
        },
        take: 30,
        orderBy: { updatedAt: "desc" },
      })

      res.json({
        ok: true,
        data: rows.map((item: any) => ({
          id: item.id,
          chatId: item.id,
          title: item.title || "Group",
          name: item.title || "Group",
          type: "GROUP",
          roomType: "group",
          avatarUrl: item.avatarUrl || null,
          createdBy: item.createdBy || null,
          updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
        })),
      })
    } catch (error) {
      next(error)
    }
  },
)

router.get(
  "/groups/:groupId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const groupId = asString(req.params.groupId)

      if (!groupId) throw new Error("group_id_required")

      const { access, query } = createServices()

      const accessResult = await access.assertCanReadRoom({
        roomId: groupId,
        currentUser,
      })

      const room = await query.getRoomDetails(groupId)

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
  "/groups/:groupId/members",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const groupId = asString(req.params.groupId)

      if (!groupId) throw new Error("group_id_required")

      const { access, query } = createServices()

      await access.assertCanReadRoom({
        roomId: groupId,
        currentUser,
      })

      const members = await query.listRoomMembers(groupId)

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
  "/groups",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const title = asString(req.body?.title)

      if (!title) throw new Error("group_title_required")

      const { foundation } = createServices()

      const result = await foundation.createGroup({
        title,
        createdByUserId: currentUser.id,
        description: asString(req.body?.description) ?? null,
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
  "/groups/:groupId/members",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const groupId = asString(req.params.groupId)
      const targetUserId = asString(req.body?.targetUserId)

      if (!groupId) throw new Error("group_id_required")
      if (!targetUserId) throw new Error("target_user_id_required")

      const role =
        req.body?.role === "MEMBER" ||
        req.body?.role === "MODERATOR" ||
        req.body?.role === "ADMIN"
          ? req.body.role
          : undefined

      const { foundation, access } = createServices()

      await access.assertCanManageMembers({
        roomId: groupId,
        currentUser,
      })

      const result = await foundation.addGroupMember({
        roomId: groupId,
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
  "/groups/:groupId/members/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const groupId = asString(req.params.groupId)
      const targetUserId = asString(req.params.userId)

      if (!groupId) throw new Error("group_id_required")
      if (!targetUserId) throw new Error("target_user_id_required")

      const { foundation, access } = createServices()

      await access.assertCanManageMembers({
        roomId: groupId,
        currentUser,
      })

      const result = await foundation.removeGroupMember({
        roomId: groupId,
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

router.patch(
  "/groups/:groupId/members/:userId/role",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = getRouteCurrentUser(req)
      const groupId = asString(req.params.groupId)
      const targetUserId = asString(req.params.userId)

      if (!groupId) throw new Error("group_id_required")
      if (!targetUserId) throw new Error("target_user_id_required")

      const nextRole =
        req.body?.nextRole === "MEMBER" ||
        req.body?.nextRole === "MODERATOR" ||
        req.body?.nextRole === "ADMIN"
          ? req.body.nextRole
          : undefined

      if (!nextRole) throw new Error("group_next_role_required")

      const { foundation, access } = createServices()

      await access.assertCanManageRoom({
        roomId: groupId,
        currentUser,
      })

      const result = await foundation.changeGroupMemberRole({
        roomId: groupId,
        actingUserId: currentUser.id,
        targetUserId,
        nextRole,
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
