import { PrismaClient } from "@prisma/client"

import { MessengerInviteEntity } from "../../domain/entities/messenger-invite.entity"
import type { MessengerInviteRepositoryPort } from "../../application/ports/messenger-invite.repository.port"
import {
  type PrismaModelDelegate,
  type PrismaRecord,
  getPrismaDelegate,
} from "./prisma-messenger-delegate"

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

function asDate(value: unknown, fallback = new Date()): Date {
  if (value instanceof Date) return value
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  return fallback
}

function mapToEntity(record: PrismaRecord): MessengerInviteEntity {
  return new MessengerInviteEntity({
    id: asString(record.id) ?? "",
    roomId: asString(record.roomId) ?? "",
    code: asString(record.code) ?? "",
    createdByUserId: asString(record.createdByUserId) ?? "",
    createdAt: asDate(record.createdAt),
    updatedAt: asDate(record.updatedAt),
    targetUserId: asString(record.targetUserId),
    expiresAt: record.expiresAt ? asDate(record.expiresAt) : null,
    revokedAt: record.revokedAt ? asDate(record.revokedAt) : null,
    maxUses: asNumber(record.maxUses),
    usesCount: asNumber(record.usesCount) ?? 0,
  })
}

export class PrismaMessengerInviteRepository
  implements MessengerInviteRepositoryPort
{
  private readonly delegate: PrismaModelDelegate

  constructor(private readonly prisma: PrismaClient) {
    this.delegate = getPrismaDelegate(prisma, [
      "messengerInvite",
      "chatInvite",
      "roomInvite",
      "invite",
    ])
  }

  async save(invite: MessengerInviteEntity): Promise<MessengerInviteEntity> {
    const data = invite.toJSON()

    if (this.delegate.upsert) {
      const saved = await this.delegate.upsert({
        where: { id: invite.id },
        create: data,
        update: data,
      })

      return mapToEntity(saved)
    }

    const existing = await this.delegate.findUnique({
      where: { id: invite.id },
    })

    if (existing && this.delegate.update) {
      const saved = await this.delegate.update({
        where: { id: invite.id },
        data,
      })

      return mapToEntity(saved)
    }

    const saved = await this.delegate.create({ data })
    return mapToEntity(saved)
  }

  async findById(id: string): Promise<MessengerInviteEntity | null> {
    const record = await this.delegate.findUnique({
      where: { id },
    })

    return record ? mapToEntity(record) : null
  }

  async findByCode(code: string): Promise<MessengerInviteEntity | null> {
    const record = await this.delegate.findUnique({
      where: { code },
    })

    return record ? mapToEntity(record) : null
  }

  async listByRoom(roomId: string): Promise<MessengerInviteEntity[]> {
    const records = await this.delegate.findMany({
      where: { roomId },
      orderBy: { createdAt: "desc" },
    })

    return records.map(mapToEntity)
  }
}