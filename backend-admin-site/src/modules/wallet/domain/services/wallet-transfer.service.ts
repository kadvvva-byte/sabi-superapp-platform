import { prisma } from "../../../../infrastructure/prisma"
import { randomUUID } from "crypto"

export class WalletTransferService {

  async transfer(fromWallet: string, toWallet: string, amount: number) {

    const transactionId = randomUUID()

    await prisma.$transaction(async (tx) => {

      await tx.ledgerEntry.create({
        data: {
          wallet: { connect: { id: fromWallet } },
          transaction: { connect: { id: transactionId } },

          amount,
          type: "DEBIT",

          operationType: "TRANSFER",
          uniqueOperationId: randomUUID()
        }
      })

      await tx.walletBalance.update({
        where: { walletId: fromWallet },
        data: { balance: { decrement: amount } }
      })

      await tx.ledgerEntry.create({
        data: {
          wallet: { connect: { id: toWallet } },
          transaction: { connect: { id: transactionId } },

          amount,
          type: "CREDIT",

          operationType: "TRANSFER",
          uniqueOperationId: randomUUID()
        }
      })

      await tx.walletBalance.update({
        where: { walletId: toWallet },
        data: { balance: { increment: amount } }
      })

    })

  }

}