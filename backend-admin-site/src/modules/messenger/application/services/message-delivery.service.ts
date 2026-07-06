import { PrismaClient } from "@prisma/client"

export class MessageDeliveryService {

  constructor(private prisma: PrismaClient) {}

  //////////////////////////////////////////////////////
  // MESSAGE DELIVERED
  //////////////////////////////////////////////////////

  async markDelivered(messageId: string) {

    return this.prisma.message.update({
      where: { id: messageId },
      data: {
        deliveredAt: new Date()
      }
    })

  }

  //////////////////////////////////////////////////////
  // MESSAGE READ
  //////////////////////////////////////////////////////

  async markRead(messageId: string) {

    return this.prisma.message.update({
      where: { id: messageId },
      data: {
        readAt: new Date()
      }
    })

  }

}