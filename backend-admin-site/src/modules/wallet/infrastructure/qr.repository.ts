import { prisma } from "../../../infrastructure/prisma/prisma.client"

export class QrRepository {

  async create(data: any) {
    return prisma.qr.create({ data })
  }

  async findById(id: string) {
    return prisma.qr.findUnique({
      where: { id }
    })
  }

  async markUsed(id: string) {

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