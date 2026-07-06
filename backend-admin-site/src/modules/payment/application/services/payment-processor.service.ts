import { PrismaClient, TransactionType, TransactionStatus } from "@prisma/client"

const prisma = new PrismaClient()

export class PaymentProcessorService {

  async process(data: {
    fromWalletId: string
    toWalletId: string
    amount: number
  }) {

    const { fromWalletId, toWalletId, amount } = data

    const fromBalance = await prisma.walletBalance.findUnique({
      where: { walletId: fromWalletId }
    })

    if (!fromBalance) {
      throw new Error("Sender balance not found")
    }

    if (Number(fromBalance.balance) < amount) {
      throw new Error("Insufficient balance")
    }

    const toBalance = await prisma.walletBalance.findUnique({
      where: { walletId: toWalletId }
    })

    if (!toBalance) {
      throw new Error("Receiver balance not found")
    }

    const newSenderBalance = fromBalance.balance.minus(amount)
    const newReceiverBalance = toBalance.balance.plus(amount)

    await prisma.walletBalance.update({
      where: { walletId: fromWalletId },
      data: {
        balance: newSenderBalance
      }
    })

    await prisma.walletBalance.update({
      where: { walletId: toWalletId },
      data: {
        balance: newReceiverBalance
      }
    })

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type: TransactionType.TRANSFER,
        status: TransactionStatus.SUCCESS,
        wallet: {
          connect: { id: fromWalletId }
        }
      }
    })

    return transaction
  }

}