import { Prisma, PrismaClient } from "@prisma/client"

import type { BusinessWalletEntitySnapshot } from "../../domain/entities/business-wallet.entity"
import type { MerchantWalletEntitySnapshot } from "../../domain/entities/merchant-wallet.entity"

export class WalletCorePrismaCreateService {
  constructor(private readonly prisma: PrismaClient) {}

  async ensureBusinessWallet(
    wallet: BusinessWalletEntitySnapshot
  ): Promise<void> {
    await this.ensureWalletBalance(wallet.id, wallet.balance)
  }

  async ensureMerchantWallet(
    wallet: MerchantWalletEntitySnapshot
  ): Promise<void> {
    await this.ensureWalletBalance(wallet.id, wallet.balance)
  }

  private async ensureWalletBalance(
    walletId: string,
    balance: number
  ): Promise<void> {
    if (!walletId) {
      return
    }

    const existing = await this.prisma.walletBalance.findUnique({
      where: { walletId },
    })

    if (existing) {
      return
    }

    await this.prisma.walletBalance.create({
      data: {
        walletId,
        balance: new Prisma.Decimal(this.normalizeMoney(balance)),
      },
    })
  }

  private normalizeMoney(value: unknown): number {
    const normalized = Number(value)

    if (!Number.isFinite(normalized)) {
      return 0
    }

    return Math.round(Math.max(0, normalized) * 100) / 100
  }
}