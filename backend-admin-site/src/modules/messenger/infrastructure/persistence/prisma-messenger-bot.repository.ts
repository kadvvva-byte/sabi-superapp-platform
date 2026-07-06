import { PrismaClient } from "@prisma/client"

import { MessengerBotEntity } from "../../domain/entities/messenger-bot.entity"
import type { MessengerBotRepositoryPort } from "../../application/ports/messenger-bot.repository.port"
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

function mapToEntity(record: PrismaRecord): MessengerBotEntity {
  return new MessengerBotEntity({
    id: asString(record.id) ?? "",
    ownerUserId: asString(record.ownerUserId) ?? "",
    title: asString(record.title) ?? "",
    username: asString(record.username),
    description: asString(record.description),
    avatarUrl: asString(record.avatarUrl),
    webhookUrl: asString(record.webhookUrl),
    isActive: asBoolean(record.isActive, true),
    createdAt: asDate(record.createdAt),
    updatedAt: asDate(record.updatedAt),
  })
}

export class PrismaMessengerBotRepository implements MessengerBotRepositoryPort {
  private readonly delegate: PrismaModelDelegate

  constructor(private readonly prisma: PrismaClient) {
    this.delegate = getPrismaDelegate(prisma, [
      "messengerBot",
      "bot",
      "chatBot",
    ])
  }

  async save(bot: MessengerBotEntity): Promise<MessengerBotEntity> {
    const data = bot.toJSON()

    if (this.delegate.upsert) {
      const saved = await this.delegate.upsert({
        where: { id: bot.id },
        create: data,
        update: data,
      })

      return mapToEntity(saved)
    }

    const existing = await this.delegate.findUnique({
      where: { id: bot.id },
    })

    if (existing && this.delegate.update) {
      const saved = await this.delegate.update({
        where: { id: bot.id },
        data,
      })

      return mapToEntity(saved)
    }

    const saved = await this.delegate.create({ data })
    return mapToEntity(saved)
  }

  async findById(id: string): Promise<MessengerBotEntity | null> {
    const record = await this.delegate.findUnique({
      where: { id },
    })

    return record ? mapToEntity(record) : null
  }

  async findByUsername(username: string): Promise<MessengerBotEntity | null> {
    const record = await this.delegate.findUnique({
      where: { username },
    })

    return record ? mapToEntity(record) : null
  }

  async listByOwner(ownerUserId: string): Promise<MessengerBotEntity[]> {
    const records = await this.delegate.findMany({
      where: { ownerUserId },
      orderBy: { createdAt: "desc" },
    })

    return records.map(mapToEntity)
  }
}