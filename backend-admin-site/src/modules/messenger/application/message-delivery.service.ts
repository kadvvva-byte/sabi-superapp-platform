import { prisma } from "../../../config/prisma"

export class MessageDeliveryService {

  async markDelivered(messageId: string) {

    return prisma.message.update({
      where: { id: messageId },
      data: {
        deliveredAt: new Date()
      }
    })

  }

  async markRead(messageId: string) {

    return prisma.message.update({
      where: { id: messageId },
      data: {
        readAt: new Date()
      }
    })

  }

}