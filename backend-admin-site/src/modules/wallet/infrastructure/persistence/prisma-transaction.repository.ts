import { PrismaClient, TransactionType, TransactionStatus } from "@prisma/client"
import { TransactionRepository } from "../../domain/repositories/transaction.repository"
import { Transaction } from "../../domain/entities/transaction"

export class PrismaTransactionRepository implements TransactionRepository {

  constructor(private prisma: PrismaClient) {}

  async create(transaction: Transaction): Promise<void> {
    const snapshot = transaction.toJSON()

    await this.prisma.transaction.create({
      data: {
        id: transaction.transactionId,
        amount: transaction.amount,
        type: transaction.type as TransactionType,
        status: TransactionStatus.SUCCESS,
        createdAt: snapshot.createdAt ?? new Date(),

        wallet: {
          connect: {
            id: transaction.walletId
          }
        }
      }
    })

  }

  async save(transaction: Transaction): Promise<void> {
    const snapshot = transaction.toJSON()

    await this.prisma.transaction.create({
      data: {
        id: transaction.transactionId,
        amount: transaction.amount,
        type: transaction.type as TransactionType,
        status: TransactionStatus.SUCCESS,
        createdAt: snapshot.createdAt ?? new Date(),

        wallet: {
          connect: {
            id: transaction.walletId
          }
        }
      }
    })

  }

  async findByWallet(walletId: string): Promise<Transaction[]> {

    const txs = await this.prisma.transaction.findMany({
      where: { walletId }
    })

    return txs.map(t =>
      new Transaction(
        t.id,
        t.walletId,
        Number(t.amount),
        t.type as any,
        t.createdAt
      )
    )

  }

}