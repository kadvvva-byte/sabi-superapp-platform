import { PrismaClient } from "@prisma/client"

export class UnreadService {

  constructor(private prisma: PrismaClient) {}

  async countUnread(chatId: string, userId: string) {

    const count = await this.prisma.message.count({
      where: {
        chatId,
        userId: {
          not: userId
        },
        readAt: null
      }
    })

    return count
  }

}