import { PrismaClient } from "@prisma/client"

export class ReprocessDeadLetterUseCase {

  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async execute(id: string) {

    const dlq = await this.prisma.deadLetter.findUnique({
      where: {
        id
      }
    })

    if (!dlq) {
      throw new Error("Dead letter not found")
    }

    await this.prisma.outbox.create({
      data: {
        aggregateId: dlq.aggregateId,
        type: dlq.type,
        payload: dlq.payload ?? {},
        processedAt: null
      }
    })

    await this.prisma.deadLetter.delete({
      where: {
        id
      }
    })

  }

}