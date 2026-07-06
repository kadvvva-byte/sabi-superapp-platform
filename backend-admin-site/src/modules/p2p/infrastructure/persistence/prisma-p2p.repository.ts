import { P2PRepository } from "../../domain/repositories/p2p.repository"
import { P2PTransfer } from "../../domain/entities/p2p-transfer.entity"
import { prisma } from "../../../../infrastructure/prisma/prisma.client"

export class PrismaP2PRepository implements P2PRepository {

  async save(transfer: P2PTransfer): Promise<void> {

    await prisma.p2PTransfer.create({
      data: {
        id: transfer.id,

        fromUserId: transfer.fromWalletId,
        toUserId: transfer.toWalletId,

        fromWalletId: transfer.fromWalletId,
        toWalletId: transfer.toWalletId,

        amount: transfer.amount,
        status: transfer.status,

        createdAt: transfer.createdAt
      }
    })

  }

  async findById(id: string): Promise<P2PTransfer | null> {

    const data = await prisma.p2PTransfer.findUnique({
      where: { id }
    })

    if (!data) return null

    return new P2PTransfer(
      data.id,
      data.fromWalletId,
      data.toWalletId,
      Number(data.amount),
      data.status as any,
      data.createdAt
    )

  }

}