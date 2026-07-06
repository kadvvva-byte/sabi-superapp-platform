import { prisma } from "../../../../infrastructure/prisma/prisma.client"
export class PrismaQrRepository {

  async createQR(data: any) {
    return prisma.qr.create({
      data
    })
  }

  async findById(id: string) {
    return prisma.qr.findUnique({
      where: { id }
    })
  }

  async incrementUsage(id: string) {
    return prisma.qr.update({
      where: { id },
      data: {
        usedCount: {
          increment: 1
        }
      }
    })
  }

}