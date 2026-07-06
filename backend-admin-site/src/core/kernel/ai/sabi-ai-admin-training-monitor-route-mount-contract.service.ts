export type SabiAiAdminTrainingMonitorRouteMountStatus =
  | "contract_prepared"
  | "waiting_for_owner_mount_approval"
  | "blocked"

export type SabiAiAdminTrainingMonitorRouteMountContract = {
  service: "sabi_ai_admin_training_monitor_route_mount_contract"
  status: SabiAiAdminTrainingMonitorRouteMountStatus
  routeSourceFile: "src/modules/ai/infrastructure/routes/sabi-ai-training-monitor-read.routes.ts"
  targetAdminRoutesFile: "src/modules/admin/admin.routes.ts"
  targetAdminSubPath: "/sabi-ai/training-monitor/readiness"
  finalPublicAdminPath: "/api/admin/sabi-ai/training-monitor/readiness"
  method: "GET"
  adminOnly: true
  readOnly: true
  mountedNow: false
  runtimeCalledNow: false
  secretReadNow: false
  secretStoredNow: false
  providerCallNow: false
  googleCallNow: false
  dbReadNow: false
  dbWriteNow: false
  paymentPayoutLegalProductionNow: false
  futureMountRequirements: {
    routeSourceCompilePassed: true
    adminAuthMiddlewareReviewRequired: true
    ownerMountApprovalRequired: true
    noProviderModeRequired: true
    noSecretModeRequired: true
    readOnlyOnly: true
  }
  readiness: {
    adminTrainingMonitorRouteMountContractReadiness: 100
    adminTrainingMonitorReadRouteReadiness: 100
    routeMountLiveReadiness: 0
    fullSabiAiServerLearningReadiness: 84
  }
  checkedAt: string
}

export class SabiAiAdminTrainingMonitorRouteMountContractService {
  readonly serviceName = "sabi_ai_admin_training_monitor_route_mount_contract"

  createContract(now = new Date().toISOString()): SabiAiAdminTrainingMonitorRouteMountContract {
    return {
      service: this.serviceName,
      status: "contract_prepared",
      routeSourceFile: "src/modules/ai/infrastructure/routes/sabi-ai-training-monitor-read.routes.ts",
      targetAdminRoutesFile: "src/modules/admin/admin.routes.ts",
      targetAdminSubPath: "/sabi-ai/training-monitor/readiness",
      finalPublicAdminPath: "/api/admin/sabi-ai/training-monitor/readiness",
      method: "GET",
      adminOnly: true,
      readOnly: true,
      mountedNow: false,
      runtimeCalledNow: false,
      secretReadNow: false,
      secretStoredNow: false,
      providerCallNow: false,
      googleCallNow: false,
      dbReadNow: false,
      dbWriteNow: false,
      paymentPayoutLegalProductionNow: false,
      futureMountRequirements: {
        routeSourceCompilePassed: true,
        adminAuthMiddlewareReviewRequired: true,
        ownerMountApprovalRequired: true,
        noProviderModeRequired: true,
        noSecretModeRequired: true,
        readOnlyOnly: true,
      },
      readiness: {
        adminTrainingMonitorRouteMountContractReadiness: 100,
        adminTrainingMonitorReadRouteReadiness: 100,
        routeMountLiveReadiness: 0,
        fullSabiAiServerLearningReadiness: 84,
      },
      checkedAt: now,
    }
  }

  assertNoLiveEffects(contract = this.createContract()): true {
    if (
      contract.mountedNow ||
      contract.runtimeCalledNow ||
      contract.secretReadNow ||
      contract.secretStoredNow ||
      contract.providerCallNow ||
      contract.googleCallNow ||
      contract.dbReadNow ||
      contract.dbWriteNow ||
      contract.paymentPayoutLegalProductionNow
    ) {
      throw new Error("Admin training monitor route mount contract must not perform live effects.")
    }

    return true
  }
}

export const sabiAiAdminTrainingMonitorRouteMountContractService =
  new SabiAiAdminTrainingMonitorRouteMountContractService()
