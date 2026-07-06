import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class ChatListUpdateService {

  async onMessageSent(
    chatId: string,
    senderId: string,
    text: string
  ) {

    const members = await prisma.chatMember.findMany({
      where: { chatId }
    })

    for (const member of members) {

      const isSender = member.userId === senderId

      await prisma.chatList.upsert({

        where: {
          userId_chatId: {
            userId: member.userId,
            chatId
          }
        },

        create: {
          userId: member.userId,
          chatId,
          lastMessageText: text,
          unreadCount: isSender ? 0 : 1
        },

        update: {
          lastMessageText: text,
          updatedAt: new Date(),
          unreadCount: isSender
            ? { set: 0 }
            : { increment: 1 }
        }

      })

    }

  }

  async markAsRead(userId: string, chatId: string) {

    await prisma.chatList.update({
      where: {
        userId_chatId: {
          userId,
          chatId
        }
      },

      data: {
        unreadCount: 0
      }
    })

  }

}