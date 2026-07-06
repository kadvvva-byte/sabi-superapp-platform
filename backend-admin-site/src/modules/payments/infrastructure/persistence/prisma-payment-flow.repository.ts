import { PrismaClient, Prisma } from "@prisma/client"

import type {
  PaymentRecordRepository,
  ProviderPaymentSnapshot,
} from "../../application/services/payment-to-wallet-flow.service"

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined
}

function toJson(
  value?: Record<string, unknown>,
): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined {
  if (value === undefined) return undefined
  return value as Prisma.InputJsonValue
}

export class PrismaPaymentFlowRepository implements PaymentRecordRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByProviderPaymentId(
    providerPaymentId: string,
  ): Promise<ProviderPaymentSnapshot | null> {
    const payment = await this.prisma.payment.findUnique({ where: { providerPaymentId } })

    if (!payment) return null

    return {
      id: payment.id,
      providerPaymentId: payment.providerPaymentId,
      userId: payment.userId,
      walletId: payment.walletId,
      currency: payment.currency,
      capturedAmount: Number(payment.capturedAmount),
      refundedAmount: Number(payment.refundedAmount),
      reference: payment.reference,
      status: payment.status,
    }
  }

  async attachWalletExecution(input: {
    paymentId: string
    walletId: string
    transactionId: string
    reference?: string
    status: string
    amount: number
    metadata?: Record<string, unknown>
  }): Promise<ProviderPaymentSnapshot> {
    const payment = await this.prisma.payment.update({
      where: { id: input.paymentId },
      data: {
        walletId: input.walletId,
        transactionId: input.transactionId,
        reference: input.reference,
        status: input.status === "REFUNDED" ? "REFUNDED" : "CAPTURED",
        capturedAmount: input.status === "REFUNDED" ? undefined : input.amount,
        refundedAmount: input.status === "REFUNDED" ? input.amount : undefined,
      },
    })

    await this.prisma.paymentAudit.create({
      data: {
        paymentId: payment.id,
        action: "wallet_execution_attached",
        data: toJson(input.metadata),
      },
    })

    return {
      id: payment.id,
      providerPaymentId: payment.providerPaymentId,
      userId: payment.userId,
      walletId: payment.walletId,
      currency: payment.currency,
      capturedAmount: Number(payment.capturedAmount),
      refundedAmount: Number(payment.refundedAmount),
      reference: payment.reference,
      status: payment.status,
      metadata: asRecord(input.metadata),
    }
  }
}
