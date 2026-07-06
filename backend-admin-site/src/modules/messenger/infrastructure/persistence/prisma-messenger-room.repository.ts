import { PrismaClient } from "@prisma/client"

import { MessengerRoomEntity } from "../../domain/entities/messenger-room.entity"
import type { MessengerRoomRepositoryPort } from "../../application/ports/messenger-room.repository.port"
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

function normalizeRoomKind(
  value: unknown,
): "PRIVATE" | "GROUP" | "CHANNEL" | "BOT_DIALOG" {
  return value === "PRIVATE" ||
    value === "GROUP" ||
    value === "CHANNEL" ||
    value === "BOT_DIALOG"
    ? value
    : "GROUP"
}

function normalizePersistenceType(
  value: unknown,
): "PRIVATE" | "GROUP" | "CHANNEL" {
  return value === "PRIVATE" || value === "GROUP" || value === "CHANNEL"
    ? value
    : "PRIVATE"
}

function mapToEntity(record: PrismaRecord): MessengerRoomEntity {
  const rawKind =
    "type" in record && typeof record.type !== "undefined"
      ? record.type
      : record.kind

  return new MessengerRoomEntity({
    id: asString(record.id) ?? "",
    kind: normalizeRoomKind(rawKind),
    title: asString(record.title) ?? "",
    createdByUserId:
      asString(record.createdByUserId) ?? asString(record.createdBy) ?? "",
    createdAt: asDate(record.createdAt),
    updatedAt: asDate(record.updatedAt),
    description: asString(record.description),
    username: asString(record.username),
    avatarUrl: asString(record.avatarUrl),
    isPublic: asBoolean(record.isPublic),
    allowMemberMessages: asBoolean(record.allowMemberMessages, true),
    allowComments: asBoolean(record.allowComments),
    isArchived: asBoolean(record.isArchived),
  })
}

type RoomPersistenceData = {
  id: string
  type: "PRIVATE" | "GROUP" | "CHANNEL"
  title: string | null
  avatarUrl: string | null
  createdBy: string | null
  createdAt: Date
  updatedAt: Date
}

function toPersistence(room: MessengerRoomEntity): RoomPersistenceData {
  const data = room.toJSON()

  return {
    id: data.id,
    type: normalizePersistenceType(data.kind),
    title:
      typeof data.title === "string" && data.title.trim().length > 0
        ? data.title.trim()
        : null,
    avatarUrl:
      typeof data.avatarUrl === "string" && data.avatarUrl.trim().length > 0
        ? data.avatarUrl.trim()
        : null,
    createdBy:
      typeof data.createdByUserId === "string" &&
      data.createdByUserId.trim().length > 0
        ? data.createdByUserId.trim()
        : null,
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  }
}

export class PrismaMessengerRoomRepository
  implements MessengerRoomRepositoryPort
{
  private readonly delegate: PrismaModelDelegate

  constructor(private readonly prisma: PrismaClient) {
    this.delegate = getPrismaDelegate(prisma, [
      "messengerRoom",
      "chatRoom",
      "room",
      "messengerChat",
      "chat",
      "conversation",
      "messengerConversation",
    ])
  }

  async save(room: MessengerRoomEntity): Promise<MessengerRoomEntity> {
    const data = toPersistence(room)

    if (this.delegate.upsert) {
      const saved = await this.delegate.upsert({
        where: { id: room.id },
        create: data,
        update: {
          type: data.type,
          title: data.title,
          avatarUrl: data.avatarUrl,
          createdBy: data.createdBy,
          updatedAt: data.updatedAt,
        },
      })

      return mapToEntity(saved)
    }

    const existing = await this.delegate.findUnique({
      where: { id: room.id },
    })

    if (existing && this.delegate.update) {
      const saved = await this.delegate.update({
        where: { id: room.id },
        data: {
          type: data.type,
          title: data.title,
          avatarUrl: data.avatarUrl,
          createdBy: data.createdBy,
          updatedAt: data.updatedAt,
        },
      })

      return mapToEntity(saved)
    }

    const saved = await this.delegate.create({ data })
    return mapToEntity(saved)
  }

  async findById(id: string): Promise<MessengerRoomEntity | null> {
    const record = await this.delegate.findUnique({
      where: { id },
    })

    return record ? mapToEntity(record) : null
  }

  async findByUsername(username: string): Promise<MessengerRoomEntity | null> {
    const records = await this.delegate.findMany({
      where: { username },
      take: 1,
    })

    const record = records[0]
    return record ? mapToEntity(record) : null
  }

  async listByCreator(createdByUserId: string): Promise<MessengerRoomEntity[]> {
    const records = await this.delegate.findMany({
      where: { createdBy: createdByUserId },
      orderBy: { createdAt: "desc" },
    })

    return records.map(mapToEntity)
  }
}