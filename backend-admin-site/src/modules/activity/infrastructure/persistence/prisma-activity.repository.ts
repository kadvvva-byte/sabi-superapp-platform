import { prisma } from "../../../../infrastructure/prisma/prisma.client"

export class PrismaActivityRepository {

  async createActivity(data: {
    userId: string
    type: string
    message: string
  }) {

    return prisma.activityFeed.create({
      data: {
        userId: data.userId,
        type: data.type,
        data: {
          message: data.message
        }
      }
    })

  }

}