import { PrismaClient } from "@prisma/client"

import type {
  TransactionHistorySourceRecord,
  UnifiedTransactionHistoryRepository,
} from "../../application/services/unified-transaction-history.service"
import {
  mergeWalletProviderPersistenceMetadata,
  normalizeLedgerProviderStatus,
} from "../../application/security/wallet-provider-persistence.policy"

function asMetadata(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {}
  }

  return value as Record<string, unknown>
}

function paymentRouteFromStatus(status: string): string {
  const normalized = status.toLowerCase()
  if (normalized === "captured" || normalized === "refunded") return "payment_provider_confirmed"
  if (normalized === "failed") return "payment_provider_failed"
  return "payment_provider_pending"
}

export class PrismaUnifiedTransactionHistoryRepository
  implements UnifiedTransactionHistoryRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async listByUserId(userId: string): Promise<TransactionHistorySourceRecord[]> {
    const wallets = await this.prisma.wallet.findMany({
      where: { userId },
      select: { id: true, currency: true },
    })

    const walletIds = wallets.map((item) => item.id)
    if (walletIds.length === 0) return []

    return this.listByWalletIds(
      walletIds,
      Object.fromEntries(wallets.map((wallet) => [wallet.id, wallet.currency])),
    )
  }

  async listByWalletId(walletId: string): Promise<TransactionHistorySourceRecord[]> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
      select: { id: true, currency: true },
    })

    if (!wallet) return []

    return this.listByWalletIds([walletId], { [walletId]: wallet.currency })
  }

  private async listByWalletIds(
    walletIds: string[],
    walletCurrencyMap: Record<string, string>,
  ): Promise<TransactionHistorySourceRecord[]> {
    const [transactions, payments, p2pTransfers, qrPayments, walletOperations] =
      await Promise.all([
        this.prisma.transaction.findMany({
          where: {
            OR: [
              { walletId: { in: walletIds } },
              { fromWalletId: { in: walletIds } },
              { toWalletId: { in: walletIds } },
            ],
          },
        }),
        this.prisma.payment.findMany({
          where: { walletId: { in: walletIds } },
          include: {
            audits: {
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        }),
        this.prisma.p2PTransfer.findMany({
          where: {
            OR: [
              { fromWalletId: { in: walletIds } },
              { toWalletId: { in: walletIds } },
            ],
          },
        }),
        this.prisma.qRPayment.findMany({
          where: {
            OR: [
              { payerWalletId: { in: walletIds } },
              { receiverWalletId: { in: walletIds } },
            ],
          },
        }),
        this.prisma.walletOperation.findMany({
          where: { walletId: { in: walletIds } },
        }),
      ])

    const transactionItems: TransactionHistorySourceRecord[] = transactions.map((item) => ({
      id: item.id,
      kind:
        item.type === "DEPOSIT"
          ? "deposit"
          : item.type === "WITHDRAW"
            ? "withdraw"
            : "transfer",
      status: item.status,
      amount: Number(item.amount),
      currency: walletCurrencyMap[item.walletId] ?? "USD",
      createdAt: item.createdAt,
      transactionId: item.id,
      walletId: item.walletId,
      reference: item.reference ?? undefined,
      sourceModule: "wallet",
      counterparty: {
        walletId: item.toWalletId ?? item.fromWalletId ?? undefined,
      },
      metadata: mergeWalletProviderPersistenceMetadata(null, {
        walletRoute: "wallet_internal_ledger",
        providerFamily: "unknown",
        providerStatus: "provider_not_required",
        riskStatus: "not_checked",
        complianceStatus: "pending",
        ledgerReference: item.reference ?? item.id,
        transactionId: item.id,
        walletId: item.walletId,
        sourceModule: "wallet",
        operationKind: item.type,
      }),
    }))

    const paymentItems: TransactionHistorySourceRecord[] = payments.map((item) => {
      const latestAudit = item.audits[0]
      const latestAuditMetadata = asMetadata(latestAudit?.data)
      const providerStatus = normalizeLedgerProviderStatus(item.status)

      return {
        id: item.id,
        kind: item.status === "REFUNDED" ? "refund" : "topup",
        status: item.status,
        amount:
          item.status === "REFUNDED"
            ? Number(item.refundedAmount)
            : Number(item.capturedAmount),
        currency: item.currency,
        createdAt: item.createdAt,
        transactionId: item.transactionId ?? undefined,
        walletId: item.walletId ?? undefined,
        reference: item.reference ?? item.providerPaymentId ?? undefined,
        sourceModule: "payments",
        metadata: mergeWalletProviderPersistenceMetadata(latestAuditMetadata, {
          walletRoute: paymentRouteFromStatus(item.status),
          providerFamily: "payment_provider",
          providerId: item.provider,
          providerPaymentId: item.providerPaymentId,
          providerReference: item.providerPaymentId,
          ledgerReference: item.transactionId ?? item.reference ?? item.providerPaymentId,
          transactionId: item.transactionId ?? null,
          walletId: item.walletId ?? null,
          sourceModule: "payments",
          operationKind: "payment_provider_status",
          providerStatus,
          riskStatus: "not_checked",
          complianceStatus: "pending",
          metadata: latestAuditMetadata,
        }),
      }
    })

    const p2pItems: TransactionHistorySourceRecord[] = p2pTransfers.map((item) => ({
      id: item.id,
      kind: walletIds.includes(item.fromWalletId) ? "p2p_sent" : "p2p_received",
      status: item.status,
      amount: Number(item.amount),
      currency:
        walletCurrencyMap[item.fromWalletId] ??
        walletCurrencyMap[item.toWalletId] ??
        "USD",
      createdAt: item.createdAt,
      transactionId: item.transactionId ?? undefined,
      walletId: walletIds.includes(item.fromWalletId) ? item.fromWalletId : item.toWalletId,
      reference: item.reference ?? undefined,
      sourceModule: "p2p",
      counterparty: walletIds.includes(item.fromWalletId)
        ? { walletId: item.toWalletId, userId: item.toUserId }
        : { walletId: item.fromWalletId, userId: item.fromUserId },
      metadata: mergeWalletProviderPersistenceMetadata(null, {
        walletRoute: "wallet_p2p_internal",
        providerFamily: "unknown",
        providerStatus: "provider_not_required",
        riskStatus: "not_checked",
        complianceStatus: "pending",
        ledgerReference: item.transactionId ?? item.reference ?? item.id,
        transactionId: item.transactionId ?? null,
        walletId: walletIds.includes(item.fromWalletId) ? item.fromWalletId : item.toWalletId,
        sourceModule: "p2p",
        operationKind: "p2p_transfer",
      }),
    }))

    const qrItems: TransactionHistorySourceRecord[] = qrPayments.map((item) => ({
      id: item.id,
      kind: "qr_payment",
      status: item.status,
      amount: Number(item.amount),
      currency: item.currency,
      createdAt: item.createdAt,
      transactionId: item.transactionId ?? undefined,
      walletId: walletIds.includes(item.payerWalletId)
        ? item.payerWalletId
        : item.receiverWalletId ?? undefined,
      reference: item.idempotencyKey ?? undefined,
      sourceModule: "qr",
      counterparty: walletIds.includes(item.payerWalletId)
        ? { walletId: item.receiverWalletId ?? undefined }
        : { walletId: item.payerWalletId },
      metadata: mergeWalletProviderPersistenceMetadata(null, {
        walletRoute: item.route ?? "qr_payment_route_not_configured",
        providerFamily: "payment_provider",
        providerStatus: item.status,
        riskStatus: item.status === "FAILED" ? "review_required" : "not_checked",
        complianceStatus: item.status === "FAILED" ? "admin_review_required" : "pending",
        ledgerReference: item.transactionId ?? item.idempotencyKey ?? item.id,
        transactionId: item.transactionId ?? null,
        walletId: walletIds.includes(item.payerWalletId)
          ? item.payerWalletId
          : item.receiverWalletId ?? null,
        sourceModule: "qr",
        operationKind: "qr_payment",
        idempotencyKey: item.idempotencyKey ?? null,
        metadata: {
          qrId: item.qrId,
          route: item.route,
          failureReason: item.failureReason,
          actorUserId: item.actorUserId,
        },
      }),
    }))

    const operationItems: TransactionHistorySourceRecord[] = walletOperations.map((item) => {
      const existingMetadata = asMetadata(item.metadata)

      return {
        id: item.id,
        kind: "wallet_operation",
        status: item.status,
        amount: Number(item.amount),
        currency: item.currency ?? walletCurrencyMap[item.walletId] ?? "USD",
        createdAt: item.createdAt,
        walletId: item.walletId,
        reference: item.reference ?? undefined,
        sourceModule: "wallet-core",
        counterparty: {
          walletId:
            item.merchantWalletId ??
            item.recipientBusinessWalletId ??
            item.senderBusinessWalletId ??
            undefined,
          userId: item.ownerUserId ?? undefined,
        },
        metadata: mergeWalletProviderPersistenceMetadata(existingMetadata, {
          walletRoute: String(existingMetadata.walletRoute ?? item.kind),
          providerFamily: String(existingMetadata.providerFamily ?? "unknown") as any,
          providerId: typeof existingMetadata.providerId === "string" ? existingMetadata.providerId : null,
          providerReference:
            typeof existingMetadata.providerReference === "string" ? existingMetadata.providerReference : null,
          ledgerReference: item.transactionId ?? item.reference ?? item.id,
          transactionId: item.transactionId ?? null,
          walletId: item.walletId,
          sourceModule: "wallet-core",
          operationKind: item.kind,
          providerStatus:
            typeof existingMetadata.providerStatus === "string"
              ? existingMetadata.providerStatus
              : "provider_not_configured",
          riskStatus:
            typeof existingMetadata.riskStatus === "string"
              ? existingMetadata.riskStatus
              : "not_checked",
          complianceStatus:
            typeof existingMetadata.complianceStatus === "string"
              ? existingMetadata.complianceStatus
              : "pending",
          metadata: existingMetadata,
        }),
      }
    })

    return [
      ...transactionItems,
      ...paymentItems,
      ...p2pItems,
      ...qrItems,
      ...operationItems,
    ]
  }
}
