import { PrismaClient, TransactionStatus } from "@prisma/client"
import { EventBus } from "../../../../core/events/event-bus"
import { TransactionLockService } from "../../../../core/locks/transaction-lock.service"

const lockService = new TransactionLockService()
const eventBus = new EventBus()
const prisma = new PrismaClient()

export class QrPaymentService {

  async pay(fromWalletId: string, toWalletId: string, amount: number) {

    const senderBalance = await prisma.walletBalance.findUnique({
      where: { walletId: fromWalletId }
    })

    if (!senderBalance) {
      throw new Error("Sender wallet not found")
    }

    const senderAmount = senderBalance.balance.toNumber()

    if (senderAmount < amount) {
      throw new Error("Insufficient balance")
    }

    await prisma.$transaction([

      prisma.walletBalance.update({
        where: { walletId: fromWalletId },
        data: {
          balance: senderAmount - amount
        }
      }),

      prisma.walletBalance.update({
        where: { walletId: toWalletId },
        data: {
          balance: {
            increment: amount
          }
        }
      }),

      prisma.transaction.create({
        data: {
          walletId: fromWalletId,
          fromWalletId: fromWalletId,
          toWalletId: toWalletId,
          amount: amount,
          type: "PAYMENT",
          status: TransactionStatus.SUCCESS
        }
      })

    ])

      eventBus.publish("payment.completed", {
         fromWalletId,
          toWalletId,
          amount
      })

    const lockId = `${fromWalletId}-${toWalletId}`

      lockService.acquire(lockId)

     try {

       // существующая логика платежа

      } finally {

       lockService.release(lockId)

    }  

    return {
      success: true,
      message: "QR Payment successful"
    }
  }

}