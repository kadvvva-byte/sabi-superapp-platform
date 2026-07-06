import { Prisma, PrismaClient } from "@prisma/client"

import type {
  WalletComplianceReport,
  WalletRestrictedState,
} from "../../application/security/wallet-security-compliance.service"
import { mergeWalletProviderPersistenceMetadata } from "../../application/security/wallet-provider-persistence.policy"

function toJsonValue(value: Record<string, unknown>): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue
}

function referenceFor(prefix: string, id: string): string {
  return `${prefix}:${id}`.slice(0, 180)
}

export class PrismaWalletComplianceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async persistReport(report: WalletComplianceReport): Promise<void> {
    const walletId = report.walletId
    if (!walletId) return

    const metadata = mergeWalletProviderPersistenceMetadata(
      {
        report,
        reportId: report.reportId,
        category: report.category,
        priority: report.priority,
        signals: report.signals,
        blockedFields: report.blockedFields,
      },
      {
        walletRoute: "wallet_admin_compliance_report",
        providerFamily: "unknown",
        providerStatus: "provider_not_configured",
        riskStatus:
          report.riskLevel === "critical" || report.riskLevel === "high"
            ? "safe_hold"
            : "review_required",
        complianceStatus: "admin_review_required",
        walletId,
        sourceModule: "wallet-compliance",
        operationKind: report.operationKind,
        adminReviewStatus: report.status,
        safeHoldReason: report.internalReason,
      },
    )

    await this.prisma.walletOperation.upsert({
      where: { reference: referenceFor("wallet-compliance-report", report.reportId) },
      update: {
        status: report.status,
        metadata: toJsonValue(metadata),
      },
      create: {
        id: report.reportId,
        kind: "wallet_compliance_report",
        status: report.status,
        ownerUserId: report.userId,
        walletId,
        amount: new Prisma.Decimal(0),
        feeAmount: new Prisma.Decimal(0),
        netAmount: new Prisma.Decimal(0),
        currency: null,
        reference: referenceFor("wallet-compliance-report", report.reportId),
        metadata: toJsonValue(metadata),
      },
    })
  }

  async persistRestrictedState(state: WalletRestrictedState): Promise<void> {
    const metadata = mergeWalletProviderPersistenceMetadata(
      {
        restrictedState: state,
        reportId: state.reportId,
        reasonCode: state.reasonCode,
        fundsAction: state.fundsAction,
        ...(state.metadata ?? {}),
      },
      {
        walletRoute: "wallet_admin_restriction",
        providerFamily: "unknown",
        providerStatus: "provider_restricted",
        riskStatus:
          state.status === "safe_hold" ? "safe_hold" : "restricted",
        complianceStatus:
          state.status === "safe_hold" ? "safe_hold" : "restricted",
        walletId: state.walletId,
        sourceModule: "wallet-compliance",
        operationKind: state.operationKind ?? "wallet_restriction",
        adminReviewStatus: state.reportId ? "created" : "not_required",
        safeHoldReason: state.status === "safe_hold" ? state.internalReason : null,
        restrictedReason: state.status !== "safe_hold" ? state.internalReason : null,
      },
    )

    await this.prisma.$transaction(async (tx) => {
      await tx.wallet.updateMany({
        where: { id: state.walletId },
        data: { locked: state.status !== "active" },
      })

      await tx.walletOperation.upsert({
        where: { reference: referenceFor("wallet-restricted-state", state.walletId) },
        update: {
          status: state.status,
          metadata: toJsonValue(metadata),
        },
        create: {
          id: `${state.walletId}:restriction`.slice(0, 190),
          kind: "wallet_restricted_state",
          status: state.status,
          ownerUserId: state.userId,
          walletId: state.walletId,
          amount: new Prisma.Decimal(0),
          feeAmount: new Prisma.Decimal(0),
          netAmount: new Prisma.Decimal(0),
          currency: null,
          reference: referenceFor("wallet-restricted-state", state.walletId),
          metadata: toJsonValue(metadata),
        },
      })
    })
  }
}
