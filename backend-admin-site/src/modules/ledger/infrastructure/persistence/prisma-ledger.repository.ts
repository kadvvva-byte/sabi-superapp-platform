import { PrismaClient, LedgerEntryType, LedgerOperationType } from "@prisma/client"

const prisma = new PrismaClient()

export class PrismaLedgerRepository {

  async createEntry(entry: {
    walletId: string
    transactionId: string
    amount: number
    type: LedgerEntryType
    operationType: LedgerOperationType
    uniqueOperationId: string
  }) {

    return prisma.ledgerEntry.create({
      data: {
        walletId: entry.walletId,
        transactionId: entry.transactionId,
        amount: entry.amount,
        type: entry.type,
        operationType: entry.operationType,
        uniqueOperationId: entry.uniqueOperationId
      }
    })

  }

}