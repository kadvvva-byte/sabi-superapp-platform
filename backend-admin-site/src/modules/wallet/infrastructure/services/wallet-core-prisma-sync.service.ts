import { Prisma, PrismaClient } from "@prisma/client"

type JsonRecord = Record<string, unknown>

function asRecord(value: unknown): JsonRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null
  }

  return value as JsonRecord
}

function asOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined
  }

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

function asOptionalNumber(value: unknown): number | undefined {
  const normalized = Number(value)

  if (!Number.isFinite(normalized)) {
    return undefined
  }

  return Math.round(normalized * 100) / 100
}

function toDecimal(value: unknown): Prisma.Decimal {
  return new Prisma.Decimal(asOptionalNumber(value) ?? 0)
}

export class WalletCorePrismaSyncService {
  constructor(private readonly prisma: PrismaClient) {}

  async syncBusinessTransfer(
    payload: unknown,
    forcedOperationId?: string
  ): Promise<void> {
    const root = asRecord(payload)
    const operation = asRecord(root?.operation)
    const transfer = asRecord(root?.transfer)
    const senderWallet = asRecord(root?.senderWallet)
    const recipientWallet = asRecord(root?.recipientWallet)

    const senderWalletId = asOptionalString(senderWallet?.id)
    const recipientWalletId = asOptionalString(recipientWallet?.id)

    if (!senderWalletId || !recipientWalletId) {
      return
    }

    const amount = toDecimal(transfer?.amount)
    const fee = toDecimal(transfer?.fee)
    const senderDebit = toDecimal(transfer?.senderDebit)
    const recipientCredit = toDecimal(transfer?.recipientCredit)
    const operationId =
      forcedOperationId ??
      asOptionalString(operation?.id) ??
      this.createFallbackReference("biz")

    await this.prisma.$transaction(async (tx) => {
      const senderUpdated = await tx.walletBalance.updateMany({
        where: {
          walletId: senderWalletId,
          balance: {
            gte: senderDebit,
          },
        },
        data: {
          balance: {
            decrement: senderDebit,
          },
        },
      })

      if (senderUpdated.count !== 1) {
        throw new Error("insufficient_wallet_balance")
      }

      await tx.walletBalance.upsert({
        where: { walletId: recipientWalletId },
        update: {
          balance: {
            increment: recipientCredit,
          },
        },
        create: {
          walletId: recipientWalletId,
          balance: recipientCredit,
        },
      })

      const transaction = await tx.transaction.create({
        data: {
          walletId: senderWalletId,
          fromWalletId: senderWalletId,
          toWalletId: recipientWalletId,
          reference: `wallet-core:${operationId}`,
          amount,
          type: "TRANSFER",
          status: "SUCCESS",
        },
      })

      const ledgerRows: Prisma.LedgerEntryCreateManyInput[] = [
        {
          walletId: senderWalletId,
          transactionId: transaction.id,
          amount,
          type: "DEBIT",
          operationType: "QR_PAYMENT",
          uniqueOperationId: `wallet-core:${operationId}:transfer:principal:debit`,
        },
        {
          walletId: recipientWalletId,
          transactionId: transaction.id,
          amount: recipientCredit,
          type: "CREDIT",
          operationType: "QR_PAYMENT",
          uniqueOperationId: `wallet-core:${operationId}:transfer:principal:credit`,
        },
      ]

      if (fee.gt(0)) {
        ledgerRows.push({
          walletId: senderWalletId,
          transactionId: transaction.id,
          amount: fee,
          type: "DEBIT",
          operationType: "QR_PAYMENT",
          uniqueOperationId: `wallet-core:${operationId}:transfer:fee:debit`,
        })
      }

      await tx.ledgerEntry.createMany({
        data: ledgerRows,
      })
    })
  }

