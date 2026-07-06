import { prisma } from "../../../../../../core/prisma/prisma.client"
import { nanoid } from "nanoid"

export class BotService {

  async createBot(ownerId: string, name: string, username: string) {

    const token = nanoid(32)

    return prisma.bot.create({
      data: {
        ownerId,
        name,
        username,
        token
      }
    })

  }

  async listBots(ownerId: string) {

    return prisma.bot.findMany({
      where: { ownerId }
    })

  }

}