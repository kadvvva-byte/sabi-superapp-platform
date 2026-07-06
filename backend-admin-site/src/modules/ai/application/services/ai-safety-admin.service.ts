import type { AiFacadeService } from "../../../../core/kernel/ai/ai-facade.service"
import type {
  AiSafetyAdminNoteInput,
  AiSafetyReportCategory,
  AiSafetyReportCreateInput,
  AiSafetyReportFilter,
  AiSafetyReportStatus,
  AiSafetyReportStatusUpdateInput,
  AiSafetySeverity,
  AiSafetyTextSignalInput,
} from "../../../../core/kernel/ai/ai-safety-admin.types"
import type { AiSafetyAdminWorkspaceSummaryContract } from "../../contracts/ai-safety-admin.contracts"

function clampLimit(limit?: number): number {
  if (!Number.isFinite(limit)) return 100
  return Math.max(1, Math.min(500, Number(limit)))
}

export class AiSafetyAdminApplicationService {
  constructor(private readonly aiFacade: AiFacadeService) {}

  getManifest() {
    return this.aiFacade.getSafetyAdminManifest()
  }

  getPolicies() {
    return this.aiFacade.getSafetyPolicies()
  }

  getAdminMonitor() {
    return this.aiFacade.getSafetyAdminMonitor()
  }

  listReports(filter?: AiSafetyReportFilter) {
    const normalized = {
      ...filter,
      limit: clampLimit(filter?.limit),
    }
    return {
      reports: this.aiFacade.listSafetyReports(normalized),
      filters: normalized,
    }
  }

  getReport(reportId: string) {
    const report = this.aiFacade.getSafetyReport(reportId)
    if (!report) throw new Error("ai_safety_report_not_found")
    return report
  }

  listUserReports(userId: string, limit?: number) {
    return this.aiFacade.listUserSafetyReports(userId, clampLimit(limit))
  }

  getUserSummary(userId: string) {
    return this.aiFacade.getSafetyUserSummary(userId)
  }

  createReport(input: AiSafetyReportCreateInput) {
    return this.aiFacade.createSafetyReport(input)
  }

  reportFromTextSignal(input: AiSafetyTextSignalInput) {
    return this.aiFacade.reportSafetyTextSignal(input)
  }

  updateReportStatus(input: AiSafetyReportStatusUpdateInput) {
    return this.aiFacade.updateSafetyReportStatus(input)
  }

  addAdminNote(input: AiSafetyAdminNoteInput) {
    return this.aiFacade.addSafetyAdminNote(input)
  }

  getWorkspaceSummary(userId: string): AiSafetyAdminWorkspaceSummaryContract {
    const monitor = this.getAdminMonitor()
    const encodedUserId = encodeURIComponent(userId)
    return {
      version: "AI-24",
      status: "ready",
      routeBase: "/api/ai/safety",
      adminMonitorRoute: "/api/ai/safety/admin/monitor",
      userSummaryRoute: `/api/ai/safety/${encodedUserId}/summary`,
      totalReports: monitor.totalReports,
      openReports: monitor.openReports,
      holdActiveReports: monitor.holdActiveReports,
      emergencyReports: monitor.emergencyReports,
      lawEnforcementEligibleReports: monitor.lawEnforcementEligibleReports,
      policy: {
        aiCanAccuseUser: false,
        aiCanDecideUserIsCriminal: false,
        aiCanPunishUser: false,
        userMustNotBeWarnedAboutReport: true,
        finalDecisionOwner: "human_admin_or_compliance_team",
      },
    }
  }
}

export type AiSafetyAdminFilterQuery = {
  userId?: string
  category?: AiSafetyReportCategory
  severity?: AiSafetySeverity
  status?: AiSafetyReportStatus
  limit?: number
}
