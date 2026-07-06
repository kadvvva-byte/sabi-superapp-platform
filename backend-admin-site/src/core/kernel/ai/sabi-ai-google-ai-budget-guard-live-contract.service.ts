export type SabiAiGoogleAiBudgetGuardDecision =
  | "allow"
  | "block_per_run_limit"
  | "block_daily_limit"
  | "block_monthly_limit"
  | "block_abuse_stop_disabled"
  | "block_usage_audit_disabled"

export type SabiAiGoogleAiBudgetGuardLiveContract = {
  service: "sabi_ai_google_ai_budget_guard_live_contract"
  status: "local_budget_guard_live"
  providerTarget: "google_ai_gemini"
  providerDisplayName: "Google AI / Gemini"
  localGuardOnly: true
  dailyUsdLimit: number
  perRunUsdLimit: number
  monthlyUsdLimit: number
  abuseStopEnabled: boolean
  usageAuditEnabled: boolean
  budgetGuardLiveNow: true
  costLimitEnforcedNow: true
  secretReadNow: false
  secretStoredNow: false
  envReadNow: false
  secretManagerCallNow: false
  providerCallNow: false
  googleCallNow: false
  providerHealthCheckNow: false
  liveAutoLearningNow: false
  dbWriteNow: false
  productionLaunchNow: false
  providerHealthCheckRequiresSeparateApproval: true
  liveAutoLearningRequiresSeparateApproval: true
  checkedAt: string
}

export class SabiAiGoogleAiBudgetGuardLiveContractService {
  readonly serviceName = "sabi_ai_google_ai_budget_guard_live_contract" as const
  readonly providerTarget = "google_ai_gemini" as const
  readonly providerDisplayName = "Google AI / Gemini" as const

  createContract(
    input: {
      dailyUsdLimit: number
      perRunUsdLimit: number
      monthlyUsdLimit: number
      abuseStopEnabled: boolean
      usageAuditEnabled: boolean
    },
    now = new Date().toISOString(),
  ): SabiAiGoogleAiBudgetGuardLiveContract {
    return {
      service: this.serviceName,
      status: "local_budget_guard_live",
      providerTarget: this.providerTarget,
      providerDisplayName: this.providerDisplayName,
      localGuardOnly: true,
      dailyUsdLimit: input.dailyUsdLimit,
      perRunUsdLimit: input.perRunUsdLimit,
      monthlyUsdLimit: input.monthlyUsdLimit,
      abuseStopEnabled: input.abuseStopEnabled,
      usageAuditEnabled: input.usageAuditEnabled,
      budgetGuardLiveNow: true,
      costLimitEnforcedNow: true,
      secretReadNow: false,
      secretStoredNow: false,
      envReadNow: false,
      secretManagerCallNow: false,
      providerCallNow: false,
      googleCallNow: false,
      providerHealthCheckNow: false,
      liveAutoLearningNow: false,
      dbWriteNow: false,
      productionLaunchNow: false,
      providerHealthCheckRequiresSeparateApproval: true,
      liveAutoLearningRequiresSeparateApproval: true,
      checkedAt: now,
    }
  }

  evaluateRunBudget(
    input: {
      estimatedUsd: number
      dailyUsedUsd: number
      monthlyUsedUsd: number
      abuseStopEnabled: boolean
      usageAuditEnabled: boolean
      dailyUsdLimit: number
      perRunUsdLimit: number
      monthlyUsdLimit: number
    },
  ): { decision: SabiAiGoogleAiBudgetGuardDecision; allowed: boolean } {
    if (!input.abuseStopEnabled) return { decision: "block_abuse_stop_disabled", allowed: false }
    if (!input.usageAuditEnabled) return { decision: "block_usage_audit_disabled", allowed: false }
    if (input.estimatedUsd > input.perRunUsdLimit) return { decision: "block_per_run_limit", allowed: false }
    if (input.dailyUsedUsd + input.estimatedUsd > input.dailyUsdLimit) return { decision: "block_daily_limit", allowed: false }
    if (input.monthlyUsedUsd + input.estimatedUsd > input.monthlyUsdLimit) return { decision: "block_monthly_limit", allowed: false }

    return { decision: "allow", allowed: true }
  }

  assertContractSafe(contract: SabiAiGoogleAiBudgetGuardLiveContract): true {
    if (
      !contract.localGuardOnly ||
      !contract.budgetGuardLiveNow ||
      !contract.costLimitEnforcedNow ||
      contract.secretReadNow ||
      contract.secretStoredNow ||
      contract.envReadNow ||
      contract.secretManagerCallNow ||
      contract.providerCallNow ||
      contract.googleCallNow ||
      contract.providerHealthCheckNow ||
      contract.liveAutoLearningNow ||
      contract.dbWriteNow ||
      contract.productionLaunchNow
    ) {
      throw new Error("Budget guard live contract must remain local-only with no secret, no provider call, and no DB write.")
    }

    return true
  }
}

export const sabiAiGoogleAiBudgetGuardLiveContractService =
  new SabiAiGoogleAiBudgetGuardLiveContractService()
