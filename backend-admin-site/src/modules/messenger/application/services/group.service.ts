import { randomUUID } from "crypto"
import { prisma } from "../../../../infrastructure/prisma/prisma.client"

export class GroupService {

  async createGroup(title: string, ownerId: string) {

    const group = await prisma.chat.create({
      data: {
        id: randomUUID(),
        title,
        type: "GROUP",

        members: {
          create: {
            userId: ownerId,
            role: "ADMIN"
          }
        }
      }
    })

    return group

  }

}