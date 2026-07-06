import { prisma } from "../../../../infrastructure/prisma"
import { randomUUID } from "crypto"

export class WalletBalanceService {

  async credit(walletId: string, transactionId: string, amount: number) {

    await prisma.ledgerEntry.create({
      data: {
        wallet: { connect: { id: walletId } },
        transaction: { connect: { id: transactionId } },

        amount,
        type: "CREDIT",

        operationType: "TRANSFER",
        uniqueOperationId: randomUUID()
      }
    })

    await prisma.walletBalance.update({
      where: { walletId },
      data: {
        balance: { increment: amount }
      }
    })

  }

  async debit(walletId: string, transactionId: string, amount: number) {

    await prisma.ledgerEntry.create({
      data: {
        wallet: { connect: { id: walletId } },
        transaction: { connect: { id: transactionId } },

        amount,
        type: "DEBIT",

        operationType: "TRANSFER",
        uniqueOperationId: randomUUID()
      }
    })

    await prisma.walletBalance.update({
      where: { walletId },
      data: {
        balance: { decrement: amount }
      }
    })

  }

}