import { prisma } from "../../../../../../core/prisma/prisma.client"

export class MiniAppWalletService {

  async getBalance(userId: string) {

    const wallet = await prisma.wallet.findFirst({
      where: { userId },
      include: { balance: true }
    })

    return Number(wallet?.balance?.balance || 0)
  }

  async pay(userId: string, toUserId: string, amount: number) {

    const senderWallet = await prisma.wallet.findFirst({
      where: { userId },
      include: { balance: true }
    })

    const receiverWallet = await prisma.wallet.findFirst({
      where: { userId: toUserId },
      include: { balance: true }
    })

    if (!senderWallet || !receiverWallet) {
      throw new Error("Wallet not found")
    }

    const senderBalance = Number(senderWallet.balance?.balance || 0)

    if (senderBalance < amount) {
      throw new Error("Insufficient balance")
    }

    await prisma.walletBalance.update({
      where: { walletId: senderWallet.id },
      data: {
        balance: senderBalance - amount
      }
    })

    const receiverBalance = Number(receiverWallet.balance?.balance || 0)

    await prisma.walletBalance.update({
      where: { walletId: receiverWallet.id },
      data: {
        balance: receiverBalance + amount
      }
    })

  const tx = await prisma.transaction.create({
    data: {
     type: "TRANSFER",
      status: "SUCCESS",
      amount: amount,
     wallet: {
       connect: {
         id: senderWallet.id
       }
     }
   }
 })

    return tx
  }

}