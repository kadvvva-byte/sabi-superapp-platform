import { PrismaClient } from "@prisma/client"
import { WalletLedgerService } from "../domain/services/wallet-ledger.service"
import { randomUUID } from "crypto"

export class AtomicTransactionService {

  constructor(
    private prisma: PrismaClient,
    private ledger: WalletLedgerService
  ) {}

  async transfer(
    fromWalletId: string,
    toWalletId: string,
    amount: number
  ) {

    const transactionId = randomUUID()

    return this.prisma.$transaction(async (tx) => {

      const fromBalance = await tx.walletBalance.findUnique({
        where: { walletId: fromWalletId }
      })

      if (!fromBalance || fromBalance.balance.toNumber() < amount) {
        throw new Error("Insufficient funds")
      }

      await tx.walletBalance.update({
        where: { walletId: fromWalletId },
        data: {
          balance: {
            decrement: amount
          }
        }
      })

      await tx.walletBalance.update({
        where: { walletId: toWalletId },
        data: {
          balance: {
            increment: amount
          }
        }
      })

      await this.ledger.debit(
        fromWalletId,
        transactionId,
        amount
      )

      await this.ledger.credit(
        toWalletId,
        transactionId,
        amount
      )

      return {
        transactionId,
        status: "success"
      }

    })

  }

}