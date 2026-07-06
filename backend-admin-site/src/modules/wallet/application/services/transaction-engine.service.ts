import { PrismaClient } from "@prisma/client"
import { FraudService } from "../../../fraud/application/services/fraud.service"

const prisma = new PrismaClient()

export class TransactionEngineService {

  private fraudService = new FraudService()

  async transfer(
    fromWalletId: string,
    toWalletId: string,
    amount: number
  ) {

    if (amount <= 0) {
      throw new Error("Invalid amount")
    }

    await this.fraudService.checkTransaction({
      fromWalletId,
      toWalletId,
      amount
    })

    const fromBalance = await prisma.walletBalance.findUnique({
      where: { walletId: fromWalletId }
    })

    const toBalance = await prisma.walletBalance.findUnique({
      where: { walletId: toWalletId }
    })

    if (!fromBalance || !toBalance) {
      throw new Error("Wallet balance not found")
    }

    if (Number(fromBalance.balance) < amount) {
      throw new Error("Insufficient balance")
    }

    const result = await prisma.$transaction(async (tx) => {

      const updatedFrom = await tx.walletBalance.update({
        where: { walletId: fromWalletId },
        data: {
          balance: Number(fromBalance.balance) - amount
        }
      })

      const updatedTo = await tx.walletBalance.update({
        where: { walletId: toWalletId },
        data: {
          balance: Number(toBalance.balance) + amount
        }
      })

      const transaction = await tx.transaction.create({
        data: {
          walletId: fromWalletId,
          type: "TRANSFER",
          status: "SUCCESS",
          amount
        }
      })

      return {
        updatedFrom,
        updatedTo,
        transaction
      }

    })

    return result
  }

}