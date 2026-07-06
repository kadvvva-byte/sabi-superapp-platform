import { PrismaClient } from "@prisma/client"
import { ChatListService as BaseChatListService } from "./services/chat-list.service"

declare global {
  var __messengerCompatPrisma: PrismaClient | undefined
}

function getCompatPrisma() {
  if (!globalThis.__messengerCompatPrisma) {
    globalThis.__messengerCompatPrisma = new PrismaClient()
  }

  return globalThis.__messengerCompatPrisma
}

export class ChatListService extends BaseChatListService {
  constructor(prisma: PrismaClient = getCompatPrisma()) {
    super(prisma)
  }

  async getUserChats(userId: string) {
    const self = this as any

    if (typeof self.listUserChats === "function") {
      return await self.listUserChats(userId)
    }

    if (typeof self.getChats === "function") {
      return await self.getChats(userId)
    }

    if (typeof self.getChatList === "function") {
      return await self.getChatList(userId)
    }

    return []
  }
}