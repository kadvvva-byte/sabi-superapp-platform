import { sabiAiAutoLearningJobService } from "../../../../core/kernel/ai/sabi-ai-auto-learning-job.service"
import { sabiAiTrainingProcessMonitorService } from "../../../../core/kernel/ai/sabi-ai-training-process-monitor.service"
import { sabiAiGoogleAiSecretIntakePacketService } from "../../../../core/kernel/ai/sabi-ai-google-ai-secret-intake-packet.service"
import { sabiAiGoogleAiBudgetGuardAndRuntimeDryRunContractService } from "../../../../core/kernel/ai/sabi-ai-google-ai-budget-guard-and-runtime-dry-run-contract.service"
import { sabiAiServerRuntimeDryRunNoProviderService } from "../../../../core/kernel/ai/sabi-ai-server-runtime-dry-run-no-provider.service"

export type SabiAiTrainingMonitorRouteRequest = {
  method?: string
  url?: string
  query?: Record<string, unknown>
  user?: unknown
}

export type SabiAiTrainingMonitorRouteResponse = {
  status?: (code: number) => SabiAiTrainingMonitorRouteResponse
  json: (body: unknown) => unknown
}

export type SabiAiTrainingMonitorRouteNext = (error?: unknown) => unknown

export type SabiAiTrainingMonitorRouteHandler = (
  req: SabiAiTrainingMonitorRouteRequest,
  res: SabiAiTrainingMonitorRouteResponse,
  next?: SabiAiTrainingMonitorRouteNext,
) => unknown | Promise<unknown>

export type SabiAiTrainingMonitorRouteLike = {
  get: (path: string, handler: SabiAiTrainingMonitorRouteHandler) => unknown
}

export type SabiAiTrainingMonitorReadSnapshot = {
  service: "sabi_ai_admin_training_monitor_read_route"
  routePath: "/api/admin/sabi-ai/training-monitor/readiness"
  method: "GET"
  adminOnly: true
  readOnly: true
  providerTarget: "google_ai_gemini"
  providerDisplayName: "Google AI / Gemini"
  mountedByThisFile: false
  providerCallNow: false
  googleCallNow: false
  secretReadNow: false
  secretStoredNow: false
  dbWriteNow: false
  paymentPayoutLegalProductionNow: false
  autoLearning: unknown
  trainingMonitor: unknown
  secretPacket: unknown
  budgetRuntimeContract: unknown
  noProviderDryRun: unknown
  readiness: {
    adminTrainingMonitorReadRouteReadiness: 100
    serverAutoLearningFoundationReadiness: 60
    googleAiAdminBackendMigrationReadiness: 85
    trainingProcessMonitorReadiness: 55
    googleAiLiveConnectorReadiness: 0
    fullSabiAiServerLearningReadiness: 82
  }
  hardLocks: {
    providerCallNow: false
    googleCallNow: false
    secretReadNow: false
    secretStoredNow: false
    dbWriteNow: false
    paymentPayoutLegalProductionNow: false
  }
  ownerNextApprovalRequired: "OWNER_APPROVE_ADMIN_ROUTE_MOUNT_OR_REAL_GOOGLE_AI_SECRET_FLOW"
  checkedAt: string
}

export function buildSabiAiTrainingMonitorReadSnapshot(
  now = new Date().toISOString(),
): SabiAiTrainingMonitorReadSnapshot {
  const autoLearning = sabiAiAutoLearningJobService.getStatus(now)
  const trainingMonitor = sabiAiTrainingProcessMonitorService.getAdminSnapshot(now)
  const secretPacket = sabiAiGoogleAiSecretIntakePacketService.createPacket(now)
  const budgetRuntimeContract = sabiAiGoogleAiBudgetGuardAndRuntimeDryRunContractService.getSnapshot(now)
  const noProviderDryRun = sabiAiServerRuntimeDryRunNoProviderService.runNoProviderDryRun(now)

  return {
    service: "sabi_ai_admin_training_monitor_read_route",
    routePath: "/api/admin/sabi-ai/training-monitor/readiness",
    method: "GET",
    adminOnly: true,
    readOnly: true,
    providerTarget: "google_ai_gemini",
    providerDisplayName: "Google AI / Gemini",
    mountedByThisFile: false,
    providerCallNow: false,
    googleCallNow: false,
    secretReadNow: false,
    secretStoredNow: false,
    dbWriteNow: false,
    paymentPayoutLegalProductionNow: false,
    autoLearning,
    trainingMonitor,
    secretPacket,
    budgetRuntimeContract,
    noProviderDryRun,
    readiness: {
      adminTrainingMonitorReadRouteReadiness: 100,
      serverAutoLearningFoundationReadiness: 60,
      googleAiAdminBackendMigrationReadiness: 85,
      trainingProcessMonitorReadiness: 55,
      googleAiLiveConnectorReadiness: 0,
      fullSabiAiServerLearningReadiness: 82,
    },
    hardLocks: {
      providerCallNow: false,
      googleCallNow: false,
      secretReadNow: false,
      secretStoredNow: false,
      dbWriteNow: false,
      paymentPayoutLegalProductionNow: false,
    },
    ownerNextApprovalRequired: "OWNER_APPROVE_ADMIN_ROUTE_MOUNT_OR_REAL_GOOGLE_AI_SECRET_FLOW",
    checkedAt: now,
  }
}

export function assertSabiAiTrainingMonitorReadSnapshotSafe(
  snapshot = buildSabiAiTrainingMonitorReadSnapshot(),
): true {
  if (
    snapshot.providerCallNow ||
    snapshot.googleCallNow ||
    snapshot.secretReadNow ||
    snapshot.secretStoredNow ||
    snapshot.dbWriteNow ||
    snapshot.paymentPayoutLegalProductionNow ||
    snapshot.hardLocks.providerCallNow ||
    snapshot.hardLocks.googleCallNow ||
    snapshot.hardLocks.secretReadNow ||
    snapshot.hardLocks.secretStoredNow ||
    snapshot.hardLocks.dbWriteNow ||
    snapshot.hardLocks.paymentPayoutLegalProductionNow
  ) {
    throw new Error("Sabi AI training monitor read route must remain read-only and no-provider.")
  }

  return true
}

export function registerSabiAiTrainingMonitorReadRoutes(router: SabiAiTrainingMonitorRouteLike): void {
  router.get("/sabi-ai/training-monitor/readiness", async (_req, res, next) => {
    try {
      const snapshot = buildSabiAiTrainingMonitorReadSnapshot()
      assertSabiAiTrainingMonitorReadSnapshotSafe(snapshot)
      const response = typeof res.status === "function" ? res.status(200) : res
      return response.json(snapshot)
    } catch (error) {
      if (next) return next(error)
      throw error
    }
  })
}
