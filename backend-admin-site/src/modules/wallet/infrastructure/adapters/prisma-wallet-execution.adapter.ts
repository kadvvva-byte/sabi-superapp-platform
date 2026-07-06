import { Prisma, PrismaClient } from "@prisma/client"

import type {
  WalletPaymentExecutionInput,
  WalletPaymentExecutionPort,
  WalletPaymentExecutionResult,
} from "../../../../core/contracts/wallet-payment-execution.port"
import type {
  WalletTransferExecutionInput,
  WalletTransferExecutionPort,
  WalletTransferExecutionResult,
} from "../../../../core/contracts/wallet-transfer-execution.port"

type EventPublisher = {
  publish?: (event: string, payload: Record<string, unknown>) => Promise<void> | void
}

function nowIso() {
  return new Date().toISOString()
}

function createReference(prefix: string, idempotencyKey: string, explicit?: string) {
  return explicit?.trim() || `${prefix}:${idempotencyKey}`
}

function toDecimal(value: number) {
  return new Prisma.Decimal(value)
}

export class PrismaWalletExecutionAdapter
  implements WalletPaymentExecutionPort, WalletTransferExecutionPort
{
  constructor(
    private readonly prisma: PrismaClient,
    private readonly events?: EventPublisher,
  ) {}

  async executePayment(
    input: WalletPaymentExecutionInput,
  ): Promise<WalletPaymentExecutionResult> {
    const reference = createReference("payment", input.idempotencyKey, input.reference)
    const executedAt = nowIso()

    const transactionId = await this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          walletId: input.walletId,
          fromWalletId: input.direction === "refund" ? input.walletId : undefined,
          toWalletId: input.direction === "capture" ? input.walletId : undefined,
          reference,
          amount: toDecimal(input.amount),
          type: "PAYMENT",
          status: input.direction === "refund" ? "FAILED" : "SUCCESS",
        },
      })

      const ledgerType = input.direction === "refund" ? "DEBIT" : "CREDIT"
      const operationType = input.direction === "refund" ? "WITHDRAW" : "DEPOSIT"

      await tx.ledgerEntry.create({
        data: {
          walletId: input.walletId,
          transactionId: transaction.id,
          amount: toDecimal(input.amount),
          type: ledgerType,
          operationType,
          uniqueOperationId: `${input.idempotencyKey}:${ledgerType.toLowerCase()}`,
        },
      })

      await tx.walletBalance.upsert({
        where: { walletId: input.walletId },
        create: {
          walletId: input.walletId,
          balance:
            input.direction === "refund"
              ? toDecimal(-input.amount)
              : toDecimal(input.amount),
        },
        update: {
          balance: {
            increment: input.direction === "refund" ? -input.amount : input.amount,
          },
        },
      })

      return transaction.id
    })

    const status = input.direction === "refund" ? "REFUNDED" : "SUCCESS"

    const result: WalletPaymentExecutionResult = {
      ok: true,
      paymentId: input.paymentId,
      providerPaymentId: input.providerPaymentId,
      walletId: input.walletId,
      transactionId,
      reference,
      amount: input.amount,
      currency: input.currency,
      status,
      ledgerEntries: [
        {
          walletId: input.walletId,
          amount: input.amount,
          type: input.direction === "refund" ? "DEBIT" : "CREDIT",
          operationType: input.direction === "refund" ? "REFUND" : "TOPUP",
          uniqueOperationId: `${input.idempotencyKey}:${input.direction === "refund" ? "debit" : "credit"}`,
        },
      ],
      executedAt,
      metadata: input.metadata,
    }

    await this.events?.publish?.("wallet.payment.executed", {
      paymentId: input.paymentId,
      providerPaymentId: input.providerPaymentId,
      walletId: input.walletId,
      transactionId,
      amount: input.amount,
      currency: input.currency,
      direction: input.direction,
      idempotencyKey: input.idempotencyKey,
      reference,
    })

    return result
  }

  async executeTransfer(
    input: WalletTransferExecutionInput,
  ): Promise<WalletTransferExecutionResult> {
    const reference = createReference("transfer", input.idempotencyKey, input.reference)
    const executedAt = nowIso()

    const transactionId = await this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          walletId: input.fromWalletId,
          fromWalletId: input.fromWalletId,
          toWalletId: input.toWalletId,
          reference,
          amount: toDecimal(input.amount),
          type: "TRANSFER",
          status: "SUCCESS",
        },
      })

      await tx.ledgerEntry.createMany({
        data: [
          {
            walletId: input.fromWalletId,
            transactionId: transaction.id,
            amount: toDecimal(input.amount),
            type: "DEBIT",
            operationType: "TRANSFER",
            uniqueOperationId: `${input.idempotencyKey}:debit`,
          },
          {
            walletId: input.toWalletId,
            transactionId: transaction.id,
            amount: toDecimal(input.amount),
            type: "CREDIT",
            operationType: "TRANSFER",
            uniqueOperationId: `${input.idempotencyKey}:credit`,
          },
        ],
      })

      await tx.walletBalance.upsert({
        where: { walletId: input.fromWalletId },
        create: { walletId: input.fromWalletId, balance: toDecimal(-input.amount) },
        update: { balance: { decrement: input.amount } },
      })

      await tx.walletBalance.upsert({
        where: { walletId: input.toWalletId },
        create: { walletId: input.toWalletId, balance: toDecimal(input.amount) },
        update: { balance: { increment: input.amount } },
      })

      return transaction.id
    })

    const operationType =
      input.source === "p2p"
        ? "P2P_TRANSFER"
        : input.source === "qr"
          ? "QR_TRANSFER"
          : input.source === "wallet"
            ? "INTERNAL_TRANSFER"
            : "TRANSFER"

    const result: WalletTransferExecutionResult = {
      ok: true,
      transactionId,
      fromWalletId: input.fromWalletId,
      toWalletId: input.toWalletId,
      reference,
      amount: input.amount,
      currency: input.currency,
      status: "SUCCESS",
      ledgerEntries: [
        {
          walletId: input.fromWalletId,
          amount: input.amount,
          type: "DEBIT",
          operationType,
          uniqueOperationId: `${input.idempotencyKey}:debit`,
        },
        {
          walletId: input.toWalletId,
          amount: input.amount,
          type: "CREDIT",
          operationType,
          uniqueOperationId: `${input.idempotencyKey}:credit`,
        },
      ],
      executedAt,
      metadata: input.metadata,
    }

    await this.events?.publish?.("wallet.transfer.executed", {
      transactionId,
      fromWalletId: input.fromWalletId,
      toWalletId: input.toWalletId,
      amount: input.amount,
      currency: input.currency,
      source: input.source,
      idempotencyKey: input.idempotencyKey,
      reference,
    })

    return result
  }
}
