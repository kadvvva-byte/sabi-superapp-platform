import { PrismaClient } from "@prisma/client"

export class ReactionService {

  constructor(private prisma: PrismaClient) {}

  async react(messageId: string, userId: string, reaction: string) {

    const existing = await this.prisma.messageReaction.findUnique({
      where: {
        messageId_userId: {
          messageId,
          userId
        }
      }
    })

    if (existing) {

      return this.prisma.messageReaction.update({
        where: { id: existing.id },
        data: { reaction }
      })

    }

    return this.prisma.messageReaction.create({
      data: {
        messageId,
        userId,
        reaction
      }
    })

  }

}