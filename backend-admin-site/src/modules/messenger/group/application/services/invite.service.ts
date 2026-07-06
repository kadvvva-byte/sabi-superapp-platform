import { PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"

const prisma = new PrismaClient()

export class InviteService {

  async createInvite(chatId: string, createdBy: string) {

    const code = nanoid(10)

    return prisma.chatInvite.create({
      data: {
        chatId,
        createdBy,
        code,
        usedCount: 0
      }
    })

  }

  async revokeInvite(code: string) {

    return prisma.chatInvite.update({
      where: { code },
      data: {
        expiresAt: new Date()
      }
    })

  }

  async joinByInvite(code: string, userId: string) {

    const invite = await prisma.chatInvite.findUnique({
      where: { code }
    })

    if (!invite) {
      throw new Error("Invite not found")
    }

    if (invite.usageLimit && invite.usedCount >= invite.usageLimit) {
      throw new Error("Invite limit reached")
    }

    if (invite.expiresAt && invite.expiresAt < new Date()) {
      throw new Error("Invite expired")
    }

    const member = await prisma.chatMember.create({
      data: {
        chatId: invite.chatId,
        userId,
        role: "MEMBER"
      }
    })

    await prisma.chatInvite.update({
      where: { code },
      data: {
        usedCount: invite.usedCount + 1
      }
    })

    return member
  }

}