import { PrismaClient } from "@prisma/client"

export class MediaService {

  constructor(private prisma: PrismaClient) {}

  async saveMediaMessage(data: {
    chatId: string
    userId: string
    mediaUrl: string
    mediaType: "IMAGE" | "VIDEO" | "FILE" | "VOICE"
  }) {

    const message = await this.prisma.message.create({
      data: {
        chatId: data.chatId,
        userId: data.userId,
        type: "TEXT",
        mediaType: data.mediaType,
        mediaUrl: data.mediaUrl
      }
    })

    return message
  }

}