import { PrismaClient } from "@prisma/client"

import type { BusinessWalletEntityParams } from "../../domain/entities/business-wallet.entity"
import type { MerchantWalletEntityParams } from "../../domain/entities/merchant-wallet.entity"

export class WalletCorePrismaWalletResolverService {
  constructor(private readonly prisma: PrismaClient) {}

  async resolveBusinessWalletById(
    walletId: string,
    seed: Partial<BusinessWalletEntityParams> = {}
  ): Promise<BusinessWalletEntityParams | null> {
    const balanceRow = await this.prisma.walletBalance.findUnique({
      where: { walletId },
    })

    if (!balanceRow) {
      return null
    }

    const defaultCurrency = seed.defaultCurrency ?? "USD"

    return {
      id: walletId,
      ownerUserId: seed.ownerUserId ?? "",
      businessId: seed.businessId,
      merchantId: seed.merchantId,

      businessName: seed.businessName ?? seed.displayName ?? "",
      legalName: seed.legalName,
      displayName: seed.displayName,

      phone: seed.phone,
      email: seed.email,
      taxId: seed.taxId,
      registrationNumber: seed.registrationNumber,

      defaultCurrency,
      availableCurrencies: seed.availableCurrencies ?? [defaultCurrency],

      balance: this.toNumber(balanceRow.balance),
      holdBalance: seed.holdBalance ?? 0,
      serviceFeePercent: seed.serviceFeePercent ?? 0,

      isMerchantEnabled: seed.isMerchantEnabled ?? false,
      isBusinessEnabled: seed.isBusinessEnabled ?? true,

      status: seed.status ?? "active",
      createdAt: seed.createdAt,
      updatedAt: seed.updatedAt,
    }
  }

  async resolveMerchantWalletById(
    walletId: string,
    seed: Partial<MerchantWalletEntityParams> = {}
  ): Promise<MerchantWalletEntityParams | null> {
    const balanceRow = await this.prisma.walletBalance.findUnique({
      where: { walletId },
    })

    if (!balanceRow) {
      return null
    }

    const defaultCurrency = seed.defaultCurrency ?? "USD"

    return {
      id: walletId,
      ownerUserId: seed.ownerUserId ?? "",
      businessWalletId: seed.businessWalletId,

      merchantId: seed.merchantId,
      merchantName: seed.merchantName ?? seed.displayName ?? "",
      displayName: seed.displayName,

      category: seed.category,
      mcc: seed.mcc,

      phone: seed.phone,
      email: seed.email,
      settlementReference: seed.settlementReference,

      defaultCurrency,
      availableCurrencies: seed.availableCurrencies ?? [defaultCurrency],

      balance: this.toNumber(balanceRow.balance),
      holdBalance: seed.holdBalance ?? 0,

      serviceFeePercent: seed.serviceFeePercent ?? 0,
      settlementFeePercent: seed.settlementFeePercent ?? 0,

      isMerchantEnabled: seed.isMerchantEnabled ?? true,
      isSettlementEnabled: seed.isSettlementEnabled ?? true,

      status: seed.status ?? "active",
      createdAt: seed.createdAt,
      updatedAt: seed.updatedAt,
    }
  }

  private toNumber(value: unknown): number {
    const normalized = Number(value)

    if (!Number.isFinite(normalized)) {
      return 0
    }

    return Math.round(normalized * 100) / 100
  }
}