import { prisma } from "../../../../infrastructure/prisma/prisma.client"

export class GroupMemberService {

  async addMember(chatId: string, userId: string) {

    const member = await prisma.chatMember.create({
      data: {
        chatId,
        userId,
        role: "MEMBER"
      }
    })

    return member

  }

  async removeMember(chatId: string, userId: string) {

    await prisma.chatMember.deleteMany({
      where: {
        chatId,
        userId
      }
    })

    return { success: true }

  }

}