import { PrismaClient } from "@prisma/client"

export class IdempotencyRepository {

  constructor(private prisma: PrismaClient) {}

  async find(key: string) {
    return this.prisma.idempotencyKey.findUnique({
      where: { key }
    })
  }

  async save(key: string, response: any) {

    return this.prisma.idempotencyKey.create({
      data: {
        key: key,
        requestHash: "",

        responseBody: JSON.stringify(response)
      }
    })

  }

}