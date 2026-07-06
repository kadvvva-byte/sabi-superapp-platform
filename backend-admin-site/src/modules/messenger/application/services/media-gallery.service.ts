import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class MediaGalleryService {

  async getMedia(chatId: string) {

    return prisma.message.findMany({
      where: {
        chatId,
        mediaType: {
          in: ["IMAGE", "VIDEO"]
        },
        deletedAt: null
      },
      orderBy: {
        createdAt: "desc"
      }
    })

  }

  async getFiles(chatId: string) {

    return prisma.message.findMany({
      where: {
        chatId,
        mediaType: "FILE",
        deletedAt: null
      },
      orderBy: {
        createdAt: "desc"
      }
    })

  }

  async getVoice(chatId: string) {

    return prisma.message.findMany({
      where: {
        chatId,
        mediaType: "VOICE",
        deletedAt: null
      },
      orderBy: {
        createdAt: "desc"
      }
    })

  }

}