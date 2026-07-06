import { PrismaClient, Prisma } from "@prisma/client"

import type {
  QrOperationRecord,
  QrPaymentRecord,
  QrSnapshot,
  UniversalQrRepository,
} from "../../application/services/universal-qr-execution.service"

function toJson(
  value?: Record<string, unknown>,
): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined {
  if (value === undefined) return undefined
  return value as Prisma.InputJsonValue
}

export class PrismaUniversalQrRepository implements UniversalQrRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findQrById(qrId: string): Promise<QrSnapshot | null> {
    const qr = await this.prisma.qr.findUnique({ where: { id: qrId } })
    if (!qr) return null

    return {
      id: qr.id,
      rail: qr.rail,
      domain: qr.domain ?? undefined,
      payloadType: qr.payloadType,
      route: `${qr.rail}:${qr.domain}:${qr.payloadType}`,
      walletId: qr.walletId ?? undefined,
      amount: qr.amount ? Number(qr.amount) : undefined,
      currency: qr.currency ?? undefined,
      metadata:
        qr.metadata && typeof qr.metadata === "object"
          ? (qr.metadata as Record<string, unknown>)
          : undefined,
    }
  }

  async createQrPayment(input: {
    qrId: string
    payerWalletId: string
    receiverWalletId?: string
    amount: number
    currency: string
    route: string
    actorUserId?: string
    idempotencyKey: string
  }): Promise<QrPaymentRecord> {
    const payment = await this.prisma.qRPayment.create({
      data: {
        qrId: input.qrId,
        payerWalletId: input.payerWalletId,
        receiverWalletId: input.receiverWalletId,
        amount: input.amount,
        currency: input.currency,
        status: "CREATED",
        route: input.route,
        actorUserId: input.actorUserId,
        idempotencyKey: input.idempotencyKey,
      },
    })

    return {
      id: payment.id,
      qrId: payment.qrId,
      payerWalletId: payment.payerWalletId,
      receiverWalletId: payment.receiverWalletId,
      transactionId: payment.transactionId,
      amount: Number(payment.amount),
      currency: payment.currency,
      status: payment.status,
      route: payment.route,
      idempotencyKey: payment.idempotencyKey,
    }
  }

  async attachQrPaymentTransaction(input: {
    paymentId: string
    transactionId: string
    status: string
  }): Promise<QrPaymentRecord> {
    const payment = await this.prisma.qRPayment.update({
      where: { id: input.paymentId },
      data: {
        transactionId: input.transactionId,
        status: input.status === "SUCCESS" ? "CAPTURED" : "FAILED",
      },
    })

    return {
      id: payment.id,
      qrId: payment.qrId,
      payerWalletId: payment.payerWalletId,
      receiverWalletId: payment.receiverWalletId,
      transactionId: payment.transactionId,
      amount: Number(payment.amount),
      currency: payment.currency,
      status: payment.status,
      route: payment.route,
      idempotencyKey: payment.idempotencyKey,
    }
  }

  async createQrOperation(input: {
    qrId: string
    paymentId?: string
    transactionId?: string
    route: string
    rail: string
    domain?: string
    payloadType: string
    actorUserId?: string
    payerWalletId?: string
    receiverWalletId?: string
    amount?: number
    currency?: string
    status: string
    idempotencyKey: string
    reference?: string
    metadata?: Record<string, unknown>
  }): Promise<QrOperationRecord> {
    const operation = await this.prisma.qrOperation.create({
      data: {
        qrId: input.qrId,
        paymentId: input.paymentId,
        transactionId: input.transactionId,
        route: input.route,
        rail: input.rail,
        domain: input.domain,
        payloadType: input.payloadType,
        actorUserId: input.actorUserId,
        payerWalletId: input.payerWalletId,
        receiverWalletId: input.receiverWalletId,
        amount: input.amount,
        currency: input.currency,
        status: input.status,
        idempotencyKey: input.idempotencyKey,
        reference: input.reference,
        metadata: toJson(input.metadata),
      },
    })

    return {
      id: operation.id,
      qrId: operation.qrId,
      paymentId: operation.paymentId,
      transactionId: operation.transactionId,
      route: operation.route,
      status: operation.status,
      idempotencyKey: operation.idempotencyKey,
      reference: operation.reference,
    }
  }
}
