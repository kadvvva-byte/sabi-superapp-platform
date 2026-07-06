import { PrismaClient } from "@prisma/client"

export class IdempotencyService {

  constructor(private prisma: PrismaClient) {}

  async check(key: string) {

    return this.prisma.idempotencyKey.findUnique({
      where: { key }
    })

  }

  async store(
    key: string,
    requestHash: string,
    responseBody: any
  ) {

    return this.prisma.idempotencyKey.create({
      data: {
        key,
        requestHash,
        responseBody
      }
    })

  }

}