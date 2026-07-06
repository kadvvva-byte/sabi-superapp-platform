import { PrismaClient } from "@prisma/client"
import { ChatService as BaseChatService } from "./services/chat.service"

declare global {
  var __messengerCompatPrisma: PrismaClient | undefined
}

function getCompatPrisma() {
  if (!globalThis.__messengerCompatPrisma) {
    globalThis.__messengerCompatPrisma = new PrismaClient()
  }

  return globalThis.__messengerCompatPrisma
}

export class ChatService extends BaseChatService {
  constructor(prisma: PrismaClient = getCompatPrisma()) {
    super(prisma)
  }
}