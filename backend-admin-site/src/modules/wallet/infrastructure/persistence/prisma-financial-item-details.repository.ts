import { PrismaClient } from "@prisma/client"

import type { FinancialItemDetailsRepository } from "../../application/services/financial-item-details.service"

function record(value: Record<string, unknown>): Record<string, unknown> {
  return value
}

export class PrismaFinancialItemDetailsRepository
  implements FinancialItemDetailsRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async getTransaction(id: string): Promise<Record<string, unknown> | null> {
    const item = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        ledgerEntries: true,
        payment: true,
        qrPayment: true,
        p2pTransfer: true,
        walletOperation: true,
      },
    })

    if (!item) return null

    return record({
      id: item.id,
      walletId: item.walletId,
      fromWalletId: item.fromWalletId,
      toWalletId: item.toWalletId,
      reference: item.reference,
      amount: Number(item.amount),
      type: item.type,
      status: item.status,
      createdAt: item.createdAt.toISOString(),
      transactionId: item.id,
      ledgerEntries: item.ledgerEntries.map((entry) => ({
        id: entry.id,
        walletId: entry.walletId,
        amount: Number(entry.amount),
        type: entry.type,
        operationType: entry.operationType,
        createdAt: entry.createdAt.toISOString(),
      })),
      paymentId: item.payment?.id,
      qrPaymentId: item.qrPayment?.id,
      p2pTransferId: item.p2pTransfer?.id,
      walletOperationId: item.walletOperation?.id,
    })
  }

  async getPayment(id: string): Promise<Record<string, unknown> | null> {
    const item = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        audits: true,
        transaction: true,
      },
    })

    if (!item) return null

    return record({
      id: item.id,
      userId: item.userId,
      walletId: item.walletId,
      transactionId: item.transactionId,
      providerPaymentId: item.providerPaymentId,
      provider: item.provider,
      currency: item.currency,
      capturedAmount: Number(item.capturedAmount),
      refundedAmount: Number(item.refundedAmount),
      amount: Number(item.status === "REFUNDED" ? item.refundedAmount : item.capturedAmount),
      status: item.status,
      reference: item.reference,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      audits: item.audits.map((audit) => ({
        id: audit.id,
        action: audit.action,
        createdAt: audit.createdAt.toISOString(),
      })),
    })
  }

  async getP2PTransfer(id: string): Promise<Record<string, unknown> | null> {
    const item = await this.prisma.p2PTransfer.findUnique({
      where: { id },
      include: {
        transaction: true,
      },
    })

    if (!item) return null

    return record({
      id: item.id,
      fromUserId: item.fromUserId,
      toUserId: item.toUserId,
      fromWalletId: item.fromWalletId,
      toWalletId: item.toWalletId,
      transactionId: item.transactionId,
      reference: item.reference,
      amount: Number(item.amount),
      currency: item.transaction?.walletId ? undefined : undefined,
      status: item.status,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })
  }

  async getQrPayment(id: string): Promise<Record<string, unknown> | null> {
    const item = await this.prisma.qRPayment.findUnique({
      where: { id },
      include: {
        qr: true,
        operations: true,
        transaction: true,
      },
    })

    if (!item) return null

    return record({
      id: item.id,
      qrId: item.qrId,
      payerWalletId: item.payerWalletId,
      receiverWalletId: item.receiverWalletId,
      transactionId: item.transactionId,
      route: item.route,
      amount: Number(item.amount),
      currency: item.currency,
      status: item.status,
      idempotencyKey: item.idempotencyKey,
      createdAt: item.createdAt.toISOString(),
      operations: item.operations.map((op) => ({
        id: op.id,
        route: op.route,
        status: op.status,
        transactionId: op.transactionId,
        createdAt: op.createdAt.toISOString(),
      })),
      qr: item.qr
        ? {
            id: item.qr.id,
            rail: item.qr.rail,
            domain: item.qr.domain,
            payloadType: item.qr.payloadType,
            reference: item.qr.reference,
          }
        : undefined,
    })
  }

  async getWalletOperation(id: string): Promise<Record<string, unknown> | null> {
    const item = await this.prisma.walletOperation.findUnique({
      where: { id },
      include: {
        transaction: true,
      },
    })

    if (!item) return null

    return record({
      id: item.id,
      ownerUserId: item.ownerUserId,
      walletId: item.walletId,
      transactionId: item.transactionId,
      senderBusinessWalletId: item.senderBusinessWalletId,
      recipientBusinessWalletId: item.recipientBusinessWalletId,
      merchantWalletId: item.merchantWalletId,
      kind: item.kind,
      status: item.status,
      amount: Number(item.amount),
      feeAmount: Number(item.feeAmount),
      netAmount: item.netAmount ? Number(item.netAmount) : undefined,
      currency: item.currency,
      reference: item.reference,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      metadata:
        item.metadata && typeof item.metadata === "object"
          ? (item.metadata as Record<string, unknown>)
          : undefined,
    })
  }
}
