import { PrismaClient } from "@prisma/client"

export class PrismaOutboxRepository {

  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async publish(event: {
    aggregateId: string
    type: string
    payload: any
  }) {

    await this.prisma.outbox.create({
      data: {
        aggregateId: event.aggregateId,
        type: event.type,
        payload: event.payload,
        processedAt: null
      }
    })

  }

}