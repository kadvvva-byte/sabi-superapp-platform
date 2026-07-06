import { PrismaClient } from "@prisma/client"

export class ChatListService {

  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async getChatList(userId: string) {

    const chats = await this.prisma.chatMember.findMany({

      where: {
        userId
      },

      include: {

        chat: {
          include: {

            messages: {
              orderBy: {
                createdAt: "desc"
              },
              take: 1
            }

          }
        }

      }

    })

    const result = await Promise.all(

      chats.map(async (cm: any) => {

        const lastMessage = cm.chat.messages[0]

        const unread = await this.prisma.message.count({

          where: {
            chatId: cm.chatId,
            userId: {
              not: userId
            },
            readAt: null
          }

        })

        return {
          chatId: cm.chat.id,
          title: cm.chat.title,
          type: cm.chat.type,
          lastMessage,
          unread
        }

      })

    )

    return result

  }

}