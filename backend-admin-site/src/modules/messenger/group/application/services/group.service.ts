import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class GroupService {

  async createGroup(data) {

    const chat = await prisma.chat.create({
      data: {
        type: "GROUP",
        title: data.title,
        members: {
          create: [
            {
              userId: data.creatorId,
              role: "ADMIN"
            },
            ...(data.memberIds || []).map(id => ({
              userId: id,
              role: "MEMBER"
            }))
          ]
        }
      }
    })

    return chat
  }

  async addMember(chatId: string, userId: string) {

    return prisma.chatMember.create({
      data: {
        chatId,
        userId,
        role: "MEMBER"
      }
    })

  }

  async removeMember(chatId: string, userId: string) {

    return prisma.chatMember.delete({
      where: {
        chatId_userId: {
          chatId,
          userId
        }
      }
    })

  }

  async promoteAdmin(chatId: string, userId: string) {

    return prisma.chatMember.update({
      where: {
        chatId_userId: {
         chatId,
         userId
        }
     },
      data: {
        role: "ADMIN"
      }
    })

  }

  async demoteAdmin(chatId: string, userId: string) {

    return prisma.chatMember.update({
      where: {
        chatId_userId: {
          chatId,
          userId
        }
      },
      data: {
        role: "MEMBER"
      }
    })

  }

}