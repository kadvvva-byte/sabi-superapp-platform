import {
  sabiAiAutoLearningJobService,
  type SabiAiAutoLearningReadinessSnapshot,
  type SabiAiAutoLearningPlan,
} from "./sabi-ai-auto-learning-job.service"

export type SabiAiTrainingProcessGateStatus = "ready" | "disabled" | "blocked"

export type SabiAiTrainingProcessAdminSnapshot = {
  service: "sabi_ai_training_process_monitor"
  adminFacing: true
  readOnly: true
  providerTarget: "google_ai_gemini"
  providerDisplayName: "Google AI / Gemini"
  autoLearning: SabiAiAutoLearningReadinessSnapshot
  disabledPlan: SabiAiAutoLearningPlan
  gates: {
    ownerRulesLoaded: SabiAiTrainingProcessGateStatus
    personalityPackLoaded: SabiAiTrainingProcessGateStatus
    moduleGovernanceLoaded: SabiAiTrainingProcessGateStatus
    safetyPolicyLoaded: SabiAiTrainingProcessGateStatus
    googleAiBackendConnectorPrepared: SabiAiTrainingProcessGateStatus
    googleAiLiveConnectorEnabled: SabiAiTrainingProcessGateStatus
    serverAutoLearningEnabled: SabiAiTrainingProcessGateStatus
    adminMonitorReady: SabiAiTrainingProcessGateStatus
    providerBudgetGuardReady: SabiAiTrainingProcessGateStatus
    runtimeDryRunReady: SabiAiTrainingProcessGateStatus
  }
  readiness: {
    sabiAiSafetyGuardReadiness: 100
    googleAiAdminBackendMigrationReadiness: 80
    serverAutoLearningFoundationReadiness: 45
    trainingProcessMonitorReadiness: 35
    googleAiLiveConnectorReadiness: 0
    fullSabiAiServerLearningReadiness: 60
  }
  hardLocks: {
    readSecretsNow: false
    callGoogleAiNow: false
    callProviderNow: false
    scheduleTrainingJobNow: false
    executeTrainingJobNow: false
    mountRuntimeNow: false
    readDbNow: false
    writeDbNow: false
    paymentPayoutLegalProductionNow: false
  }
  ownerNextApprovalRequired: "OWNER_CONFIGURE_GOOGLE_AI_SECRET_AND_BUDGET_GUARD"
  checkedAt: string
}

export class SabiAiTrainingProcessMonitorService {
  readonly serviceName = "sabi_ai_training_process_monitor"
  readonly providerTarget = "google_ai_gemini"
  readonly providerDisplayName = "Google AI / Gemini"

  getAdminSnapshot(now = new Date().toISOString()): SabiAiTrainingProcessAdminSnapshot {
    const autoLearning = sabiAiAutoLearningJobService.getStatus(now)
    const disabledPlan = sabiAiAutoLearningJobService.createDisabledPlan()

    return {
      service: this.serviceName,
      adminFacing: true,
      readOnly: true,
      providerTarget: this.providerTarget,
      providerDisplayName: this.providerDisplayName,
      autoLearning,
      disabledPlan,
      gates: {
        ownerRulesLoaded: "ready",
        personalityPackLoaded: "ready",
        moduleGovernanceLoaded: "ready",
        safetyPolicyLoaded: "ready",
        googleAiBackendConnectorPrepared: "ready",
        googleAiLiveConnectorEnabled: "disabled",
        serverAutoLearningEnabled: "disabled",
        adminMonitorReady: "ready",
        providerBudgetGuardReady: "disabled",
        runtimeDryRunReady: "disabled",
      },
      readiness: {
        sabiAiSafetyGuardReadiness: 100,
        googleAiAdminBackendMigrationReadiness: 80,
        serverAutoLearningFoundationReadiness: 45,
        trainingProcessMonitorReadiness: 35,
        googleAiLiveConnectorReadiness: 0,
        fullSabiAiServerLearningReadiness: 60,
      },
      hardLocks: {
        readSecretsNow: false,
        callGoogleAiNow: false,
        callProviderNow: false,
        scheduleTrainingJobNow: false,
        executeTrainingJobNow: false,
        mountRuntimeNow: false,
        readDbNow: false,
        writeDbNow: false,
        paymentPayoutLegalProductionNow: false,
      },
      ownerNextApprovalRequired: "OWNER_CONFIGURE_GOOGLE_AI_SECRET_AND_BUDGET_GUARD",
      checkedAt: now,
    }
  }

  assertReadOnlyNoLiveEffects(): true {
    const snapshot = this.getAdminSnapshot()

    if (
      snapshot.hardLocks.readSecretsNow ||
      snapshot.hardLocks.callGoogleAiNow ||
      snapshot.hardLocks.callProviderNow ||
      snapshot.hardLocks.scheduleTrainingJobNow ||
      snapshot.hardLocks.executeTrainingJobNow ||
      snapshot.hardLocks.mountRuntimeNow ||
      snapshot.hardLocks.readDbNow ||
      snapshot.hardLocks.writeDbNow ||
      snapshot.hardLocks.paymentPayoutLegalProductionNow
    ) {
      throw new Error("Sabi AI training process monitor must remain read-only until Owner live approval.")
    }

    return true
  }
}

export const sabiAiTrainingProcessMonitorService = new SabiAiTrainingProcessMonitorService()
