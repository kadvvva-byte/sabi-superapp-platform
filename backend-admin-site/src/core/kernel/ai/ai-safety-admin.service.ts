import { AiPersistenceService } from "./ai-persistence.service"
import type {
  AiSafetyActionMode,
  AiSafetyAdminMonitorQueue,
  AiSafetyAdminMonitorSummary,
  AiSafetyAdminNoteInput,
  AiSafetyAdminReport,
  AiSafetyCategoryPolicy,
  AiSafetyEvidence,
  AiSafetyEvidenceKind,
  AiSafetyReportCategory,
  AiSafetyReportCreateInput,
  AiSafetyReportFilter,
  AiSafetyReportStatus,
  AiSafetyReportStatusUpdateInput,
  AiSafetySeverity,
  AiSafetyTextSignalInput,
} from "./ai-safety-admin.types"

const ADMIN_MONITOR_USER_ID = "__ai_safety_admin_monitor__"

function nowIso(): string {
  return new Date().toISOString()
}

function createId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeUserId(userId: string): string {
  const normalized = userId.trim()
  if (!normalized) throw new Error("ai_safety_user_id_required")
  return normalized
}

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ")
}

function includesAny(text: string, words: readonly string[]): boolean {
  return words.some((word) => text.includes(word))
}

function clampLimit(limit?: number): number {
  if (!Number.isFinite(limit)) return 100
  return Math.max(1, Math.min(500, Number(limit)))
}

const FINANCIAL_HOLD_ACTIONS: AiSafetyActionMode[] = [
  "create_admin_report",
  "account_hold",
  "funds_hold",
  "transaction_hold",
  "admin_review_required",
  "law_enforcement_review_required",
]

const EMERGENCY_ACTIONS: AiSafetyActionMode[] = [
  "create_admin_report",
  "admin_review_required",
  "emergency_escalation",
  "law_enforcement_review_required",
  "restrict_dangerous_action",
]

const ADMIN_REVIEW_ACTIONS: AiSafetyActionMode[] = [
  "create_admin_report",
  "admin_review_required",
]

