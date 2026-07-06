import { prisma } from "../../../../infrastructure/prisma/prisma.client"

export class MessageSearchService {

  async search(chatId: string, query: string) {

    const messages = await prisma.message.findMany({
      where: {
        chatId,
        content: {
          contains: query,
          mode: "insensitive"
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 50
    })

    return messages

  }

}