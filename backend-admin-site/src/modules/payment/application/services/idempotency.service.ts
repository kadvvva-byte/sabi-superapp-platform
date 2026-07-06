import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class PaymentIdempotencyService {

  async get(key: string) {
    return prisma.idempotencyKey.findUnique({
      where: { key }
    })
  }

  async create(
    key: string,
    requestHash: string
  ) {
    return prisma.idempotencyKey.create({
      data: {
        key,
        requestHash,
        responseBody: ""
      }
    })
  }

  async saveResponse(
    key: string,
    response: any
  ) {
    return prisma.idempotencyKey.update({
      where: { key },
      data: {
        responseBody: JSON.stringify(response)
      }
    })
  }

}