  async syncMerchantPayment(
    payload: unknown,
    forcedOperationId?: string
  ): Promise<void> {
    const root = asRecord(payload)
    const operation = asRecord(root?.operation)
    const payment = asRecord(root?.payment)
    const merchantWallet = asRecord(root?.merchantWallet)

    const merchantWalletId = asOptionalString(merchantWallet?.id)

    if (!merchantWalletId) {
      return
    }

    const merchantGross = toDecimal(payment?.merchantGross ?? payment?.amount)
    const merchantNet = toDecimal(payment?.merchantNet)
    const fee = toDecimal(payment?.fee)
    const operationId =
      forcedOperationId ??
      asOptionalString(operation?.id) ??
      this.createFallbackReference("merchant-payment")

    await this.prisma.$transaction(async (tx) => {
      await tx.walletBalance.upsert({
        where: { walletId: merchantWalletId },
        update: {
          balance: {
            increment: merchantNet,
          },
        },
        create: {
          walletId: merchantWalletId,
          balance: merchantNet,
        },
      })

      const transaction = await tx.transaction.create({
        data: {
          walletId: merchantWalletId,
          fromWalletId: merchantWalletId,
          toWalletId: merchantWalletId,
          reference: `wallet-core:${operationId}`,
          amount: merchantGross,
          type: "PAYMENT",
          status: "SUCCESS",
        },
      })

      const ledgerRows: Prisma.LedgerEntryCreateManyInput[] = [
        {
          walletId: merchantWalletId,
          transactionId: transaction.id,
          amount: merchantGross,
          type: "CREDIT",
          operationType: "QR_PAYMENT",
          uniqueOperationId: `wallet-core:${operationId}:merchant-payment:principal:credit`,
        },
      ]

      if (fee.gt(0)) {
        ledgerRows.push({
          walletId: merchantWalletId,
          transactionId: transaction.id,
          amount: fee,
          type: "DEBIT",
          operationType: "QR_PAYMENT",
          uniqueOperationId: `wallet-core:${operationId}:merchant-payment:fee:debit`,
        })
      }

      await tx.ledgerEntry.createMany({
        data: ledgerRows,
      })
    })
  }

  async syncMerchantSettlement(
    payload: unknown,
    forcedOperationId?: string
  ): Promise<void> {
    const root = asRecord(payload)
    const operation = asRecord(root?.operation)
    const settlement = asRecord(root?.settlement)
    const merchantWallet = asRecord(root?.merchantWallet)

    const merchantWalletId = asOptionalString(merchantWallet?.id)

    if (!merchantWalletId) {
      return
    }

    const businessWalletId = asOptionalString(merchantWallet?.businessWalletId)
    const amount = toDecimal(settlement?.amount)
    const fee = toDecimal(settlement?.fee)
    const merchantDebit = toDecimal(settlement?.merchantDebit)
    const settlementCredit = toDecimal(settlement?.settlementCredit)
    const operationId =
      forcedOperationId ??
      asOptionalString(operation?.id) ??
      this.createFallbackReference("merchant-settlement")

    await this.prisma.$transaction(async (tx) => {
      const merchantUpdated = await tx.walletBalance.updateMany({
        where: {
          walletId: merchantWalletId,
          balance: {
            gte: merchantDebit,
          },
        },
        data: {
          balance: {
            decrement: merchantDebit,
          },
        },
      })

      if (merchantUpdated.count !== 1) {
        throw new Error("insufficient_wallet_balance")
      }

      if (businessWalletId && settlementCredit.gt(0)) {
        await tx.walletBalance.upsert({
          where: { walletId: businessWalletId },
          update: {
            balance: {
              increment: settlementCredit,
            },
          },
          create: {
            walletId: businessWalletId,
            balance: settlementCredit,
          },
        })
      }

      const transaction = await tx.transaction.create({
        data: {
          walletId: merchantWalletId,
          fromWalletId: merchantWalletId,
          toWalletId: businessWalletId ?? merchantWalletId,
          reference: `wallet-core:${operationId}`,
          amount,
          type: "TRANSFER",
          status: "SUCCESS",
        },
      })

      const ledgerRows: Prisma.LedgerEntryCreateManyInput[] = [
        {
          walletId: merchantWalletId,
          transactionId: transaction.id,
          amount,
          type: "DEBIT",
          operationType: "QR_PAYMENT",
          uniqueOperationId: `wallet-core:${operationId}:merchant-settlement:principal:debit`,
        },
      ]

      if (businessWalletId && settlementCredit.gt(0)) {
        ledgerRows.push({
          walletId: businessWalletId,
          transactionId: transaction.id,
          amount: settlementCredit,
          type: "CREDIT",
          operationType: "QR_PAYMENT",
          uniqueOperationId: `wallet-core:${operationId}:merchant-settlement:principal:credit`,
        })
      }

      if (fee.gt(0)) {
        ledgerRows.push({
          walletId: merchantWalletId,
          transactionId: transaction.id,
          amount: fee,
          type: "DEBIT",
          operationType: "QR_PAYMENT",
          uniqueOperationId: `wallet-core:${operationId}:merchant-settlement:fee:debit`,
        })
      }

      await tx.ledgerEntry.createMany({
        data: ledgerRows,
      })
    })
  }

  private createFallbackReference(prefix: string): string {
    const random = Math.random().toString(36).slice(2, 10)
    return `${prefix}-${Date.now()}-${random}`
  }
}