import { PrismaClient } from "@prisma/client"

import type {
  BusinessWalletEntitySnapshot,
} from "../../domain/entities/business-wallet.entity"
import type {
  MerchantWalletEntitySnapshot,
} from "../../domain/entities/merchant-wallet.entity"
import type {
  WalletOperationEntitySnapshot,
} from "../../domain/entities/wallet-operation.entity"
import type { WalletOperationKind } from "../../domain/constants/wallet-operation-kind"

export class WalletCorePrismaQueryService {
  constructor(private readonly prisma: PrismaClient) {}

  async getBusinessWalletById(
    walletId: string
  ): Promise<BusinessWalletEntitySnapshot | null> {
    const balanceRow = await this.prisma.walletBalance.findUnique({
      where: { walletId },
    })

    if (!balanceRow) {
      return null
    }

    const now = new Date()

    return {
      id: walletId,
      ownerUserId: "",
      businessId: undefined,
      merchantId: undefined,

      businessName: "",
      legalName: undefined,
      displayName: undefined,

      phone: undefined,
      email: undefined,
      taxId: undefined,
      registrationNumber: undefined,

      defaultCurrency: "USD",
      availableCurrencies: ["USD"],

      balance: this.toNumber(balanceRow.balance),
      holdBalance: 0,
      serviceFeePercent: 0,

      isMerchantEnabled: false,
      isBusinessEnabled: true,

      status: "active",

      createdAt: now,
      updatedAt: now,
    }
  }

  async getMerchantWalletById(
    walletId: string
  ): Promise<MerchantWalletEntitySnapshot | null> {
    const balanceRow = await this.prisma.walletBalance.findUnique({
      where: { walletId },
    })

    if (!balanceRow) {
      return null
    }

    const now = new Date()

    return {
      id: walletId,
      ownerUserId: "",
      businessWalletId: undefined,

      merchantId: undefined,
      merchantName: "",
      displayName: undefined,

      category: undefined,
      mcc: undefined,

      phone: undefined,
      email: undefined,
      settlementReference: undefined,

      defaultCurrency: "USD",
      availableCurrencies: ["USD"],

      balance: this.toNumber(balanceRow.balance),
      holdBalance: 0,

      serviceFeePercent: 0,
      settlementFeePercent: 0,

      isMerchantEnabled: true,
      isSettlementEnabled: true,

      status: "active",

      createdAt: now,
      updatedAt: now,
    }
  }

  async getWalletOperationById(
    operationId: string
  ): Promise<WalletOperationEntitySnapshot | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        reference: `wallet-core:${operationId}`,
      },
    })

    if (!transaction) {
      return null
    }

    return this.mapTransactionToOperationSnapshot(transaction)
  }

  async listWalletOperationsByWalletId(
    walletId: string
  ): Promise<WalletOperationEntitySnapshot[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        AND: [
          {
            reference: {
              startsWith: "wallet-core:",
            },
          },
          {
            OR: [
              { walletId },
              { fromWalletId: walletId },
              { toWalletId: walletId },
            ],
          },
        ],
      },
    })

    const operations = await Promise.all(
      transactions.map((transaction) =>
        this.mapTransactionToOperationSnapshot(transaction)
      )
    )

    return operations
  }

  private async mapTransactionToOperationSnapshot(transaction: {
    id: string
    walletId: string
    fromWalletId: string | null
    toWalletId: string | null
    reference: string | null
    amount: unknown
    type: string
    status: string
  }): Promise<WalletOperationEntitySnapshot> {
    const ledgerEntries = await this.prisma.ledgerEntry.findMany({
      where: {
        transactionId: transaction.id,
      },
    })

    const qrOperation = await this.prisma.qrOperation.findFirst({
      where: {
        transactionId: transaction.id,
      },
    })

    const fee = ledgerEntries
      .filter((entry) => entry.uniqueOperationId.includes(":fee:"))
      .reduce((sum, entry) => sum + this.toNumber(entry.amount), 0)

    const debitAmount = ledgerEntries
      .filter((entry) => entry.type === "DEBIT")
      .reduce((sum, entry) => sum + this.toNumber(entry.amount), 0)

    const creditAmount = ledgerEntries
      .filter((entry) => entry.type === "CREDIT")
      .reduce((sum, entry) => sum + this.toNumber(entry.amount), 0)

    const kind = this.resolveKind(transaction.type, ledgerEntries)
    const status = this.resolveStatus(transaction.status)
    const now = new Date()

    return {
      id: this.extractOperationId(transaction.reference) ?? transaction.id,
      kind,
      status,

      currency: qrOperation?.currency ?? "USD",
      amount: this.toNumber(transaction.amount),
      fee: this.roundMoney(fee),
      percentFee: 0,
      debitAmount: this.roundMoney(debitAmount),
      creditAmount: this.roundMoney(creditAmount),

      sourceWalletId: transaction.fromWalletId ?? undefined,
      destinationWalletId: transaction.toWalletId ?? undefined,

      businessWalletId:
        kind === "business_transfer"
          ? transaction.fromWalletId ?? transaction.walletId
          : undefined,
      merchantWalletId:
        kind === "merchant_payment" || kind === "merchant_settlement"
          ? transaction.walletId
          : undefined,

      title: this.resolveTitle(kind),
      description: this.resolveDescription(kind),

      metadata: {
        transactionId: transaction.id,
        reference: transaction.reference ?? undefined,
        ledgerEntryCount: ledgerEntries.length,
      },

      createdAt: now,
      completedAt: status === "completed" ? now : undefined,
      updatedAt: now,
    }
  }

  private resolveKind(
    transactionType: string,
    ledgerEntries: Array<{ uniqueOperationId: string }>
  ): WalletOperationKind {
    if (
      ledgerEntries.some((entry) =>
        entry.uniqueOperationId.includes("merchant-settlement")
      )
    ) {
      return "merchant_settlement"
    }

    if (
      ledgerEntries.some((entry) =>
        entry.uniqueOperationId.includes("merchant-payment")
      )
    ) {
      return "merchant_payment"
    }

    if (
      ledgerEntries.some((entry) =>
        entry.uniqueOperationId.includes("transfer")
      )
    ) {
      return "business_transfer"
    }

    if (transactionType === "PAYMENT") {
      return "merchant_payment"
    }

    return "business_transfer"
  }

  private resolveStatus(
    transactionStatus: string
  ): "created" | "completed" | "failed" | "cancelled" {
    if (transactionStatus === "SUCCESS") {
      return "completed"
    }

    if (transactionStatus === "FAILED") {
      return "failed"
    }

    if (transactionStatus === "CANCELLED") {
      return "cancelled"
    }

    return "created"
  }

  private resolveTitle(kind: WalletOperationKind): string {
    if (kind === "merchant_payment") {
      return "Merchant payment"
    }

    if (kind === "merchant_settlement") {
      return "Merchant settlement"
    }

    return "Business transfer"
  }

  private resolveDescription(kind: WalletOperationKind): string {
    if (kind === "merchant_payment") {
      return "Wallet core merchant payment"
    }

    if (kind === "merchant_settlement") {
      return "Wallet core merchant settlement"
    }

    return "Wallet core business transfer"
  }

  private extractOperationId(reference: string | null | undefined) {
    if (!reference || !reference.startsWith("wallet-core:")) {
      return undefined
    }

    return reference.slice("wallet-core:".length)
  }

  private toNumber(value: unknown): number {
    const normalized = Number(value)

    if (!Number.isFinite(normalized)) {
      return 0
    }

    return this.roundMoney(normalized)
  }

  private roundMoney(value: number): number {
    return Math.round(value * 100) / 100
  }
}