export type SabiAiGoogleAiBudgetGuardValuesStatus =
  | "accepted"
  | "waiting_for_budget_values"
  | "rejected"

export type SabiAiGoogleAiBudgetGuardValues = {
  service: "sabi_ai_google_ai_budget_guard_values"
  status: SabiAiGoogleAiBudgetGuardValuesStatus
  providerTarget: "google_ai_gemini"
  providerDisplayName: "Google AI / Gemini"
  dailyUsdLimit: number
  perRunUsdLimit: number
  monthlyUsdLimit: number
  abuseStopEnabled: boolean
  usageAuditEnabled: boolean
  budgetValuesAcceptedNow: boolean
  budgetGuardLiveNow: false
  costLimitEnforcedNow: false
  realSecretMustNotBeSentInChat: true
  secretReadNow: false
  secretStoredNow: false
  providerCallNow: false
  googleCallNow: false
  dbWriteNow: false
  productionLaunchNow: false
  providerHealthCheckRequiresSeparateApproval: true
  liveAutoLearningRequiresSeparateApproval: true
  checkedAt: string
}

export class SabiAiGoogleAiBudgetGuardValuesService {
  readonly serviceName = "sabi_ai_google_ai_budget_guard_values" as const
  readonly providerTarget = "google_ai_gemini" as const
  readonly providerDisplayName = "Google AI / Gemini" as const

  createValues(
    input: {
      dailyUsdLimit: number
      perRunUsdLimit: number
      monthlyUsdLimit: number
      abuseStopEnabled: boolean
      usageAuditEnabled: boolean
    },
    now = new Date().toISOString(),
  ): SabiAiGoogleAiBudgetGuardValues {
    const valid =
      Number.isFinite(input.dailyUsdLimit) &&
      Number.isFinite(input.perRunUsdLimit) &&
      Number.isFinite(input.monthlyUsdLimit) &&
      input.dailyUsdLimit > 0 &&
      input.perRunUsdLimit > 0 &&
      input.monthlyUsdLimit > 0 &&
      input.perRunUsdLimit <= input.dailyUsdLimit &&
      input.dailyUsdLimit <= input.monthlyUsdLimit &&
      input.abuseStopEnabled &&
      input.usageAuditEnabled

    return {
      service: this.serviceName,
      status: valid ? "accepted" : "rejected",
      providerTarget: this.providerTarget,
      providerDisplayName: this.providerDisplayName,
      dailyUsdLimit: input.dailyUsdLimit,
      perRunUsdLimit: input.perRunUsdLimit,
      monthlyUsdLimit: input.monthlyUsdLimit,
      abuseStopEnabled: input.abuseStopEnabled,
      usageAuditEnabled: input.usageAuditEnabled,
      budgetValuesAcceptedNow: valid,
      budgetGuardLiveNow: false,
      costLimitEnforcedNow: false,
      realSecretMustNotBeSentInChat: true,
      secretReadNow: false,
      secretStoredNow: false,
      providerCallNow: false,
      googleCallNow: false,
      dbWriteNow: false,
      productionLaunchNow: false,
      providerHealthCheckRequiresSeparateApproval: true,
      liveAutoLearningRequiresSeparateApproval: true,
      checkedAt: now,
    }
  }

  assertValuesSafe(values: SabiAiGoogleAiBudgetGuardValues): true {
    if (
      !values.realSecretMustNotBeSentInChat ||
      values.secretReadNow ||
      values.secretStoredNow ||
      values.providerCallNow ||
      values.googleCallNow ||
      values.dbWriteNow ||
      values.productionLaunchNow ||
      values.budgetGuardLiveNow ||
      values.costLimitEnforcedNow
    ) {
      throw new Error("Budget guard values intake must remain no-secret, no-provider-call, and not live.")
    }

    return true
  }
}

export const sabiAiGoogleAiBudgetGuardValuesService =
  new SabiAiGoogleAiBudgetGuardValuesService()
