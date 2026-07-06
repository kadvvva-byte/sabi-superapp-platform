import { PrismaClient } from "@prisma/client"

import { MessengerMemberEntity } from "../../domain/entities/messenger-member.entity"
import type { MessengerMemberRepositoryPort } from "../../application/ports/messenger-member.repository.port"
import {
  type PrismaModelDelegate,
  type PrismaRecord,
  getPrismaDelegate,
} from "./prisma-messenger-delegate"

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback
}

function asDate(value: unknown, fallback = new Date()): Date {
  if (value instanceof Date) return value
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  return fallback
}

function normalizeRole(value: unknown): "OWNER" | "ADMIN" | "MODERATOR" | "MEMBER" {
  return value === "OWNER" ||
    value === "ADMIN" ||
    value === "MODERATOR" ||
    value === "MEMBER"
    ? value
    : "MEMBER"
}

function mapToEntity(record: PrismaRecord): MessengerMemberEntity {
  return new MessengerMemberEntity({
    id: asString(record.id) ?? "",
    roomId: asString(record.chatId) ?? asString(record.roomId) ?? "",
    userId: asString(record.userId) ?? "",
    role: normalizeRole(record.role),
    addedByUserId: asString(record.addedByUserId),
    botId: asString(record.botId),
    isMuted:
      asBoolean(record.isMuted) ||
      record.mutedUntil instanceof Date ||
      typeof record.mutedUntil === "string" ||
      typeof record.mutedUntil === "number",
    isBanned: asBoolean(record.isBanned),
    joinedAt: asDate(record.joinedAt),
  })
}

type MemberPersistenceData = {
  id: string
  chatId: string
  userId: string
  role: "OWNER" | "ADMIN" | "MODERATOR" | "MEMBER"
  mutedUntil?: Date | null
  isArchived?: boolean
  joinedAt?: Date
}

function toPersistence(member: MessengerMemberEntity): MemberPersistenceData {
  const data = member.toJSON()

  return {
    id: data.id,
    chatId: data.roomId,
    userId: data.userId,
    role: normalizeRole(data.role),
    mutedUntil: data.isMuted ? new Date() : null,
    isArchived: false,
    joinedAt: data.joinedAt ?? new Date(),
  }
}

export class PrismaMessengerMemberRepository
  implements MessengerMemberRepositoryPort
{
  private readonly delegate: PrismaModelDelegate

  constructor(private readonly prisma: PrismaClient) {
    this.delegate = getPrismaDelegate(prisma, [
      "messengerMember",
      "chatMember",
      "member",
      "roomMember",
    ])
  }

  async save(member: MessengerMemberEntity): Promise<MessengerMemberEntity> {
    const data = toPersistence(member)

    if (this.delegate.upsert) {
      const saved = await this.delegate.upsert({
        where: {
          chatId_userId: {
            chatId: data.chatId,
            userId: data.userId,
          },
        },
        create: data,
        update: {
          role: data.role,
          mutedUntil: data.mutedUntil ?? null,
          isArchived: data.isArchived ?? false,
        },
      })

      return mapToEntity(saved)
    }

    const existing = await this.findByRoomAndUser(data.chatId, data.userId)

    if (existing && this.delegate.update) {
      const saved = await this.delegate.update({
        where: { id: existing.toJSON().id },
        data: {
          role: data.role,
          mutedUntil: data.mutedUntil ?? null,
          isArchived: data.isArchived ?? false,
        },
      })

      return mapToEntity(saved)
    }

    const saved = await this.delegate.create({ data })
    return mapToEntity(saved)
  }

  async findById(id: string): Promise<MessengerMemberEntity | null> {
    const record = await this.delegate.findUnique({
      where: { id },
    })

    return record ? mapToEntity(record) : null
  }

  async findByRoomAndUser(
    roomId: string,
    userId: string,
  ): Promise<MessengerMemberEntity | null> {
    const records = await this.delegate.findMany({
      where: { chatId: roomId, userId },
      take: 1,
    })

    const record = records[0]
    return record ? mapToEntity(record) : null
  }

  async listByRoom(roomId: string): Promise<MessengerMemberEntity[]> {
    const records = await this.delegate.findMany({
      where: { chatId: roomId },
      orderBy: { joinedAt: "asc" },
    })

    return records.map(mapToEntity)
  }

  async deleteByRoomAndUser(roomId: string, userId: string): Promise<void> {
    const records = await this.delegate.findMany({
      where: { chatId: roomId, userId },
      take: 1,
    })

    const record = records[0]

    if (!record || !this.delegate.delete) {
      return
    }

    const id = asString(record.id)

    if (!id) {
      return
    }

    await this.delegate.delete({
      where: { id },
    })
  }
}