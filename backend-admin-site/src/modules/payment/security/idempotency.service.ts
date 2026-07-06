import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

export class IdempotencyService {

  constructor(private prisma: PrismaClient) {}

  async find(key: string) {
    return this.prisma.idempotencyKey.findUnique({
      where: { key }
    })
  }

  generateRequestHash(data: any): string {
    return crypto
      .createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex")
  }

  async save(key: string, request: any, response: any) {

    const requestHash = this.generateRequestHash(request)

    return this.prisma.idempotencyKey.create({
      data: {
        key,
        requestHash,
        responseBody: response
      }
    })
  }

}