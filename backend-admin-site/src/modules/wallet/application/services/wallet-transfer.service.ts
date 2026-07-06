import { prisma } from "../../../../config/prisma"
import { randomUUID } from "crypto"

export class WalletTransferService {

  async transfer(
    fromWalletId: string,
    toWalletId: string,
    amount: number
  ) {

    if (fromWalletId === toWalletId) {
      throw new Error("Cannot transfer to same wallet")
    }

    if (amount <= 0) {
      throw new Error("Invalid amount")
    }

    return prisma.$transaction(async (tx) => {

      const fromBalance = await tx.walletBalance.findUnique({
        where: { walletId: fromWalletId }
      })

      if (!fromBalance) {
        throw new Error("Sender balance not found")
      }

      if (Number(fromBalance.balance) < amount) {
        throw new Error("Insufficient balance")
      }

      const toBalance = await tx.walletBalance.findUnique({
        where: { walletId: toWalletId }
      })

      if (!toBalance) {
        throw new Error("Receiver balance not found")
      }

      await tx.walletBalance.update({
        where: { walletId: fromWalletId },
        data: {
          balance: Number(fromBalance.balance) - amount
        }
      })

      await tx.walletBalance.update({
        where: { walletId: toWalletId },
        data: {
          balance: Number(toBalance.balance) + amount
        }
      })

      const transaction = await tx.transaction.create({
        data: {
          amount: amount,
          type: "TRANSFER",
          status: "SUCCESS",
          wallet: {
            connect: { id: fromWalletId }
          }
        }
      })

      await tx.ledgerEntry.create({
        data: {
          wallet: {
            connect: { id: fromWalletId }
          },
          transaction: {
            connect: { id: transaction.id }
          },
          amount: amount,
          type: "DEBIT",
          operationType: "TRANSFER",
          uniqueOperationId: randomUUID(),
          createdAt: new Date()
        }
      })

      await tx.ledgerEntry.create({
        data: {
          wallet: {
            connect: { id: toWalletId }
          },
          transaction: {
            connect: { id: transaction.id }
          },
          amount: amount,
          type: "CREDIT",
          operationType: "TRANSFER",
          uniqueOperationId: randomUUID(),
          createdAt: new Date()
        }
      })

      return transaction

    })

  }

}