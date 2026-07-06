import {
  walletSecurityRuntimeGuard,
  type WalletRuntimeGuardInput,
  type WalletRuntimeGuardResult,
} from "./wallet-security-runtime-guard.service"
import type {
  WalletComplianceReport,
  WalletComplianceSnapshot,
  WalletRestrictedState,
} from "./wallet-security-compliance.service"
import type { WalletSecurityStatus } from "./wallet-ai-risk-guard.service"

export class WalletLockService {
  private readonly locks = new Set<string>()

  acquire(walletId: string): void {
    this.assertWalletId(walletId)
    this.assertWalletCanOperate(walletId)

    if (this.locks.has(walletId)) {
      throw new Error("wallet_operation_already_locked")
    }

    this.locks.add(walletId)
  }

  release(walletId: string): void {
    this.assertWalletId(walletId)
    this.locks.delete(walletId)
  }

  isLocked(walletId: string): boolean {
    this.assertWalletId(walletId)
    return this.locks.has(walletId)
  }

  assertUnlocked(walletId: string): void {
    this.assertWalletId(walletId)

    if (this.locks.has(walletId)) {
      throw new Error("wallet_operation_already_locked")
    }
  }

  assertWalletCanOperate(walletId: string): void {
    this.assertWalletId(walletId)
    walletSecurityRuntimeGuard.assertWalletCanOperate(walletId)
  }

  getWalletSecurityStatus(walletId: string): WalletSecurityStatus {
    this.assertWalletId(walletId)
    return walletSecurityRuntimeGuard.getWalletStatus(walletId)
  }

  getRestrictedState(walletId: string): WalletRestrictedState | null {
    this.assertWalletId(walletId)
    return walletSecurityRuntimeGuard.getRestrictedState(walletId)
  }

  getSecuritySnapshot(walletId: string): WalletComplianceSnapshot {
    this.assertWalletId(walletId)
    return walletSecurityRuntimeGuard.getSnapshot(walletId)
  }

  listComplianceReports(userId?: string): WalletComplianceReport[] {
    return walletSecurityRuntimeGuard.listReports(userId)
  }

  async evaluateSecurity(input: WalletRuntimeGuardInput): Promise<WalletRuntimeGuardResult> {
    return walletSecurityRuntimeGuard.evaluateOperation(input)
  }

  async assertSecurityAllowed(input: WalletRuntimeGuardInput): Promise<WalletRuntimeGuardResult> {
    return walletSecurityRuntimeGuard.assertOperationAllowed(input)
  }

  releaseSecurityHold(input: {
    walletId: string
    reviewerId?: string | null
    reason?: string | null
  }): WalletRestrictedState {
    this.assertWalletId(input.walletId)

    return walletSecurityRuntimeGuard.releaseWallet({
      walletId: input.walletId,
      reviewerId: input.reviewerId,
      reason: input.reason,
    })
  }

  resolveComplianceReport(input: {
    reportId: string
    reviewerId: string
    resolutionNote: string
    releaseWallet?: boolean
  }): WalletComplianceReport {
    return walletSecurityRuntimeGuard.resolveReport(input)
  }

  rejectComplianceReport(input: {
    reportId: string
    reviewerId: string
    resolutionNote: string
  }): WalletComplianceReport {
    return walletSecurityRuntimeGuard.rejectReport(input)
  }

  private assertWalletId(walletId: string): void {
    if (!walletId || !walletId.trim()) {
      throw new Error("wallet_id_required")
    }
  }
}

export const walletLockService = new WalletLockService()