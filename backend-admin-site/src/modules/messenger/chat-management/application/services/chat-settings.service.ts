import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class ChatSettingsService {

  async muteChat(chatId: string, userId: string) {

    return prisma.chatUserSettings.upsert({
      where: {
        chatId_userId: {
          chatId,
          userId
        }
      },
      update: {
        muted: true
      },
      create: {
        chatId,
        userId,
        muted: true
      }
    })

  }

  async archiveChat(chatId: string, userId: string) {

    return prisma.chatUserSettings.upsert({
      where: {
        chatId_userId: {
          chatId,
          userId
        }
      },
      update: {
        archived: true
      },
      create: {
        chatId,
        userId,
        archived: true
      }
    })

  }

  async pinChat(chatId: string, userId: string) {

    return prisma.chatUserSettings.upsert({
      where: {
        chatId_userId: {
          chatId,
          userId
        }
      },
      update: {
        pinned: true
      },
      create: {
        chatId,
        userId,
        pinned: true
      }
    })

  }

}