export const AI_SAFETY_CATEGORY_POLICIES: AiSafetyCategoryPolicy[] = [
  {
    category: "aml",
    title: "AML / possible money laundering",
    description: "Signals around laundering, layering, suspicious origin of funds, or abnormal cash-out patterns.",
    severity: "high",
    actionModes: FINANCIAL_HOLD_ACTIONS,
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "kyc_evasion",
    title: "KYC bypass",
    description: "Attempts to bypass identity checks, use fake identities, mule accounts, or mismatched payer/account holder routing.",
    severity: "high",
    actionModes: FINANCIAL_HOLD_ACTIONS,
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "sanctions_evasion",
    title: "Sanctions evasion",
    description: "Signals related to sanctions bypass, hidden beneficial owner routing, or prohibited payment routing.",
    severity: "high",
    actionModes: FINANCIAL_HOLD_ACTIONS,
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "suspicious_transfer",
    title: "Suspicious transfer",
    description: "Suspicious wallet, Coin, QR, card, gift monetization, or withdrawal behavior requiring compliance review.",
    severity: "high",
    actionModes: FINANCIAL_HOLD_ACTIONS,
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "fraud_or_scam",
    title: "Fraud or scam",
    description: "Signals around scams, social engineering, fraudulent payments, chargeback abuse, fake merchant activity, or deception.",
    severity: "high",
    actionModes: FINANCIAL_HOLD_ACTIONS,
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "merchant_abuse",
    title: "Merchant abuse",
    description: "Suspicious merchant/payment acceptance behavior requiring admin and compliance review.",
    severity: "high",
    actionModes: ["create_admin_report", "merchant_hold", "funds_hold", "transaction_hold", "admin_review_required", "law_enforcement_review_required"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "bot_financial_abuse",
    title: "Bot financial abuse",
    description: "Suspicious bot-driven commerce, wallet routing, scam automation, or payment abuse.",
    severity: "high",
    actionModes: ["create_admin_report", "bot_hold", "funds_hold", "transaction_hold", "admin_review_required", "law_enforcement_review_required"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "business_account_abuse",
    title: "Business account abuse",
    description: "Suspicious business-account or business-routing behavior requiring review.",
    severity: "high",
    actionModes: ["create_admin_report", "business_account_hold", "funds_hold", "transaction_hold", "admin_review_required", "law_enforcement_review_required"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "coin_abuse",
    title: "Coin abuse",
    description: "Suspicious Coin top-up, conversion, gift income, transfer, or withdrawal bridge behavior.",
    severity: "high",
    actionModes: ["create_admin_report", "coin_hold", "funds_hold", "admin_review_required", "law_enforcement_review_required"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "wallet_abuse",
    title: "Wallet abuse",
    description: "Suspicious personal wallet behavior, abnormal top-up/cash-out, or wallet misuse.",
    severity: "high",
    actionModes: ["create_admin_report", "wallet_hold", "funds_hold", "transaction_hold", "admin_review_required", "law_enforcement_review_required"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "qr_payment_abuse",
    title: "QR payment abuse",
    description: "Suspicious QR payment routing, QR merchant misuse, or unsafe QR collection behavior.",
    severity: "high",
    actionModes: ["create_admin_report", "qr_hold", "funds_hold", "transaction_hold", "admin_review_required", "law_enforcement_review_required"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "gift_monetization_abuse",
    title: "Gift monetization abuse",
    description: "Suspicious paid gift, diamond, Coin, or gift income behavior requiring financial review.",
    severity: "high",
    actionModes: ["create_admin_report", "gift_monetization_hold", "coin_hold", "funds_hold", "admin_review_required", "law_enforcement_review_required"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "terrorism_or_extremism",
    title: "Terrorism or violent extremism",
    description: "Signals related to terrorism, violent extremism, attack planning, financing, recruitment, or operational coordination.",
    severity: "critical",
    actionModes: EMERGENCY_ACTIONS,
    visibility: "do_not_notify_user",
    immediateHoldRequired: false,
    emergencyEscalationRequired: true,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "violent_harm",
    title: "Violent harm",
    description: "Signals around threats, planned violence, serious injury, or immediate harm to others.",
    severity: "critical",
    actionModes: EMERGENCY_ACTIONS,
    visibility: "do_not_notify_user",
    immediateHoldRequired: false,
    emergencyEscalationRequired: true,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "assassination_or_attack",
    title: "Assassination, attack, or attempted murder",
    description: "Signals related to a planned attack, assassination, attempted murder, target, location, timing, or operational steps.",
    severity: "critical",
    actionModes: EMERGENCY_ACTIONS,
    visibility: "do_not_notify_user",
    immediateHoldRequired: false,
    emergencyEscalationRequired: true,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "child_exploitation",
    title: "Child exploitation",
    description: "Signals related to child sexual exploitation, grooming, exploitation coordination, or harmful child safety violations.",
    severity: "critical",
    actionModes: EMERGENCY_ACTIONS,
    visibility: "do_not_notify_user",
    immediateHoldRequired: false,
    emergencyEscalationRequired: true,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "dangerous_instructions",
    title: "Dangerous instructions",
    description: "Signals seeking dangerous operational instructions that can enable serious harm.",
    severity: "critical",
    actionModes: ["create_admin_report", "admin_review_required", "restrict_dangerous_action"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: false,
    emergencyEscalationRequired: true,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "self_harm_imminent",
    title: "Imminent self-harm",
    description: "Signals of imminent self-harm requiring immediate safety escalation and human review.",
    severity: "critical",
    actionModes: ["create_admin_report", "admin_review_required", "emergency_escalation", "restrict_dangerous_action"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: false,
    emergencyEscalationRequired: true,
    lawEnforcementEligible: false,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "narcotics_or_psychotropics",
    title: "Narcotics or psychotropic substances",
    description: "Signals related to production, sale, distribution, trafficking, delivery, concealment, payment routing, or coordination involving narcotics or psychotropic substances.",
    severity: "critical",
    actionModes: ["create_admin_report", "admin_review_required", "law_enforcement_review_required", "emergency_escalation", "restrict_dangerous_action", "funds_hold", "transaction_hold"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: true,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "account_takeover",
    title: "Account takeover",
    description: "Signals around account compromise, credential abuse, or takeover attempts.",
    severity: "high",
    actionModes: ["create_admin_report", "account_hold", "admin_review_required"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: true,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
  {
    category: "abuse_or_extortion",
    title: "Abuse or extortion",
    description: "Signals around extortion, blackmail, coercion, threats, or abuse requiring safety review.",
    severity: "high",
    actionModes: ["create_admin_report", "admin_review_required", "restrict_dangerous_action", "law_enforcement_review_required"],
    visibility: "do_not_notify_user",
    immediateHoldRequired: false,
    emergencyEscalationRequired: false,
    lawEnforcementEligible: true,
    userAccusationAllowed: false,
    humanReviewRequired: true,
    evidenceRequired: true,
  },
]

const POLICY_BY_CATEGORY = new Map(AI_SAFETY_CATEGORY_POLICIES.map((policy) => [policy.category, policy]))

const TEXT_SIGNAL_RULES: Array<{ category: AiSafetyReportCategory; severity?: AiSafetySeverity; words: string[] }> = [
  { category: "aml", words: ["отмыв", "money laundering", "launder", "clean money", "layering", "обнал", "грязные деньги"] },
  { category: "kyc_evasion", words: ["обойти kyc", "bypass kyc", "fake passport", "поддельный паспорт", "дроп", "mule account", "подставной аккаунт"] },
  { category: "sanctions_evasion", words: ["обойти санкц", "sanctions evasion", "sanction bypass", "скрыть бенефициар"] },
  { category: "suspicious_transfer", words: ["разбить перевод", "split transfer", "smurfing", "много маленьких перевод", "вывести срочно", "cash out fast"] },
  { category: "fraud_or_scam", words: ["скам", "scam", "fraud", "обмануть", "фишинг", "phishing", "chargeback fraud", "кардинг", "carding"] },
  { category: "merchant_abuse", words: ["fake merchant", "ложный merchant", "фейковый магазин", "поддельный магазин"] },
  { category: "bot_financial_abuse", words: ["scam bot", "бот для скама", "бот для обмана", "bot fraud"] },
  { category: "business_account_abuse", words: ["business wallet bypass", "обойти бизнес кошелек", "серый бизнес аккаунт"] },
  { category: "coin_abuse", words: ["coin abuse", "накрутить coin", "обнал coin", "coin laundering", "diamond laundering"] },
  { category: "wallet_abuse", words: ["wallet abuse", "кошелек дроп", "дроп кошелек", "wallet mule"] },
  { category: "qr_payment_abuse", words: ["qr scam", "поддельный qr", "fake qr", "qr phishing"] },
  { category: "gift_monetization_abuse", words: ["gift laundering", "diamond abuse", "отмыть через подарок", "обнал подарки"] },
  { category: "terrorism_or_extremism", severity: "critical", words: ["теракт", "terror attack", "terrorism", "бомба", "bomb attack", "jihad attack", "экстремист"] },
  { category: "violent_harm", severity: "critical", words: ["убить", "kill him", "kill her", "напасть", "attack someone", "зарезать", "shoot someone"] },
  { category: "assassination_or_attack", severity: "critical", words: ["покушение", "assassination", "убить президента", "target location", "plan attack", "план атаки"] },
  { category: "child_exploitation", severity: "critical", words: ["child exploitation", "csam", "груминг", "grooming minor", "несовершеннолетн"] },
  { category: "dangerous_instructions", severity: "critical", words: ["как сделать взрыв", "make explosive", "make bomb", "яд", "poison recipe", "оружие инструкция"] },
  { category: "self_harm_imminent", severity: "critical", words: ["покончу с собой", "kill myself", "suicide tonight", "сейчас себя убью"] },
  { category: "narcotics_or_psychotropics", severity: "critical", words: ["наркотик", "наркота", "психотроп", "закладка", "drug trafficking", "sell drugs", "meth", "cocaine", "heroin", "mdma", "lsd", "synthetic drugs", "доставка наркот"] },
  { category: "account_takeover", words: ["угнать аккаунт", "account takeover", "steal account", "session hijack", "украсть аккаунт"] },
  { category: "abuse_or_extortion", words: ["шантаж", "blackmail", "extortion", "вымогательство", "угрожать"] },
]

export class AiSafetyAdminService {
  constructor(private readonly persistenceService?: AiPersistenceService) {}

  getManifest() {
    return {
      area: "safety_admin",
      status: "ready" as const,
      version: "AI-24" as const,
      title: "AI safety, confirmation, and admin monitoring layer",
      description: "Internal violation/risk reporting, safe holds, emergency escalation, and admin panel monitoring contracts. AI reports possible policy violations but never decides guilt or accuses users.",
      baseRoute: "/api/ai/safety",
      routes: {
        manifest: "/api/ai/safety/manifest",
        monitor: "/api/ai/safety/admin/monitor",
        reports: "/api/ai/safety/admin/reports",
        reportDetail: "/api/ai/safety/admin/reports/:reportId",
        userReports: "/api/ai/safety/admin/users/:userId/reports",
        createReport: "/api/ai/safety/report",
        signal: "/api/ai/safety/:userId/signal",
        userSummary: "/api/ai/safety/:userId/summary",
      },
      coreRule: {
        aiCanAccuseUser: false as const,
        aiCanDecideUserIsCriminal: false as const,
        aiCanPunishUser: false as const,
        aiCanDetectPolicySignal: true as const,
        aiCanCreateInternalRiskReport: true as const,
        aiCanNotifyAdmin: true as const,
        finalDecisionOwner: "human_admin_or_compliance_team" as const,
        reportMeaning: "possible_policy_violation_signal" as const,
        userMustNotBeWarnedAboutReport: true as const,
      },
      policies: AI_SAFETY_CATEGORY_POLICIES,
      adminPanelMonitoring: {
        required: true,
        queues: this.getQueueDefinitions().map(({ key, title, categories }) => ({ key, title, categories })),
        mustShowHolds: true,
        mustShowEmergencyEscalations: true,
        mustShowLawEnforcementEligible: true,
        mustShowFalseSignalResolution: true,
      },
    }
  }

  getPolicies(): AiSafetyCategoryPolicy[] {
    return AI_SAFETY_CATEGORY_POLICIES.map((policy) => ({ ...policy, actionModes: [...policy.actionModes] }))
  }

  getPolicy(category: AiSafetyReportCategory): AiSafetyCategoryPolicy {
    const policy = POLICY_BY_CATEGORY.get(category)
    if (!policy) throw new Error("ai_safety_policy_not_found")
    return { ...policy, actionModes: [...policy.actionModes] }
  }

  createReport(input: AiSafetyReportCreateInput): AiSafetyAdminReport {
    const userId = normalizeUserId(input.userId)
    const policy = this.getPolicy(input.category)
    const timestamp = nowIso()
    const report: AiSafetyAdminReport = {
      id: createId("ai_safety_report"),
      userId,
      category: input.category,
      severity: input.severity ?? policy.severity,
      status: policy.emergencyEscalationRequired ? "emergency_escalated" : policy.immediateHoldRequired ? "hold_active" : "new",
      title: input.title?.trim() || policy.title,
      summary: normalizeText(input.summary),
      signals: (input.signals ?? []).filter(Boolean),
      evidence: (input.evidence ?? []).map((item) => this.toEvidence(item.kind, item.summary, item.excerpt, item.source, item.metadata)),
      relatedEntities: input.relatedEntities ?? [],
      actionModes: [...policy.actionModes],
      visibility: policy.visibility,
      userNotificationDisclosureAllowed: false,
      userAccusationAllowed: false,
      aiCanDecideGuilt: false,
      humanReviewRequired: true,
      evidenceRequired: true,
      adminMonitoringRequired: true,
      finalDecisionOwner: "human_admin_or_compliance_team",
      reportMeaning: "possible_policy_violation_signal",
      immediateHoldRequired: policy.immediateHoldRequired,
      emergencyEscalationRequired: policy.emergencyEscalationRequired,
      lawEnforcementEligible: policy.lawEnforcementEligible,
      fundsConfiscationAllowed: false,
      createdBy: input.createdBy ?? "ai_safety_layer",
      createdAt: timestamp,
      updatedAt: timestamp,
      notes: [],
      metadata: input.metadata,
    }

    if (report.evidence.length === 0) {
      report.evidence.push(this.toEvidence("system_signal", "Structured safety report created without raw user-facing accusation.", undefined, "ai_safety_layer", input.metadata))
    }

    this.persistReport(report)
    return report
  }

  reportFromTextSignal(input: AiSafetyTextSignalInput): AiSafetyAdminReport | null {
    const text = normalizeText(input.text)
    if (!text) return null
    const lowered = text.toLowerCase()
    const matched = TEXT_SIGNAL_RULES.find((rule) => includesAny(lowered, rule.words))
    if (!matched) return null
    const excerpt = text.slice(0, 500)
    return this.createReport({
      userId: input.userId,
      category: matched.category,
      severity: matched.severity,
      summary: "AI detected a possible policy violation signal. This is not a guilt decision and requires human/admin review.",
      signals: ["text_signal_match", matched.category],
      evidence: [
        {
          kind: input.evidenceKind ?? "assistant_prompt",
          summary: "Text contained a safety/compliance signal matching an internal AI-24 category.",
          excerpt,
          source: input.source ?? "ai_assistant",
          metadata: input.metadata,
        },
      ],
      relatedEntities: input.relatedEntities,
      metadata: {
        ...input.metadata,
        source: input.source ?? "ai_assistant",
        matcher: "keyword_signal_v1",
      },
    })
  }

  listReports(filter?: AiSafetyReportFilter): AiSafetyAdminReport[] {
    const reports = this.getAdminReports()
    const limit = clampLimit(filter?.limit)
    return reports
      .filter((report) => !filter?.userId || report.userId === filter.userId)
      .filter((report) => !filter?.category || report.category === filter.category)
      .filter((report) => !filter?.severity || report.severity === filter.severity)
      .filter((report) => !filter?.status || report.status === filter.status)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit)
  }

  getReport(reportId: string): AiSafetyAdminReport | null {
    return this.getAdminReports().find((report) => report.id === reportId) ?? null
  }

  listUserReports(userId: string, limit?: number): AiSafetyAdminReport[] {
    return this.getUserReports(normalizeUserId(userId)).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, clampLimit(limit))
  }

  getUserSummary(userId: string) {
    const reports = this.listUserReports(userId, 500)
    return {
      version: "AI-24" as const,
      userId: normalizeUserId(userId),
      status: reports.some((report) => report.status === "emergency_escalated")
        ? "emergency" as const
        : reports.some((report) => report.immediateHoldRequired && ["new", "admin_review", "hold_active"].includes(report.status))
          ? "hold_active" as const
          : reports.some((report) => ["new", "admin_review"].includes(report.status))
            ? "review_required" as const
            : "clear" as const,
      totalReports: reports.length,
      openReports: reports.filter((report) => ["new", "admin_review"].includes(report.status)).length,
      holdActiveReports: reports.filter((report) => report.status === "hold_active" || report.immediateHoldRequired).length,
      emergencyReports: reports.filter((report) => report.emergencyEscalationRequired).length,
      latestReportAt: reports[0]?.createdAt,
      userAccusationAllowed: false as const,
      aiCanDecideGuilt: false as const,
      userNotificationDisclosureAllowed: false as const,
      finalDecisionOwner: "human_admin_or_compliance_team" as const,
    }
  }

  getAdminMonitorSummary(): AiSafetyAdminMonitorSummary {
    const reports = this.getAdminReports()
    const queues = this.getQueueDefinitions().map((queue): AiSafetyAdminMonitorQueue => {
      const queueReports = reports.filter((report) => queue.categories.includes(report.category))
      return {
        key: queue.key,
        title: queue.title,
        categories: queue.categories,
        reportCount: queueReports.length,
        criticalCount: queueReports.filter((report) => report.severity === "critical").length,
        highCount: queueReports.filter((report) => report.severity === "high").length,
        holdCount: queueReports.filter((report) => report.immediateHoldRequired || report.status === "hold_active").length,
        emergencyCount: queueReports.filter((report) => report.emergencyEscalationRequired || report.status === "emergency_escalated").length,
      }
    })

    return {
      version: "AI-24",
      status: "ready",
      totalReports: reports.length,
      openReports: reports.filter((report) => ["new", "admin_review"].includes(report.status)).length,
      holdActiveReports: reports.filter((report) => report.status === "hold_active" || report.immediateHoldRequired).length,
      emergencyReports: reports.filter((report) => report.status === "emergency_escalated" || report.emergencyEscalationRequired).length,
      lawEnforcementEligibleReports: reports.filter((report) => report.lawEnforcementEligible).length,
      falseSignalResolvedReports: reports.filter((report) => report.status === "resolved_false_signal").length,
      queues,
      categories: this.getPolicies().map((policy) => {
        const categoryReports = reports.filter((report) => report.category === policy.category)
        return {
          category: policy.category,
          title: policy.title,
          severity: policy.severity,
          reportCount: categoryReports.length,
          openCount: categoryReports.filter((report) => ["new", "admin_review"].includes(report.status)).length,
          holdCount: categoryReports.filter((report) => report.status === "hold_active" || report.immediateHoldRequired).length,
          emergencyCount: categoryReports.filter((report) => report.status === "emergency_escalated" || report.emergencyEscalationRequired).length,
        }
      }),
      policy: {
        aiCanAccuseUser: false,
        aiCanDecideUserIsCriminal: false,
        aiCanPunishUser: false,
        aiCanCreateInternalRiskReport: true,
        userMustNotBeWarnedAboutReport: true,
        finalDecisionOwner: "human_admin_or_compliance_team",
      },
      generatedAt: nowIso(),
    }
  }

  updateReportStatus(input: AiSafetyReportStatusUpdateInput): AiSafetyAdminReport {
    const report = this.getReport(input.reportId)
    if (!report) throw new Error("ai_safety_report_not_found")
    const next: AiSafetyAdminReport = {
      ...report,
      status: input.status,
      updatedAt: nowIso(),
      notes: input.note?.trim()
        ? [
            ...report.notes,
            {
              id: createId("ai_safety_note"),
              adminUserId: input.adminUserId,
              note: input.note.trim(),
              createdAt: nowIso(),
            },
          ]
        : report.notes,
    }
    this.replaceReport(next)
    return next
  }

  addAdminNote(input: AiSafetyAdminNoteInput): AiSafetyAdminReport {
    const report = this.getReport(input.reportId)
    if (!report) throw new Error("ai_safety_report_not_found")
    const note = input.note.trim()
    if (!note) throw new Error("ai_safety_admin_note_required")
    const next: AiSafetyAdminReport = {
      ...report,
      updatedAt: nowIso(),
      notes: [
        ...report.notes,
        {
          id: createId("ai_safety_note"),
          adminUserId: input.adminUserId,
          note,
          createdAt: nowIso(),
        },
      ],
    }
    this.replaceReport(next)
    return next
  }

  private getQueueDefinitions(): Array<{ key: string; title: string; categories: AiSafetyReportCategory[] }> {
    return [
      {
        key: "financial_compliance",
        title: "Financial compliance / AML / KYC",
        categories: ["aml", "kyc_evasion", "sanctions_evasion", "suspicious_transfer", "wallet_abuse", "coin_abuse", "qr_payment_abuse", "gift_monetization_abuse"],
      },
      {
        key: "merchant_bot_business",
        title: "Merchant, bot, and business-account abuse",
        categories: ["merchant_abuse", "bot_financial_abuse", "business_account_abuse", "fraud_or_scam"],
      },
      {
        key: "critical_physical_safety",
        title: "Critical physical safety",
        categories: ["terrorism_or_extremism", "violent_harm", "assassination_or_attack", "child_exploitation", "dangerous_instructions", "self_harm_imminent"],
      },
      {
        key: "narcotics_psychotropics",
        title: "Narcotics and psychotropic substances",
        categories: ["narcotics_or_psychotropics"],
      },
      {
        key: "account_abuse_extortion",
        title: "Account abuse, takeover, and extortion",
        categories: ["account_takeover", "abuse_or_extortion"],
      },
    ]
  }

  private toEvidence(
    kind: AiSafetyEvidenceKind,
    summary: string,
    excerpt?: string,
    source?: string,
    metadata?: Record<string, unknown>,
  ): AiSafetyEvidence {
    return {
      id: createId("ai_safety_evidence"),
      kind,
      summary: normalizeText(summary),
      excerpt: excerpt ? normalizeText(excerpt).slice(0, 1000) : undefined,
      source,
      metadata,
      createdAt: nowIso(),
    }
  }

  private getAdminReports(): AiSafetyAdminReport[] {
    return this.persistenceService?.getSafetyReports(ADMIN_MONITOR_USER_ID) ?? []
  }

  private getUserReports(userId: string): AiSafetyAdminReport[] {
    return this.persistenceService?.getSafetyReports(userId) ?? []
  }

  private persistReport(report: AiSafetyAdminReport) {
    if (!this.persistenceService) return
    const adminReports = this.getAdminReports()
    this.persistenceService.saveSafetyReports(ADMIN_MONITOR_USER_ID, [report, ...adminReports.filter((item) => item.id !== report.id)])
    const userReports = this.getUserReports(report.userId)
    this.persistenceService.saveSafetyReports(report.userId, [report, ...userReports.filter((item) => item.id !== report.id)])
  }

  private replaceReport(report: AiSafetyAdminReport) {
    if (!this.persistenceService) return
    const adminReports = this.getAdminReports().map((item) => (item.id === report.id ? report : item))
    this.persistenceService.saveSafetyReports(ADMIN_MONITOR_USER_ID, adminReports)
    const userReports = this.getUserReports(report.userId).map((item) => (item.id === report.id ? report : item))
    this.persistenceService.saveSafetyReports(report.userId, userReports)
  }
}
