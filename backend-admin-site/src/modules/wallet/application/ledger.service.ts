import { prisma } from "../../../infrastructure/prisma"
import { LedgerEntryType } from "@prisma/client"
import { randomUUID } from "crypto"

export class LedgerService {

  async debit(
    walletId: string,
    transactionId: string,
    amount: number
  ) {

    await prisma.ledgerEntry.create({
      data: {
        wallet: {
          connect: { id: walletId }
        },
        transaction: {
          connect: { id: transactionId }
        },
        amount: amount,
        type: LedgerEntryType.DEBIT,

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
        wallet: {
          connect: { id: walletId }
        },
        transaction: {
          connect: { id: transactionId }
        },
        amount: amount,
        type: LedgerEntryType.CREDIT,

        operationType: "TRANSFER",
        uniqueOperationId: randomUUID()
      }
    })

  }

}