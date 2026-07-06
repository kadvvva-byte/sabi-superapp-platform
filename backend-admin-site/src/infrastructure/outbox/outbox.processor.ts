import { PrismaClient } from "@prisma/client"

export class OutboxProcessor {

  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async process() {

    const events = await this.prisma.outbox.findMany({
      where: {
        processedAt: null
      }
    })

    for (const event of events) {
      await this.handleEvent(event)
    }
  }

  private async handleEvent(event: any) {

    console.log("Processing event:", event.eventType)

    await this.prisma.outbox.update({
      where: {
        id: event.id
      },
      data: {
        processedAt: new Date()
      }
    })
  }

}