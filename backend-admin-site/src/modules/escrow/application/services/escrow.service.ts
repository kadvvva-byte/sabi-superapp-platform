import { PrismaClient } from "@prisma/client"
import { TransactionEngineService } from "../../../wallet/application/services/transaction-engine.service"

const prisma = new PrismaClient()

export class EscrowService {

  private engine = new TransactionEngineService()

  async createEscrow(
    buyerWalletId: string,
    sellerWalletId: string,
    amount: number
  ) {

    const result = await this.engine.transfer(
      buyerWalletId,
      sellerWalletId,
      amount
    )

    const escrow = await prisma.escrow.create({
      data: {
        buyerWalletId,
        sellerWalletId,
        amount,
        status: "LOCKED",
        transactionId: result.transaction.id
      }
    })

    return escrow
  }

  async releaseEscrow(escrowId: string) {

    const escrow = await prisma.escrow.findUnique({
      where: { id: escrowId }
    })

    if (!escrow) {
      throw new Error("Escrow not found")
    }

    await prisma.escrow.update({
      where: { id: escrowId },
      data: {
        status: "RELEASED"
      }
    })

    return { success: true }
  }

  async refundEscrow(escrowId: string) {

    const escrow = await prisma.escrow.findUnique({
      where: { id: escrowId }
    })

    if (!escrow) {
      throw new Error("Escrow not found")
    }

    await this.engine.transfer(
      escrow.sellerWalletId,
      escrow.buyerWalletId,
      Number(escrow.amount)
    )

    await prisma.escrow.update({
      where: { id: escrowId },
      data: {
        status: "REFUNDED"
      }
    })

    return { success: true }
  }

}