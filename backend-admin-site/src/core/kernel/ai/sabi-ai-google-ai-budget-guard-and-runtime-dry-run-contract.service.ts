export type SabiAiGoogleAiBudgetGuardStatus =
  | "contract_prepared"
  | "waiting_for_owner_budget_limit"
  | "blocked"

export type SabiAiGoogleAiRuntimeDryRunStatus =
  | "contract_prepared"
  | "waiting_for_owner_runtime_approval"
  | "blocked"

export type SabiAiGoogleAiBudgetGuardContract = {
  service: "sabi_ai_google_ai_budget_guard"
  providerTarget: "google_ai_gemini"
  providerDisplayName: "Google AI / Gemini"
  status: SabiAiGoogleAiBudgetGuardStatus
  readOnly: true
  liveNow: false
  budgetLimitConfiguredNow: false
  costLimitEnforcedNow: false
  providerCallNow: false
  secretReadNow: false
  dbWriteNow: false
  futureOwnerBudgetApprovalRequired: true
  futureDailyLimitRequired: true
  futurePerRunLimitRequired: true
  futureAbuseStopRequired: true
  futureUsageLogRequired: true
  forbiddenWithoutBudgetGuard: [
    "google_ai_live_provider_call",
    "server_auto_learning_execution",
    "scheduled_training_job",
    "production_learning_loop"
  ]
  checkedAt: string
}

export type SabiAiGoogleAiRuntimeDryRunContract = {
  service: "sabi_ai_google_ai_runtime_dry_run"
  providerTarget: "google_ai_gemini"
  providerDisplayName: "Google AI / Gemini"
  status: SabiAiGoogleAiRuntimeDryRunStatus
  readOnly: true
  runtimeMountNow: false
  runtimeDryRunExecutedNow: false
  providerCallNow: false
  secretReadNow: false
  dbWriteNow: false
  productionLaunchNow: false
  futureOwnerRuntimeDryRunApprovalRequired: true
  futureDryRunMustUseNoProviderMode: true
  futureProviderHealthCheckRequiresSeparateApproval: true
  futureLiveAutoLearningRequiresSeparateApproval: true
  checkedAt: string
}

export type SabiAiGoogleAiBudgetAndRuntimeSnapshot = {
  service: "sabi_ai_google_ai_budget_guard_and_runtime_dry_run_contract"
  providerTarget: "google_ai_gemini"
  providerDisplayName: "Google AI / Gemini"
  readOnly: true
  budgetGuard: SabiAiGoogleAiBudgetGuardContract
  runtimeDryRun: SabiAiGoogleAiRuntimeDryRunContract
  readiness: {
    budgetGuardContractReadiness: 100
    runtimeDryRunContractReadiness: 100
    googleAiLiveConnectorReadiness: 0
    serverAutoLearningLiveReadiness: 0
  }
  hardLocks: {
    secretReadNow: false
    providerCallNow: false
    runtimeMountNow: false
    runtimeDryRunExecutedNow: false
    dbReadNow: false
    dbWriteNow: false
    paymentPayoutLegalProductionNow: false
  }
  ownerNextApprovalRequired: "OWNER_SET_GOOGLE_AI_BUDGET_LIMIT_AND_APPROVE_RUNTIME_DRY_RUN"
  checkedAt: string
}

export class SabiAiGoogleAiBudgetGuardAndRuntimeDryRunContractService {
  readonly serviceName = "sabi_ai_google_ai_budget_guard_and_runtime_dry_run_contract"
  readonly providerTarget = "google_ai_gemini"
  readonly providerDisplayName = "Google AI / Gemini"

  createBudgetGuardContract(now = new Date().toISOString()): SabiAiGoogleAiBudgetGuardContract {
    return {
      service: "sabi_ai_google_ai_budget_guard",
      providerTarget: this.providerTarget,
      providerDisplayName: this.providerDisplayName,
      status: "contract_prepared",
      readOnly: true,
      liveNow: false,
      budgetLimitConfiguredNow: false,
      costLimitEnforcedNow: false,
      providerCallNow: false,
      secretReadNow: false,
      dbWriteNow: false,
      futureOwnerBudgetApprovalRequired: true,
      futureDailyLimitRequired: true,
      futurePerRunLimitRequired: true,
      futureAbuseStopRequired: true,
      futureUsageLogRequired: true,
      forbiddenWithoutBudgetGuard: [
        "google_ai_live_provider_call",
        "server_auto_learning_execution",
        "scheduled_training_job",
        "production_learning_loop",
      ],
      checkedAt: now,
    }
  }

  createRuntimeDryRunContract(now = new Date().toISOString()): SabiAiGoogleAiRuntimeDryRunContract {
    return {
      service: "sabi_ai_google_ai_runtime_dry_run",
      providerTarget: this.providerTarget,
      providerDisplayName: this.providerDisplayName,
      status: "contract_prepared",
      readOnly: true,
      runtimeMountNow: false,
      runtimeDryRunExecutedNow: false,
      providerCallNow: false,
      secretReadNow: false,
      dbWriteNow: false,
      productionLaunchNow: false,
      futureOwnerRuntimeDryRunApprovalRequired: true,
      futureDryRunMustUseNoProviderMode: true,
      futureProviderHealthCheckRequiresSeparateApproval: true,
      futureLiveAutoLearningRequiresSeparateApproval: true,
      checkedAt: now,
    }
  }

  getSnapshot(now = new Date().toISOString()): SabiAiGoogleAiBudgetAndRuntimeSnapshot {
    return {
      service: this.serviceName,
      providerTarget: this.providerTarget,
      providerDisplayName: this.providerDisplayName,
      readOnly: true,
      budgetGuard: this.createBudgetGuardContract(now),
      runtimeDryRun: this.createRuntimeDryRunContract(now),
      readiness: {
        budgetGuardContractReadiness: 100,
        runtimeDryRunContractReadiness: 100,
        googleAiLiveConnectorReadiness: 0,
        serverAutoLearningLiveReadiness: 0,
      },
      hardLocks: {
        secretReadNow: false,
        providerCallNow: false,
        runtimeMountNow: false,
        runtimeDryRunExecutedNow: false,
        dbReadNow: false,
        dbWriteNow: false,
        paymentPayoutLegalProductionNow: false,
      },
      ownerNextApprovalRequired: "OWNER_SET_GOOGLE_AI_BUDGET_LIMIT_AND_APPROVE_RUNTIME_DRY_RUN",
      checkedAt: now,
    }
  }

  assertNoLiveEffects(snapshot = this.getSnapshot()): true {
    if (
      snapshot.hardLocks.secretReadNow ||
      snapshot.hardLocks.providerCallNow ||
      snapshot.hardLocks.runtimeMountNow ||
      snapshot.hardLocks.runtimeDryRunExecutedNow ||
      snapshot.hardLocks.dbReadNow ||
      snapshot.hardLocks.dbWriteNow ||
      snapshot.hardLocks.paymentPayoutLegalProductionNow
    ) {
      throw new Error("Budget guard and runtime dry-run contract must not perform live effects.")
    }

    return true
  }
}

export const sabiAiGoogleAiBudgetGuardAndRuntimeDryRunContractService =
  new SabiAiGoogleAiBudgetGuardAndRuntimeDryRunContractService()
