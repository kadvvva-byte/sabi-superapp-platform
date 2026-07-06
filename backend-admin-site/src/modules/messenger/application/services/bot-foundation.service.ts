import { randomUUID } from "crypto"

import { MessengerBotEntity } from "../../domain/entities/messenger-bot.entity"
import { MessengerMemberEntity } from "../../domain/entities/messenger-member.entity"
import { MessengerRoomEntity } from "../../domain/entities/messenger-room.entity"
import { MessengerPermissionService } from "./messenger-permission.service"

type CreateBotInput = {
  ownerUserId: string
  title: string
  username?: string | null
  description?: string | null
  avatarUrl?: string | null
  webhookUrl?: string | null
}

type CreateBotDialogInput = {
  ownerUserId: string
  botId: string
  botTitle: string
  botAvatarUrl?: string | null
  botUserId?: string | null
}

type AttachBotToRoomInput = {
  room: MessengerRoomEntity
  actingMember: MessengerMemberEntity
  botId: string
  botUserId?: string | null
}

export class BotFoundationService {
  constructor(
    private readonly permissionService = new MessengerPermissionService(),
  ) {}

  createBot(input: CreateBotInput): MessengerBotEntity {
    const now = new Date()

    return new MessengerBotEntity({
      id: randomUUID(),
      ownerUserId: input.ownerUserId,
      title: input.title,
      username: input.username ?? null,
      description: input.description ?? null,
      avatarUrl: input.avatarUrl ?? null,
      webhookUrl: input.webhookUrl ?? null,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    })
  }

  createBotDialog(input: CreateBotDialogInput) {
    const room = MessengerRoomEntity.createBotDialog({
      id: randomUUID(),
      title: input.botTitle,
      createdByUserId: input.ownerUserId,
      avatarUrl: input.botAvatarUrl ?? null,
    })

    const humanMember = new MessengerMemberEntity({
      id: randomUUID(),
      roomId: room.id,
      userId: input.ownerUserId,
      role: "MEMBER",
      joinedAt: new Date(),
      addedByUserId: input.ownerUserId,
    })

    const botMember = new MessengerMemberEntity({
      id: randomUUID(),
      roomId: room.id,
      userId: input.botUserId?.trim() || `bot:${input.botId}`,
      role: "BOT",
      joinedAt: new Date(),
      addedByUserId: input.ownerUserId,
      botId: input.botId,
    })

    return {
      room,
      humanMember,
      botMember,
    }
  }

  attachBotToRoom(input: AttachBotToRoomInput): MessengerMemberEntity {
    if (!this.permissionService.canUseBotInRoom(input.room, input.actingMember)) {
      throw new Error("bot_attach_forbidden")
    }

    return new MessengerMemberEntity({
      id: randomUUID(),
      roomId: input.room.id,
      userId: input.botUserId?.trim() || `bot:${input.botId}`,
      role: "BOT",
      joinedAt: new Date(),
      addedByUserId: input.actingMember.userId,
      botId: input.botId,
    })
  }
}