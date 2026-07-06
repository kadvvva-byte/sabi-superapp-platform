import { PrismaClient } from "@prisma/client"

import {
  walletSecurityRuntimeGuard,
  type WalletRuntimeGuardInput,
  type WalletRuntimeGuardResult,
} from "../../application/security/wallet-security-runtime-guard.service"

export class WalletCorePrismaGuardService {
  constructor(private readonly prisma: PrismaClient) {}

  async assertWalletCanOperate(input: {
    walletId?: string | null
  }): Promise<void> {
    if (!input.walletId) {
      return
    }

    walletSecurityRuntimeGuard.assertWalletCanOperate(input.walletId)
  }

  async evaluateSensitiveOperation(
    input: WalletRuntimeGuardInput,
  ): Promise<WalletRuntimeGuardResult> {
    return walletSecurityRuntimeGuard.evaluateOperation(input)
  }

  async assertSensitiveOperationCanExecute(
    input: WalletRuntimeGuardInput,
  ): Promise<WalletRuntimeGuardResult> {
    return walletSecurityRuntimeGuard.assertOperationAllowed(input)
  }

  async assertBusinessTransferCanExecute(input: {
    senderWalletId?: string
    senderDebit: number
    userId?: string
    unifiedUserId?: string | null
    currency?: string | null
    rawPayload?: Record<string, unknown> | null
    metadata?: Record<string, unknown> | null
  }): Promise<void> {
    if (!input.senderWalletId) {
      return
    }

    walletSecurityRuntimeGuard.assertWalletCanOperate(input.senderWalletId)

    if (input.userId) {
      await walletSecurityRuntimeGuard.assertOperationAllowed({
        operationKind: "business_payment",
        source: "business",
        operationId: `business_transfer_guard_${Date.now()}`,
        userId: input.userId,
        unifiedUserId: input.unifiedUserId ?? input.userId,
        walletId: input.senderWalletId,
        amount: input.senderDebit,
        currency: input.currency ?? null,
        rawPayload: input.rawPayload ?? null,
        metadata: {
          ...(input.metadata ?? {}),
          guard: "assertBusinessTransferCanExecute",
        },
      })
    }

    const balanceRow = await this.prisma.walletBalance.findUnique({
      where: { walletId: input.senderWalletId },
    })

    if (!balanceRow) {
      throw new Error("business_wallet_not_found")
    }

    const liveBalance = this.toNumber(balanceRow.balance)
    const requiredAmount = this.normalizeMoney(input.senderDebit)

    if (liveBalance < requiredAmount) {
      throw new Error("insufficient_wallet_balance")
    }
  }

  async assertMerchantSettlementCanExecute(input: {
    merchantWalletId?: string
    merchantDebit: number
    userId?: string
    unifiedUserId?: string | null
    currency?: string | null
    rawPayload?: Record<string, unknown> | null
    metadata?: Record<string, unknown> | null
  }): Promise<void> {
    if (!input.merchantWalletId) {
      return
    }

    walletSecurityRuntimeGuard.assertWalletCanOperate(input.merchantWalletId)

    if (input.userId) {
      await walletSecurityRuntimeGuard.assertOperationAllowed({
        operationKind: "merchant_payment",
        source: "merchant",
        operationId: `merchant_settlement_guard_${Date.now()}`,
        userId: input.userId,
        unifiedUserId: input.unifiedUserId ?? input.userId,
        walletId: input.merchantWalletId,
        amount: input.merchantDebit,
        currency: input.currency ?? null,
        rawPayload: input.rawPayload ?? null,
        metadata: {
          ...(input.metadata ?? {}),
          guard: "assertMerchantSettlementCanExecute",
        },
      })
    }

    const balanceRow = await this.prisma.walletBalance.findUnique({
      where: { walletId: input.merchantWalletId },
    })

    if (!balanceRow) {
      throw new Error("merchant_wallet_not_found")
    }

    const liveBalance = this.toNumber(balanceRow.balance)
    const requiredAmount = this.normalizeMoney(input.merchantDebit)

    if (liveBalance < requiredAmount) {
      throw new Error("insufficient_wallet_balance")
    }
  }

  async assertTopUpCanExecute(input: {
    userId: string
    walletId: string
    amount?: number | null
    currency?: string | null
    payerName?: string | null
    accountHolderName?: string | null
    providerId?: string | null
    providerTokenId?: string | null
    providerStatus?: "success" | "failed" | "pending" | "cancelled" | "unknown" | null
    rawPayload?: Record<string, unknown> | null
    metadata?: Record<string, unknown> | null
  }): Promise<WalletRuntimeGuardResult> {
    walletSecurityRuntimeGuard.assertWalletCanOperate(input.walletId)

    return walletSecurityRuntimeGuard.assertOperationAllowed({
      operationKind: "top_up",
      source: "payment_provider",
      operationId: `wallet_top_up_guard_${Date.now()}`,
      userId: input.userId,
      unifiedUserId: input.userId,
      walletId: input.walletId,
      amount: input.amount ?? null,
      currency: input.currency ?? null,
      payerName: input.payerName ?? null,
      accountHolderName: input.accountHolderName ?? null,
      providerId: input.providerId ?? null,
      providerTokenId: input.providerTokenId ?? null,
      providerStatus: input.providerStatus ?? null,
      rawPayload: input.rawPayload ?? null,
      metadata: {
        ...(input.metadata ?? {}),
        guard: "assertTopUpCanExecute",
      },
    })
  }

  async assertCardTokenCanRegister(input: {
    userId: string
    walletId?: string | null
    operationId?: string | null
    tokenId: string
    providerId: string
    providerStatus: "success" | "failed" | "pending" | "cancelled" | "unknown"
    maskedLabel?: string | null
    last4?: string | null
    cardBrand?: string | null
    cardCategory?: "local" | "international" | "local_global" | "virtual" | "unknown" | null
    rawProviderMetadata?: Record<string, unknown> | null
    rawPayload?: Record<string, unknown> | null
    metadata?: Record<string, unknown> | null
  }): Promise<WalletRuntimeGuardResult> {
    if (input.walletId) {
      walletSecurityRuntimeGuard.assertWalletCanOperate(input.walletId)
    }

    return walletSecurityRuntimeGuard.assertCardTokenAllowed({
      userId: input.userId,
      walletId: input.walletId ?? null,
      operationId: input.operationId ?? `wallet_card_token_guard_${Date.now()}`,
      token: {
        tokenId: input.tokenId,
        providerId: input.providerId,
        status: input.providerStatus,
        maskedLabel: input.maskedLabel ?? null,
        last4: input.last4 ?? null,
        cardBrand: input.cardBrand ?? null,
        cardCategory: input.cardCategory ?? "unknown",
        rawProviderMetadata: input.rawProviderMetadata ?? null,
      },
      rawPayload: input.rawPayload ?? null,
      metadata: {
        ...(input.metadata ?? {}),
        guard: "assertCardTokenCanRegister",
        pciModel: "token_only",
      },
    })
  }

  private toNumber(value: unknown): number {
    const normalized = Number(value)

    if (!Number.isFinite(normalized)) {
      return 0
    }

    return this.normalizeMoney(normalized)
  }

  private normalizeMoney(value: unknown): number {
    const normalized = Number(value)

    if (!Number.isFinite(normalized)) {
      return 0
    }

    return Math.round(Math.max(0, normalized) * 100) / 100
  }
}