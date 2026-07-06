import { prisma } from "../../../../infrastructure/prisma"
import { randomUUID } from "crypto"

export class WalletLedgerService {

  async debit(
    walletId: string,
    transactionId: string,
    amount: number
  ) {

    await prisma.ledgerEntry.create({
      data: {
        walletId: walletId,
        transactionId: transactionId,

        amount: amount,
        type: "DEBIT",

        operationType: "TRANSFER",
        uniqueOperationId: randomUUID()
      }
    })

  }

  async credit(
    walletId: string,
    transactionId: string,
    amount: number
  ) {

    await prisma.ledgerEntry.create({
      data: {
        walletId: walletId,
        transactionId: transactionId,

        amount: amount,
        type: "CREDIT",

        operationType: "TRANSFER",
        uniqueOperationId: randomUUID()
      }
    })

  }

}