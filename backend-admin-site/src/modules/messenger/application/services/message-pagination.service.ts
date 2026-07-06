import { PrismaClient } from "@prisma/client"

export class MessagePaginationService {

  constructor(private prisma: PrismaClient) {}

  async getMessages(data: {
    chatId: string
    cursor?: string
    limit?: number
  }) {

    const limit = data.limit ?? 20

    const messages = await this.prisma.message.findMany({

      where: {
        chatId: data.chatId
      },

      take: limit,

      skip: data.cursor ? 1 : 0,

      cursor: data.cursor
        ? { id: data.cursor }
        : undefined,

      orderBy: {
        createdAt: "desc"
      }

    })

    return messages

  }

}