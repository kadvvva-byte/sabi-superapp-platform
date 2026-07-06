import { PrismaClient } from "@prisma/client"

export class AntiDoubleSpendService {

  constructor(private prisma: PrismaClient) {}

  async lockWallet(walletId: string) {

    const wallet = await this.prisma.wallet.updateMany({
      where: {
        id: walletId,
        locked: false
      },
      data: {
        locked: true
      }
    })

    if (wallet.count === 0) {
      throw new Error("Wallet is currently locked")
    }

  }

  async unlockWallet(walletId: string) {

    await this.prisma.wallet.update({
      where: { id: walletId },
      data: {
        locked: false
      }
    })

  }

}