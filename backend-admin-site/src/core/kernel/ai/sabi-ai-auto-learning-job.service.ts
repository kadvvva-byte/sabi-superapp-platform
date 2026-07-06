export type SabiAiAutoLearningJobStatus =
  | "disabled"
  | "ready_for_owner_approval"
  | "blocked"

export type SabiAiAutoLearningSourceKind =
  | "owner_rules"
  | "personality_pack"
  | "module_governance"
  | "safety_policy"
  | "readiness_report"
  | "admin_feedback"

export type SabiAiAutoLearningReadinessSnapshot = {
  service: "sabi_ai_auto_learning"
  providerTarget: "google_ai_gemini"
  status: SabiAiAutoLearningJobStatus
  enabledNow: false
  scheduledNow: false
  executedNow: false
  providerCallNow: false
  secretReadNow: false
  dbWriteNow: false
  runtimeMountNow: false
  productionLaunchNow: false
  readiness: {
    serverJobStubReadiness: 100
    liveAutoLearningReadiness: 0
    googleAiLiveConnectorReadiness: 0
    trainingSourceContractReadiness: 100
    ownerApprovalGateReadiness: 100
  }
  nextRequiredApproval: "OWNER_ENABLE_SERVER_AUTO_LEARNING"
  checkedAt: string
}

export type SabiAiAutoLearningPlan = {
  planId: "SABI_AI_AUTO_LEARNING_DISABLED_PLAN"
  status: "prepared_disabled"
  canScheduleNow: false
  canExecuteNow: false
  canCallGoogleAiNow: false
  canReadSecretsNow: false
  canWriteDbNow: false
  reason: string
  sourceKinds: SabiAiAutoLearningSourceKind[]
  futureRequirements: {
    ownerEnableApproval: true
    backendSecretConfiguration: true
    providerBudgetGuard: true
    runtimeDryRun: true
    adminTrainingMonitor: true
  }
}

const SOURCE_KINDS: SabiAiAutoLearningSourceKind[] = [
  "owner_rules",
  "personality_pack",
  "module_governance",
  "safety_policy",
  "readiness_report",
  "admin_feedback",
]

export class SabiAiAutoLearningJobService {
  readonly serviceName = "sabi_ai_auto_learning"
  readonly providerTarget = "google_ai_gemini"
  readonly disabledReason =
    "Server auto-learning is prepared but disabled. Owner approval, backend-only Google AI secret configuration, budget guard, runtime dry-run, and Admin monitor are required before live learning."

  getStatus(now = new Date().toISOString()): SabiAiAutoLearningReadinessSnapshot {
    return {
      service: this.serviceName,
      providerTarget: this.providerTarget,
      status: "disabled",
      enabledNow: false,
      scheduledNow: false,
      executedNow: false,
      providerCallNow: false,
      secretReadNow: false,
      dbWriteNow: false,
      runtimeMountNow: false,
      productionLaunchNow: false,
      readiness: {
        serverJobStubReadiness: 100,
        liveAutoLearningReadiness: 0,
        googleAiLiveConnectorReadiness: 0,
        trainingSourceContractReadiness: 100,
        ownerApprovalGateReadiness: 100,
      },
      nextRequiredApproval: "OWNER_ENABLE_SERVER_AUTO_LEARNING",
      checkedAt: now,
    }
  }

  createDisabledPlan(): SabiAiAutoLearningPlan {
    return {
      planId: "SABI_AI_AUTO_LEARNING_DISABLED_PLAN",
      status: "prepared_disabled",
      canScheduleNow: false,
      canExecuteNow: false,
      canCallGoogleAiNow: false,
      canReadSecretsNow: false,
      canWriteDbNow: false,
      reason: this.disabledReason,
      sourceKinds: SOURCE_KINDS,
      futureRequirements: {
        ownerEnableApproval: true,
        backendSecretConfiguration: true,
        providerBudgetGuard: true,
        runtimeDryRun: true,
        adminTrainingMonitor: true,
      },
    }
  }

  assertNoLiveEffects(): true {
    const status = this.getStatus()
    if (
      status.enabledNow ||
      status.scheduledNow ||
      status.executedNow ||
      status.providerCallNow ||
      status.secretReadNow ||
      status.dbWriteNow ||
      status.runtimeMountNow ||
      status.productionLaunchNow
    ) {
      throw new Error("Sabi AI auto-learning job must remain disabled until Owner live approval.")
    }

    return true
  }
}

export const sabiAiAutoLearningJobService = new SabiAiAutoLearningJobService()
