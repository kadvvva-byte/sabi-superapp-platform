import { PrismaClient } from "@prisma/client"
import { MessagePaginationService as BaseMessagePaginationService } from "./services/message-pagination.service"

declare global {
  var __messengerCompatPrisma: PrismaClient | undefined
}

function getCompatPrisma() {
  if (!globalThis.__messengerCompatPrisma) {
    globalThis.__messengerCompatPrisma = new PrismaClient()
  }

  return globalThis.__messengerCompatPrisma
}

export class MessagePaginationService {
  private readonly base: BaseMessagePaginationService

  constructor(prisma: PrismaClient = getCompatPrisma()) {
    this.base = new BaseMessagePaginationService(prisma)
  }

  async getMessages(
    chatIdOrData:
      | string
      | {
          chatId: string
          cursor?: string
          limit?: number
        },
    cursor?: string,
    limit: number = 20,
  ) {
    if (typeof chatIdOrData === "string") {
      const chatId = chatIdOrData
      const baseAny = this.base as any

      if (typeof baseAny.getMessages === "function") {
        return await baseAny.getMessages(chatId, cursor, limit)
      }

      if (typeof baseAny.paginate === "function") {
        return await baseAny.paginate(chatId, cursor, limit)
      }

      return []
    }

    const data = chatIdOrData
    const baseAny = this.base as any

    if (typeof baseAny.getMessages === "function") {
      return await baseAny.getMessages(data.chatId, data.cursor, data.limit ?? 20)
    }

    if (typeof baseAny.paginate === "function") {
      return await baseAny.paginate(data.chatId, data.cursor, data.limit ?? 20)
    }

    if (typeof baseAny.execute === "function") {
      return await baseAny.execute(data)
    }

    return []
  }
}