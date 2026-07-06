import { sabiAiAutoLearningJobService } from "./sabi-ai-auto-learning-job.service"
import { sabiAiTrainingProcessMonitorService } from "./sabi-ai-training-process-monitor.service"
import { sabiAiGoogleAiSecretIntakePacketService } from "./sabi-ai-google-ai-secret-intake-packet.service"
import { sabiAiGoogleAiBudgetGuardAndRuntimeDryRunContractService } from "./sabi-ai-google-ai-budget-guard-and-runtime-dry-run-contract.service"

export type SabiAiServerRuntimeDryRunNoProviderSnapshot = {
  service: "sabi_ai_server_runtime_dry_run_no_provider"
  status: "passed"
  dryRunMode: "no_provider"
  providerTarget: "google_ai_gemini"
  providerDisplayName: "Google AI / Gemini"
  localOnly: true
  executedNow: true
  runtimeMountedNow: false
  providerCallNow: false
  googleCallNow: false
  secretReadNow: false
  secretStoredNow: false
  dbReadNow: false
  dbWriteNow: false
  paymentPayoutLegalProductionNow: false
  autoLearning: unknown
  trainingMonitor: unknown
  secretPacket: unknown
  budgetRuntimeContract: unknown
  readiness: {
    noProviderDryRunReadiness: 100
    serverAutoLearningFoundationReadiness: 60
    googleAiAdminBackendMigrationReadiness: 80
    trainingProcessMonitorReadiness: 35
    googleAiLiveConnectorReadiness: 0
    fullSabiAiServerLearningReadiness: 78
  }
  hardLocks: {
    providerCallNow: false
    googleCallNow: false
    secretReadNow: false
    secretStoredNow: false
    runtimeMountedNow: false
    dbReadNow: false
    dbWriteNow: false
    paymentPayoutLegalProductionNow: false
  }
  ownerNextApprovalRequired: "OWNER_CONFIGURE_REAL_GOOGLE_AI_SECRET_BUDGET_AND_PROVIDER_HEALTH_CHECK"
  checkedAt: string
}

export class SabiAiServerRuntimeDryRunNoProviderService {
  readonly serviceName = "sabi_ai_server_runtime_dry_run_no_provider"
  readonly providerTarget = "google_ai_gemini"
  readonly providerDisplayName = "Google AI / Gemini"

  runNoProviderDryRun(now = new Date().toISOString()): SabiAiServerRuntimeDryRunNoProviderSnapshot {
    sabiAiAutoLearningJobService.assertNoLiveEffects()
    sabiAiTrainingProcessMonitorService.assertReadOnlyNoLiveEffects()
    sabiAiGoogleAiSecretIntakePacketService.assertPacketHasNoSecretMaterial()
    sabiAiGoogleAiBudgetGuardAndRuntimeDryRunContractService.assertNoLiveEffects()

    const autoLearning = sabiAiAutoLearningJobService.getStatus(now)
    const trainingMonitor = sabiAiTrainingProcessMonitorService.getAdminSnapshot(now)
    const secretPacket = sabiAiGoogleAiSecretIntakePacketService.createPacket(now)
    const budgetRuntimeContract = sabiAiGoogleAiBudgetGuardAndRuntimeDryRunContractService.getSnapshot(now)

    return {
      service: this.serviceName,
      status: "passed",
      dryRunMode: "no_provider",
      providerTarget: this.providerTarget,
      providerDisplayName: this.providerDisplayName,
      localOnly: true,
      executedNow: true,
      runtimeMountedNow: false,
      providerCallNow: false,
      googleCallNow: false,
      secretReadNow: false,
      secretStoredNow: false,
      dbReadNow: false,
      dbWriteNow: false,
      paymentPayoutLegalProductionNow: false,
      autoLearning,
      trainingMonitor,
      secretPacket,
      budgetRuntimeContract,
      readiness: {
        noProviderDryRunReadiness: 100,
        serverAutoLearningFoundationReadiness: 60,
        googleAiAdminBackendMigrationReadiness: 80,
        trainingProcessMonitorReadiness: 35,
        googleAiLiveConnectorReadiness: 0,
        fullSabiAiServerLearningReadiness: 78,
      },
      hardLocks: {
        providerCallNow: false,
        googleCallNow: false,
        secretReadNow: false,
        secretStoredNow: false,
        runtimeMountedNow: false,
        dbReadNow: false,
        dbWriteNow: false,
        paymentPayoutLegalProductionNow: false,
      },
      ownerNextApprovalRequired: "OWNER_CONFIGURE_REAL_GOOGLE_AI_SECRET_BUDGET_AND_PROVIDER_HEALTH_CHECK",
      checkedAt: now,
    }
  }

  assertDryRunSnapshotSafe(snapshot = this.runNoProviderDryRun()): true {
    if (
      snapshot.runtimeMountedNow ||
      snapshot.providerCallNow ||
      snapshot.googleCallNow ||
      snapshot.secretReadNow ||
      snapshot.secretStoredNow ||
      snapshot.dbReadNow ||
      snapshot.dbWriteNow ||
      snapshot.paymentPayoutLegalProductionNow ||
      snapshot.dryRunMode !== "no_provider"
    ) {
      throw new Error("Sabi AI no-provider dry-run must not perform live effects.")
    }

    return true
  }
}

export const sabiAiServerRuntimeDryRunNoProviderService =
  new SabiAiServerRuntimeDryRunNoProviderService()
