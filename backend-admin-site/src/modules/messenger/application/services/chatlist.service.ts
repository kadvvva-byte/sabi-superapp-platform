import { PrismaClient } from "@prisma/client"

export class ChatListService {

  constructor(private prisma: PrismaClient) {}

  async updateChatLastMessage(chatId: string) {

    const lastMessage = await this.prisma.message.findFirst({
      where: { chatId },
      orderBy: { createdAt: "desc" }
    })

    if (!lastMessage) return

    await this.prisma.chat.update({
      where: { id: chatId },
      data: {
        updatedAt: new Date()
      }
    })

  }

}