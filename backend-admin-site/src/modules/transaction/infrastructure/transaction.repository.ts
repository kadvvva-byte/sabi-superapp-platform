import { PrismaClient, TransactionType, TransactionStatus } from "@prisma/client"

const prisma = new PrismaClient()

export class TransactionRepository {

  async create(data: {
    fromWalletId?: string
    toWalletId?: string
    walletId: string
    amount: number
    type: TransactionType
    status: TransactionStatus
    reference?: string
  }) {

    return prisma.transaction.create({
      data: {
        walletId: data.walletId,
        fromWalletId: data.fromWalletId,
        toWalletId: data.toWalletId,
        amount: data.amount,
        type: data.type,
        status: data.status,
        reference: data.reference
      }
    })

  }

}