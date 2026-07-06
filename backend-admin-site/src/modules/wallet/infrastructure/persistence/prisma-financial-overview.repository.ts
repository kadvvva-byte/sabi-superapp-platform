import { PrismaClient } from "@prisma/client"

import type {
  FinancialOverviewRepository,
  FinancialOverviewWalletItem,
} from "../../application/services/financial-overview.service"

export class PrismaFinancialOverviewRepository
  implements FinancialOverviewRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async getWalletsByUserId(userId: string): Promise<FinancialOverviewWalletItem[]> {
    const wallets = await this.prisma.wallet.findMany({
      where: { userId },
      include: { balance: true },
      orderBy: { createdAt: "desc" },
    })

    return wallets.map((item) => ({
      id: item.id,
      type: item.type,
      currency: item.currency,
      balance: item.balance ? Number(item.balance.balance) : 0,
      locked: item.locked,
      createdAt: item.createdAt.toISOString(),
    }))
  }

  async getWalletById(walletId: string): Promise<FinancialOverviewWalletItem | null> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
      include: { balance: true },
    })

    if (!wallet) return null

    return {
      id: wallet.id,
      type: wallet.type,
      currency: wallet.currency,
      balance: wallet.balance ? Number(wallet.balance.balance) : 0,
      locked: wallet.locked,
      createdAt: wallet.createdAt.toISOString(),
    }
  }

  async countQrByWalletIds(walletIds: string[]): Promise<number> {
    return this.prisma.qr.count({
      where: { walletId: { in: walletIds } },
    })
  }

  async countPaymentsByWalletIds(walletIds: string[]): Promise<number> {
    return this.prisma.payment.count({
      where: { walletId: { in: walletIds } },
    })
  }

  async countP2PByWalletIds(walletIds: string[]): Promise<number> {
    return this.prisma.p2PTransfer.count({
      where: {
        OR: [
          { fromWalletId: { in: walletIds } },
          { toWalletId: { in: walletIds } },
        ],
      },
    })
  }

  async countWalletOperationsByWalletIds(walletIds: string[]): Promise<number> {
    return this.prisma.walletOperation.count({
      where: { walletId: { in: walletIds } },
    })
  }

  async countBusinessWalletsByUserId(userId: string): Promise<number> {
    return this.prisma.businessWallet.count({
      where: { ownerUserId: userId },
    })
  }

  async countMerchantWalletsByUserId(userId: string): Promise<number> {
    return this.prisma.merchantWallet.count({
      where: { ownerUserId: userId },
    })
  }
}
