import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class FolderService {

  async createFolder(userId: string, name: string) {

    return prisma.chatFolder.create({
      data: {
        userId,
        name
      }
    })

  }

  async addChatToFolder(folderId: string, chatId: string) {

    return prisma.chatFolderItem.create({
      data: {
        folderId,
        chatId
      }
    })

  }

  async removeChatFromFolder(folderId: string, chatId: string) {

    return prisma.chatFolderItem.delete({
      where: {
        folderId_chatId: {
          folderId,
          chatId
        }
      }
    })

  }

}