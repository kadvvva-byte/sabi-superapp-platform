import type {
  AiSafetyAdminMonitorSummary,
  AiSafetyAdminReport,
  AiSafetyCategoryPolicy,
  AiSafetyReportCategory,
  AiSafetyReportStatus,
  AiSafetySeverity,
} from "../../../core/kernel/ai/ai-safety-admin.types"

export type AiSafetyAdminManifestContract = {
  area: "safety_admin"
  status: "ready"
  version: "AI-24"
  title: string
  description: string
  baseRoute: "/api/ai/safety"
  routes: Record<string, string>
  coreRule: {
    aiCanAccuseUser: false
    aiCanDecideUserIsCriminal: false
    aiCanPunishUser: false
    aiCanDetectPolicySignal: true
    aiCanCreateInternalRiskReport: true
    aiCanNotifyAdmin: true
    finalDecisionOwner: "human_admin_or_compliance_team"
    reportMeaning: "possible_policy_violation_signal"
    userMustNotBeWarnedAboutReport: true
  }
  policies: AiSafetyCategoryPolicy[]
  adminPanelMonitoring: {
    required: true
    queues: Array<{
      key: string
      title: string
      categories: AiSafetyReportCategory[]
    }>
    mustShowHolds: true
    mustShowEmergencyEscalations: true
    mustShowLawEnforcementEligible: true
    mustShowFalseSignalResolution: true
  }
}

export type AiSafetyAdminWorkspaceSummaryContract = {
  version: "AI-24"
  status: "ready" | "limited"
  routeBase: "/api/ai/safety"
  adminMonitorRoute: "/api/ai/safety/admin/monitor"
  userSummaryRoute: string
  totalReports: number
  openReports: number
  holdActiveReports: number
  emergencyReports: number
  lawEnforcementEligibleReports: number
  policy: {
    aiCanAccuseUser: false
    aiCanDecideUserIsCriminal: false
    aiCanPunishUser: false
    userMustNotBeWarnedAboutReport: true
    finalDecisionOwner: "human_admin_or_compliance_team"
  }
}

export type AiSafetyAdminMonitorContract = AiSafetyAdminMonitorSummary
export type AiSafetyAdminReportContract = AiSafetyAdminReport

export type AiSafetyAdminReportListContract = {
  reports: AiSafetyAdminReport[]
  filters: {
    userId?: string
    category?: AiSafetyReportCategory
    severity?: AiSafetySeverity
    status?: AiSafetyReportStatus
    limit: number
  }
}
