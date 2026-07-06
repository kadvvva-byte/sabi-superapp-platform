export type AiSafetyReportCategory =
  | "aml"
  | "kyc_evasion"
  | "sanctions_evasion"
  | "suspicious_transfer"
  | "fraud_or_scam"
  | "merchant_abuse"
  | "bot_financial_abuse"
  | "business_account_abuse"
  | "coin_abuse"
  | "wallet_abuse"
  | "qr_payment_abuse"
  | "gift_monetization_abuse"
  | "terrorism_or_extremism"
  | "violent_harm"
  | "assassination_or_attack"
  | "child_exploitation"
  | "dangerous_instructions"
  | "self_harm_imminent"
  | "narcotics_or_psychotropics"
  | "account_takeover"
  | "abuse_or_extortion"

export type AiSafetySeverity = "low" | "medium" | "high" | "critical"

export type AiSafetyReportStatus =
  | "new"
  | "admin_review"
  | "hold_active"
  | "emergency_escalated"
  | "law_enforcement_review"
  | "resolved_false_signal"
  | "resolved_violation"
  | "closed"

export type AiSafetyActionMode =
  | "create_admin_report"
  | "account_hold"
  | "funds_hold"
  | "transaction_hold"
  | "merchant_hold"
  | "bot_hold"
  | "business_account_hold"
  | "wallet_hold"
  | "coin_hold"
  | "qr_hold"
  | "gift_monetization_hold"
  | "admin_review_required"
  | "law_enforcement_review_required"
  | "emergency_escalation"
  | "restrict_dangerous_action"

export type AiSafetyVisibility = "do_not_notify_user" | "neutral_security_message" | "show_policy_warning"

export type AiSafetyEvidenceKind =
  | "assistant_prompt"
  | "app_action"
  | "wallet_event"
  | "coin_event"
  | "qr_event"
  | "merchant_event"
  | "bot_event"
  | "message_signal"
  | "voice_transcript"
  | "admin_note"
  | "system_signal"

export type AiSafetyRelatedEntity = {
  type:
    | "user"
    | "wallet"
    | "coin_wallet"
    | "transaction"
    | "qr"
    | "merchant"
    | "business_account"
    | "bot"
    | "chat"
    | "message"
    | "call"
    | "device"
    | "ip"
  id: string
  label?: string
}

export type AiSafetyEvidence = {
  id: string
  kind: AiSafetyEvidenceKind
  summary: string
  excerpt?: string
  source?: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export type AiSafetyAdminNote = {
  id: string
  adminUserId: string
  note: string
  createdAt: string
}

export type AiSafetyAdminReport = {
  id: string
  userId: string
  category: AiSafetyReportCategory
  severity: AiSafetySeverity
  status: AiSafetyReportStatus
  title: string
  summary: string
  signals: string[]
  evidence: AiSafetyEvidence[]
  relatedEntities: AiSafetyRelatedEntity[]
  actionModes: AiSafetyActionMode[]
  visibility: AiSafetyVisibility
  userNotificationDisclosureAllowed: false
  userAccusationAllowed: false
  aiCanDecideGuilt: false
  humanReviewRequired: true
  evidenceRequired: true
  adminMonitoringRequired: true
  finalDecisionOwner: "human_admin_or_compliance_team"
  reportMeaning: "possible_policy_violation_signal"
  immediateHoldRequired: boolean
  emergencyEscalationRequired: boolean
  lawEnforcementEligible: boolean
  fundsConfiscationAllowed: false
  createdBy: "ai_safety_layer" | "admin" | "system"
  createdAt: string
  updatedAt: string
  notes: AiSafetyAdminNote[]
  metadata?: Record<string, unknown>
}

export type AiSafetyReportCreateInput = {
  userId: string
  category: AiSafetyReportCategory
  severity?: AiSafetySeverity
  title?: string
  summary: string
  signals?: string[]
  evidence?: Array<{
    kind: AiSafetyEvidenceKind
    summary: string
    excerpt?: string
    source?: string
    metadata?: Record<string, unknown>
  }>
  relatedEntities?: AiSafetyRelatedEntity[]
  metadata?: Record<string, unknown>
  createdBy?: "ai_safety_layer" | "admin" | "system"
}

export type AiSafetyTextSignalInput = {
  userId: string
  text: string
  source?: string
  evidenceKind?: AiSafetyEvidenceKind
  relatedEntities?: AiSafetyRelatedEntity[]
  metadata?: Record<string, unknown>
}

export type AiSafetyReportStatusUpdateInput = {
  reportId: string
  status: AiSafetyReportStatus
  adminUserId: string
  note?: string
}

export type AiSafetyAdminNoteInput = {
  reportId: string
  adminUserId: string
  note: string
}

export type AiSafetyReportFilter = {
  userId?: string
  category?: AiSafetyReportCategory
  severity?: AiSafetySeverity
  status?: AiSafetyReportStatus
  limit?: number
}

export type AiSafetyCategoryPolicy = {
  category: AiSafetyReportCategory
  title: string
  description: string
  severity: AiSafetySeverity
  actionModes: AiSafetyActionMode[]
  visibility: AiSafetyVisibility
  immediateHoldRequired: boolean
  emergencyEscalationRequired: boolean
  lawEnforcementEligible: boolean
  userAccusationAllowed: false
  humanReviewRequired: true
  evidenceRequired: true
}

export type AiSafetyAdminMonitorQueue = {
  key: string
  title: string
  categories: AiSafetyReportCategory[]
  reportCount: number
  criticalCount: number
  highCount: number
  holdCount: number
  emergencyCount: number
}

export type AiSafetyAdminMonitorSummary = {
  version: "AI-24"
  status: "ready" | "limited"
  totalReports: number
  openReports: number
  holdActiveReports: number
  emergencyReports: number
  lawEnforcementEligibleReports: number
  falseSignalResolvedReports: number
  queues: AiSafetyAdminMonitorQueue[]
  categories: Array<{
    category: AiSafetyReportCategory
    title: string
    severity: AiSafetySeverity
    reportCount: number
    openCount: number
    holdCount: number
    emergencyCount: number
  }>
  policy: {
    aiCanAccuseUser: false
    aiCanDecideUserIsCriminal: false
    aiCanPunishUser: false
    aiCanCreateInternalRiskReport: true
    userMustNotBeWarnedAboutReport: true
    finalDecisionOwner: "human_admin_or_compliance_team"
  }
  generatedAt: string
}
