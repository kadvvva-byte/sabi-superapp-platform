import { PrismaClient, TransactionType, TransactionStatus } from "@prisma/client"
import { TransactionRepository } from "../../infrastructure/transaction.repository"

const prisma = new PrismaClient()

export class TransactionEngine {

  private transactionRepo = new TransactionRepository()

  async executeTransfer(data: {
  fromWalletId: string
  toWalletId: string
  amount: number
  reference?: string
}) {

  return prisma.$transaction(async (tx) => {

    const fromWallet = await tx.wallet.findUnique({
      where: { id: data.fromWalletId }
    })

    const toWallet = await tx.wallet.findUnique({
      where: { id: data.toWalletId }
    })

    if (!fromWallet || !toWallet) {
      throw new Error("Wallet not found")
    }

    const senderBalance = await tx.walletBalance.findUnique({
      where: { walletId: data.fromWalletId }
    })

    if (!senderBalance) {
      throw new Error("Sender balance not found")
    }

    if (Number(senderBalance.balance) < data.amount) {
      throw new Error("Insufficient balance")
    }

    const transaction = await tx.transaction.create({
      data: {
        walletId: data.fromWalletId,
        fromWalletId: data.fromWalletId,
        toWalletId: data.toWalletId,
        amount: data.amount,
        type: "TRANSFER",
        status: "PENDING",
        reference: data.reference
      }
    })

    const debitOperationId = `debit-${transaction.id}`
    const creditOperationId = `credit-${transaction.id}`

    await tx.ledgerEntry.create({
      data: {
        walletId: data.fromWalletId,
        transactionId: transaction.id,
        amount: data.amount,
        type: "DEBIT",
        operationType: "TRANSFER",
        uniqueOperationId: debitOperationId
      }
    })

    await tx.ledgerEntry.create({
      data: {
        walletId: data.toWalletId,
        transactionId: transaction.id,
        amount: data.amount,
        type: "CREDIT",
        operationType: "TRANSFER",
        uniqueOperationId: creditOperationId
      }
    })

    await tx.walletBalance.update({
      where: { walletId: data.fromWalletId },
      data: {
        balance: {
          decrement: data.amount
        }
      }
    })

    await tx.walletBalance.update({
      where: { walletId: data.toWalletId },
      data: {
        balance: {
          increment: data.amount
        }
      }
    })

    await tx.transaction.update({
      where: { id: transaction.id },
      data: {
        status: "SUCCESS"
      }
    })

    return transaction

   })

  }

}