export type AdminPermission =
  | "admin:read"
  | "admin:write"
  | "staff:read"
  | "staff:write"
  | "roles:read"
  | "roles:write"
  | "users:read"
  | "users:write"
  | "users:restrict"
  | "users:delete"
  | "wallet:read"
  | "wallet:write"
  | "finance:read"
  | "finance:export"
  | "settlements:read"
  | "settlements:write"
  | "risk:read"
  | "risk:write"
  | "risk:restrict"
  | "providers:read"
  | "providers:write"
  | "providers:test"
  | "audit:read"
  | "audit:export"
  | "security:read"
  | "security:write"
  | "system:read"
  | "system:write"
  | "messenger:read"
  | "messenger:write"
  | "developer:read"
  | "developer:write"
  | "merchant:read"
  | "merchant:write"
  | "merchant:settle"
  | "business:read"
  | "business:write"
  | "business:settle";

export type AdminRole =
  | "owner"
  | "manager"
  | "developer"
  | "accountant"
  | "security"
  | "merchant_admin"
  | "business_admin"
  | "admin"
  | "risk"
  | "support"
  | "viewer";

export type AdminRoleCategory = "root" | "internal" | "client" | "legacy";
export type AdminPermissionRiskLevel = "low" | "medium" | "high" | "critical";

export type AdminPermissionDefinition = {
  key: AdminPermission;
  group: string;
  riskLevel: AdminPermissionRiskLevel;
};

export type AdminRoleDefinition = {
  key: AdminRole;
  category: AdminRoleCategory;
  level: number;
  permissions: AdminPermission[];
  deniedPermissions: AdminPermission[];
  ownerOnly: boolean;
  clientFacing: boolean;
  canManageRoles: boolean;
  allowedPanels: string[];
  securityRules: string[];
};

export type AdminClientPortalDefinition = {
  key: "merchant_admin" | "business_admin";
  ownerRole: AdminRole;
  panels: string[];
  securityRules: string[];
};

export type AdminRoleMatrix = {
  rootOwnerRole: AdminRole;
  roles: AdminRoleDefinition[];
  permissions: AdminPermissionDefinition[];
  separationRules: string[];
  criticalActionRules: string[];
  clientPortals: AdminClientPortalDefinition[];
};

export type AdminPrincipal = {
  id: string;
  role: AdminRole;
  permissions: AdminPermission[];
  tokenSource: "authorization" | "x-sabi-admin-token" | "staff-session";
  rootOwner: boolean;
  staffId?: string;
  sessionId?: string;
};

export type AdminStaffAccessStatus = "active" | "disabled" | "revoked";
export type AdminStaffSessionStatus = "active" | "revoked" | "expired";

export type AdminStaffClientScope = {
  merchantId?: string;
  businessId?: string;
};

export type AdminStaffAccessUser = {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  role: AdminRole;
  permissions: AdminPermission[];
  status: AdminStaffAccessStatus;
  requireTwoFactor: boolean;
  allowedIpCidrs: string[];
  deviceBinding: "optional" | "required";
  clientScope?: AdminStaffClientScope;
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  revokedBy?: string;
  revokedAt?: string;
  lastLoginAt?: string;
  loginUsername?: string;
  loginEnabled?: boolean;
  passwordHash?: string;
  twoFactorSecret?: string;
  twoFactorReady?: boolean;
  sessionVersion?: number;
};

export type AdminStaffPublicAccessUser = Omit<AdminStaffAccessUser, "passwordHash" | "twoFactorSecret">;

export type AdminStaffSession = {
  id: string;
  staffId: string;
  tokenHash: string;
  status: AdminStaffSessionStatus;
  ip?: string;
  userAgent?: string | string[];
  createdAt: string;
  expiresAt: string;
  lastSeenAt?: string;
  revokedAt?: string;
};

export type AdminStaffSessionVerifyResult = {
  ok: true;
  admin: AdminPrincipal;
  staff: AdminStaffPublicAccessUser;
  expiresAt: string;
};

export type AdminOwnerProtectionState = {
  rootOwnerRole: "owner";
  rootOwnerId: string;
  ownerTokenConfigured: boolean;
  staffCanCreateOwner: false;
  ownerOnlyActions: string[];
  criticalSecurityRules: string[];
};

export type AdminAuditAction =
  | "admin.health"
  | "admin.me"
  | "admin.dashboard.platform"
  | "admin.roles.matrix"
  | "admin.owner.protection"
  | "admin.staff.list"
  | "admin.staff.create"
  | "admin.staff.update"
  | "admin.staff.revoke"
  | "admin.users.list"
  | "admin.users.read"
  | "admin.users.restrict"
  | "admin.users.unrestrict"
  | "admin.risk.list"
  | "admin.risk.create"
  | "admin.audit.list"
  | "admin.audit.security"
  | "admin.audit.integrity"
  | "admin.audit.export"
  | "admin.secrets.security"
  | "admin.secrets.migrate"
  | "admin.providers.status"
  | "admin.providers.catalog"
  | "admin.providers.read"
  | "admin.providers.config.upsert"
  | "admin.providers.config.delete"
  | "admin.providers.secrets.rotate"
  | "admin.providers.secrets.clear"
  | "admin.providers.enable"
  | "admin.providers.disable"
  | "admin.providers.test"
  | "admin.merchant.dashboard"
  | "admin.merchant.list"
  | "admin.merchant.read"
  | "admin.merchant.create"
  | "admin.merchant.update"
  | "admin.merchant.restrict"
  | "admin.merchant.release"
  | "admin.merchant.settlements.list"
  | "admin.merchant.settlements.create"
  | "admin.business.dashboard"
  | "admin.business.list"
  | "admin.business.read"
  | "admin.business.create"
  | "admin.business.update"
  | "admin.business.restrict"
  | "admin.business.release"
  | "admin.business.settlements.list"
  | "admin.business.settlements.create"
  | "admin.risk.dashboard"
  | "admin.risk.console"
  | "admin.risk.signals.list"
  | "admin.risk.signals.create"
  | "admin.risk.signals.acknowledge"
  | "admin.risk.signals.resolve"
  | "admin.finance.dashboard"
  | "admin.finance.reports.list"
  | "admin.finance.reports.create"
  | "admin.finance.export"
  | "admin.messenger.dashboard"
  | "admin.messenger.diagnostics"
  | "admin.messenger.diagnostics.run"
  | "admin.messenger.feature_flags"
  | "admin.messenger.control"
  | "admin.messenger.feature_flags.update"
  | "admin.messenger.launch_blockers.create"
  | "admin.messenger.launch_blockers.resolve"
  | "admin.messenger.directory.dashboard"
  | "admin.messenger.directory.list"
  | "admin.messenger.directory.settings.update"
  | "admin.messenger.directory.restrict"
  | "admin.messenger.directory.release"
  | "admin.messenger.directory_promotion.snapshot"
  | "admin.messenger.directory_promotion.settings.update"
  | "admin.messenger.directory_promotion.sync_directory"
  | "admin.messenger.directory_promotion.entry.status"
  | "admin.messenger.directory_promotion.entry.boost"
  | "admin.messenger.directory_promotion.export"
  | "admin.messenger.moderation.dashboard"
  | "admin.messenger.moderation.reports.list"
  | "admin.messenger.moderation.reports.create"
  | "admin.messenger.moderation.reports.assign"
  | "admin.messenger.moderation.reports.resolve"
  | "admin.messenger.premium.dashboard"
  | "admin.messenger.premium.settings.update"
  | "admin.messenger.safety.dashboard"
  | "admin.messenger.safety.reports.list"
  | "admin.messenger.safety.reports.create"
  | "admin.messenger.safety.reports.assign"
  | "admin.messenger.safety.reports.action"
  | "admin.messenger.safety.authority_reports.list"
  | "admin.messenger.safety.authority_reports.create"
  | "admin.messenger.safety.authority_requests.create"
  | "admin.messenger.safety.authority_requests.status"
  | "admin.messenger.safety.authority_requests.export"
  | "admin.messenger.safety.report_package.export"
  | "admin.messenger.safety.cooperation.export"
  | "admin.messenger.safety.settings.update"
  | "admin.messenger.safety.ai_signals.list"
  | "admin.messenger.safety.ai_signals.ingest"
  | "admin.messenger.safety.ai_signals.convert"
  | "admin.messenger.safety.ai_signals.ignore"
  | "admin.messenger.safety.evidence_vault.list"
  | "admin.messenger.safety.evidence_vault.create"
  | "admin.messenger.safety.evidence_vault.seal"
  | "admin.messenger.safety.evidence_vault.export"
  | "admin.messenger.safety.restrictions.list"
  | "admin.messenger.safety.restrictions.create"
  | "admin.messenger.safety.restrictions.status"
  | "admin.messenger.safety.restrictions.release"
  | "admin.messenger.safety.restrictions.export"
  | "admin.messenger.safety.enforcement.snapshot"
  | "admin.messenger.safety.enforcement.check"
  | "admin.messenger.safety.enforcement.export"
  | "admin.messenger.safety.runtime_bridge.snapshot"
  | "admin.messenger.safety.runtime_bridge.check"
  | "admin.messenger.safety.runtime_bridge.export"
  | "admin.messenger.safety.client_guards.snapshot"
  | "admin.messenger.safety.client_guards.validate"
  | "admin.messenger.safety.client_guards.export"
  | "admin.messenger.safety.guard_events.snapshot"
  | "admin.messenger.safety.guard_events.list"
  | "admin.messenger.safety.guard_events.export"
  | "admin.messenger.safety.integrity_monitor.snapshot"
  | "admin.messenger.safety.integrity_monitor.export"
  | "admin.messenger.safety.escalations.snapshot"
  | "admin.messenger.safety.escalations.status"
  | "admin.messenger.safety.escalations.export"
  | "admin.messenger.safety.compliance_reports.snapshot"
  | "admin.messenger.safety.compliance_reports.build"
  | "admin.messenger.safety.compliance_reports.export"
  | "admin.messenger.safety.retention.snapshot"
  | "admin.messenger.safety.retention.legal_hold.create"
  | "admin.messenger.safety.retention.legal_hold.release"
  | "admin.messenger.safety.retention.export"
  | "admin.messenger.safety.export_verification.snapshot"
  | "admin.messenger.safety.export_verification.verify"
  | "admin.messenger.safety.export_verification.export"
  | "admin.messenger.safety.access_control.snapshot"
  | "admin.messenger.safety.access_control.check"
  | "admin.messenger.safety.access_control.export"
  | "admin.messenger.safety.staff_assignments.snapshot"
  | "admin.messenger.safety.staff_assignments.create"
  | "admin.messenger.safety.staff_assignments.status"
  | "admin.messenger.safety.staff_assignments.export"
  | "admin.messenger.safety.supervisor_dashboard.snapshot"
  | "admin.messenger.safety.supervisor_dashboard.export"
  | "admin.messenger.safety.daily_operations.snapshot"
  | "admin.messenger.safety.daily_operations.export"
  | "admin.messenger.safety.prelaunch_gate.snapshot"
  | "admin.messenger.safety.prelaunch_gate.export"
  | "admin.messenger.safety.launch_command.snapshot"
  | "admin.messenger.safety.launch_command.export"
  | "admin.messenger.safety.post_launch_monitor.snapshot"
  | "admin.messenger.safety.post_launch_monitor.export"
  | "admin.messenger.safety.incidents.snapshot"
  | "admin.messenger.safety.incidents.create"
  | "admin.messenger.safety.incidents.status"
  | "admin.messenger.safety.incidents.export"
  | "admin.messenger.safety.emergency_actions.snapshot"
  | "admin.messenger.safety.emergency_actions.create"
  | "admin.messenger.safety.emergency_actions.status"
  | "admin.messenger.safety.emergency_actions.export"
  | "admin.messenger.safety.recovery_reviews.snapshot"
  | "admin.messenger.safety.recovery_reviews.create"
  | "admin.messenger.safety.recovery_reviews.status"
  | "admin.messenger.safety.recovery_reviews.export"
  | "admin.messenger.safety.policy_feedback.snapshot"
  | "admin.messenger.safety.policy_feedback.create"
  | "admin.messenger.safety.policy_feedback.status"
  | "admin.messenger.safety.policy_feedback.export"
  | "admin.messenger.safety.policy_registry.snapshot"
  | "admin.messenger.safety.policy_registry.create"
  | "admin.messenger.safety.policy_registry.status"
  | "admin.messenger.safety.policy_registry.export"
  | "admin.messenger.safety.policy_deployment.snapshot"
  | "admin.messenger.safety.policy_deployment.sync_active"
  | "admin.messenger.safety.policy_deployment.status"
  | "admin.messenger.safety.policy_deployment.export"
  | "admin.messenger.safety.policy_training.snapshot"
  | "admin.messenger.safety.policy_training.sync_required"
  | "admin.messenger.safety.policy_training.assign"
  | "admin.messenger.safety.policy_training.acknowledge"
  | "admin.messenger.safety.policy_training.complete"
  | "admin.messenger.safety.policy_training.waive"
  | "admin.messenger.safety.policy_training.export"
  | "admin.messenger.growth_promotion_greetings.snapshot"
  | "admin.messenger.growth_promotion_greetings.settings.update"
  | "admin.messenger.growth_promotion_greetings.promotion.upsert"
  | "admin.messenger.growth_promotion_greetings.promotion.status"
  | "admin.messenger.growth_promotion_greetings.template.upsert"
  | "admin.messenger.growth_promotion_greetings.greeting.create"
  | "admin.messenger.growth_promotion_greetings.greeting.status"
  | "admin.messenger.growth_promotion_greetings.holiday.upsert"
  | "admin.messenger.growth_promotion_greetings.automation.run"
  | "admin.messenger.growth_promotion_greetings.export"
  | "admin.messenger.growth_analytics.snapshot"
  | "admin.messenger.growth_analytics.export"
  | "admin.messenger.content_quality.snapshot"
  | "admin.messenger.content_quality.settings.update"
  | "admin.messenger.content_quality.signal.create"
  | "admin.messenger.content_quality.signal.acknowledge"
  | "admin.messenger.content_quality.signal.resolve"
  | "admin.messenger.content_quality.signal.quarantine"
  | "admin.messenger.content_quality.signal.release"
  | "admin.messenger.content_quality.export"
  | "admin.messenger.approval_visibility.snapshot"
  | "admin.messenger.approval_visibility.settings.update"
  | "admin.messenger.approval_visibility.entry.decision"
  | "admin.messenger.approval_visibility.entry.visibility"
  | "admin.messenger.approval_visibility.export"
  | "admin.messenger.presence_operations.snapshot"
  | "admin.messenger.presence_operations.settings.update"
  | "admin.messenger.presence_operations.anomaly.acknowledge"
  | "admin.messenger.presence_operations.anomaly.resolve"
  | "admin.messenger.presence_operations.export"
  | "admin.messenger.notifications_monitor.snapshot"
  | "admin.messenger.notifications_monitor.settings.update"
  | "admin.messenger.notifications_monitor.issue.acknowledge"
  | "admin.messenger.notifications_monitor.issue.resolve"
  | "admin.messenger.notifications_monitor.export"
  | "admin.messenger.final_readiness.snapshot"
  | "admin.messenger.final_readiness.settings.update"
  | "admin.messenger.final_readiness.item.verify"
  | "admin.messenger.final_readiness.item.block"
  | "admin.messenger.final_readiness.item.waive"
  | "admin.messenger.final_readiness.item.reset"
  | "admin.messenger.final_readiness.export"
  | "admin.messenger.max_prelaunch.snapshot"
  | "admin.messenger.max_prelaunch.settings.update"
  | "admin.messenger.max_prelaunch.gate.verify"
  | "admin.messenger.max_prelaunch.gate.block"
  | "admin.messenger.max_prelaunch.gate.waive"
  | "admin.messenger.max_prelaunch.gate.reset"
  | "admin.messenger.max_prelaunch.export"
  | "admin.messenger.runtime_verification.snapshot"
  | "admin.messenger.runtime_verification.settings.update"
  | "admin.messenger.runtime_verification.item.verify"
  | "admin.messenger.runtime_verification.item.block"
  | "admin.messenger.runtime_verification.item.waive"
  | "admin.messenger.runtime_verification.item.reset"
  | "admin.messenger.runtime_verification.session.create"
  | "admin.messenger.runtime_verification.session.status"
  | "admin.messenger.runtime_verification.export"
  | "admin.messenger.fix_control.snapshot"
  | "admin.messenger.fix_control.settings.update"
  | "admin.messenger.fix_control.ticket.create"
  | "admin.messenger.fix_control.ticket.status"
  | "admin.messenger.fix_control.export"
  | "admin.messenger.release_candidate.snapshot"
  | "admin.messenger.release_candidate.settings.update"
  | "admin.messenger.release_candidate.gate.verify"
  | "admin.messenger.release_candidate.gate.block"
  | "admin.messenger.release_candidate.gate.waive"
  | "admin.messenger.release_candidate.gate.reset"
  | "admin.messenger.release_candidate.export"
  | "admin.messenger.ui_text_cleanliness.snapshot"
  | "admin.messenger.ui_text_cleanliness.settings.update"
  | "admin.messenger.ui_text_cleanliness.item.verify"
  | "admin.messenger.ui_text_cleanliness.item.block"
  | "admin.messenger.ui_text_cleanliness.item.waive"
  | "admin.messenger.ui_text_cleanliness.item.reset"
  | "admin.messenger.ui_text_cleanliness.export"
  | "admin.messenger.regression_recheck.snapshot"
  | "admin.messenger.regression_recheck.settings.update"
  | "admin.messenger.regression_recheck.item.verify"
  | "admin.messenger.regression_recheck.item.block"
  | "admin.messenger.regression_recheck.item.waive"
  | "admin.messenger.regression_recheck.item.reset"
  | "admin.messenger.regression_recheck.export"
  | "admin.messenger.owner_handoff.snapshot"
  | "admin.messenger.owner_handoff.settings.update"
  | "admin.messenger.owner_handoff.item.verify"
  | "admin.messenger.owner_handoff.item.block"
  | "admin.messenger.owner_handoff.item.waive"
  | "admin.messenger.owner_handoff.item.reset"
  | "admin.messenger.owner_handoff.export"
  | "admin.messenger.access_text_gate.snapshot"
  | "admin.messenger.access_text_gate.settings.update"
  | "admin.messenger.access_text_gate.item.verify"
  | "admin.messenger.access_text_gate.item.block"
  | "admin.messenger.access_text_gate.item.waive"
  | "admin.messenger.access_text_gate.item.reset"
  | "admin.messenger.access_text_gate.export"
  | "admin.messenger.mobile_transition.snapshot"
  | "admin.messenger.mobile_transition.settings.update"
  | "admin.messenger.mobile_transition.item.verify"
  | "admin.messenger.mobile_transition.item.block"
  | "admin.messenger.mobile_transition.item.waive"
  | "admin.messenger.mobile_transition.item.reset"
  | "admin.messenger.mobile_transition.export"
  | "admin.messenger.safety.case_review.list"
  | "admin.messenger.safety.case_review.open"
  | "admin.messenger.safety.case_review.status"
  | "admin.messenger.safety.case_review.decision"
  | "admin.messenger.safety.case_review.export"
  | "admin.developer.console"
  | "admin.developer.diagnostics.run"
  | "admin.developer.logs"
  | "admin.developer.feature_flags"
  | "admin.owner.security_center"
  | "admin.owner.confirmations.list"
  | "admin.owner.confirmations.create"
  | "admin.owner.confirmations.approve"
  | "admin.owner.confirmations.reject"
  | "admin.owner.confirmations.required"
  | "admin.owner.confirmations.rejected_for_action"
  | "admin.owner.confirmations.used"
  | "admin.emergency.dashboard"
  | "admin.emergency.locks.list"
  | "admin.emergency.locks.create"
  | "admin.emergency.locks.release"
  | "admin.emergency.blocked_action";

export type AdminAuditEntry = {
  id: string;
  sequence?: number;
  prevHash?: string | null;
  hash?: string;
  integrityVersion?: "sha256-v1";
  action: AdminAuditAction | string;
  adminId: string;
  role: AdminRole;
  targetType?: string;
  targetId?: string;
  ip?: string;
  userAgent?: string | string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
};


export type AdminAuditIntegrityReport = {
  ok: boolean;
  algorithm: "sha256";
  integrityVersion: "sha256-v1";
  totalEntries: number;
  protectedEntries: number;
  legacyEntries: number;
  verifiedEntries: number;
  anchorHash: string | null;
  brokenAtId?: string;
  brokenAtSequence?: number;
  reason?: string;
  expectedHash?: string;
  actualHash?: string;
  expectedPrevHash?: string | null;
  actualPrevHash?: string | null;
  generatedAt: string;
};

export type AdminAuditSecurityState = {
  appendOnly: true;
  hashChained: true;
  deleteSupported: false;
  exportSupported: true;
  retentionLimit: number;
  protectedEntries: number;
  legacyEntries: number;
  anchorHash: string | null;
  rules: string[];
};

export type AdminAuditExportBundle = {
  ok: true;
  exportedAt: string;
  exportedBy: string;
  integrity: AdminAuditIntegrityReport;
  entries: AdminAuditEntry[];
};

export type AdminRestrictionState = {
  id: string;
  userId: string;
  reason: string;
  scope: string;
  status: "active" | "released";
  createdBy: string;
  createdAt: string;
  releasedBy?: string;
  releasedAt?: string;
};

export type AdminRiskCase = {
  id: string;
  userId?: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "reviewing" | "resolved" | "rejected";
  title: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
};

export type AdminRiskSignalSource = "ai" | "wallet" | "merchant" | "business" | "messenger" | "qr" | "admin" | "system";
export type AdminRiskSignalSeverity = "low" | "medium" | "high" | "critical";
export type AdminRiskSignalStatus = "new" | "acknowledged" | "under_review" | "restricted" | "resolved" | "rejected";
export type AdminRiskSignalTargetType = "user" | "merchant" | "business" | "wallet" | "provider" | "system";

export type AdminRiskSignal = {
  id: string;
  source: AdminRiskSignalSource;
  category: string;
  severity: AdminRiskSignalSeverity;
  status: AdminRiskSignalStatus;
  targetType?: AdminRiskSignalTargetType;
  targetId?: string;
  title: string;
  description?: string;
  recommendedAction?: string;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  metadata?: Record<string, unknown>;
};

export type AdminRiskDashboard = {
  openCases: number;
  criticalCases: number;
  highCases: number;
  activeRestrictions: number;
  activeUserRestrictions: number;
  restrictedMerchants: number;
  restrictedBusinesses: number;
  newSignals: number;
  signalsUnderReview: number;
  criticalSignals: number;
  generatedAt: string;
};

export type AdminRiskConsoleState = {
  dashboard: AdminRiskDashboard;
  riskCases: AdminRiskCase[];
  riskSignals: AdminRiskSignal[];
  restrictions: AdminRestrictionState[];
  rules: string[];
};



export type AdminMessengerDirectoryKind = "group" | "channel" | "bot";
export type AdminMessengerDirectoryStatus = "active" | "restricted" | "disabled" | "pending_review" | "not_configured" | string;

export type AdminMessengerDirectorySettings = {
  publicByDefault: boolean;
  globalSearchEnabled: boolean;
  profileManagementOnly: boolean;
  groupsEnabled: boolean;
  channelsEnabled: boolean;
  botsEnabled: boolean;
  botsPremiumOnly: boolean;
  businessAccountHidden: boolean;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerDirectoryItem = {
  id: string;
  kind: AdminMessengerDirectoryKind;
  title: string;
  username?: string;
  ownerUserId?: string;
  status: AdminMessengerDirectoryStatus;
  publicVisible: boolean;
  memberCount?: number;
  createdAt?: string;
  updatedAt?: string;
  restrictedBy?: string;
  restrictedAt?: string;
  restrictionReason?: string;
  source: "database" | "admin_control" | "not_configured" | string;
};

export type AdminMessengerDirectoryRestriction = {
  id: string;
  kind: AdminMessengerDirectoryKind;
  targetId: string;
  reason: string;
  status: "active" | "released";
  createdBy: string;
  createdAt: string;
  releasedBy?: string;
  releasedAt?: string;
  releaseReason?: string;
};

export type AdminMessengerDirectoryDashboard = {
  generatedAt: string;
  settings: AdminMessengerDirectorySettings;
  summary: {
    groups: number;
    channels: number;
    bots: number;
    restricted: number;
    databaseConnected: boolean;
    publicDirectoryEnabled: boolean;
  };
  items: AdminMessengerDirectoryItem[];
  restrictions: AdminMessengerDirectoryRestriction[];
  rules: string[];
};

export type AdminMessengerSafetyCategory =
  | "terrorism_or_attack_planning"
  | "assassination_or_serious_violence"
  | "human_trafficking"
  | "narcotics_or_psychotropic_trafficking"
  | "money_laundering_or_aml"
  | "fraud_or_scam"
  | "weapons_or_explosives"
  | "child_exploitation"
  | "kyc_bypass_or_identity_fraud"
  | "other_critical_safety";

export type AdminMessengerSafetyReportStatus =
  | "new"
  | "under_review"
  | "target_restricted"
  | "evidence_preserved"
  | "authority_report_prepared"
  | "authority_notified"
  | "resolved"
  | "rejected";

export type AdminMessengerSafetyReportSource = "ai_signal" | "admin_manual" | "user_report" | "system";

export type AdminMessengerSafetyCaseStatus =
  | "intake"
  | "evidence_review"
  | "restriction_review"
  | "authority_review"
  | "awaiting_owner_decision"
  | "actioned"
  | "closed"
  | "rejected";

export type AdminMessengerSafetyCaseDecision =
  | "preserve_only"
  | "restrict_target"
  | "release_target"
  | "prepare_authority_package"
  | "notify_authority"
  | "resolve_no_action"
  | "resolve_restricted"
  | "reject_report";

export type AdminMessengerEvidenceType =
  | "message_reference"
  | "chat_reference"
  | "user_reference"
  | "target_reference"
  | "ai_signal_hash"
  | "external_hash"
  | "manual_reference"
  | "report_package_hash"
  | "system_reference";

export type AdminMessengerEvidenceVaultItem = {
  id: string;
  reportId?: string;
  aiSignalId?: string;
  source: "ai_signal" | "admin_manual" | "user_report" | "system" | "vault" | string;
  evidenceType: AdminMessengerEvidenceType;
  relatedUserId?: string;
  relatedChatId?: string;
  relatedMessageId?: string;
  targetType?: string;
  targetId?: string;
  contentHash?: string;
  externalHash?: string;
  reference?: string;
  legalBasis?: string;
  legalHold: boolean;
  sealed: boolean;
  sealedBy?: string;
  sealedAt?: string;
  sealNote?: string;
  previousChainHash?: string | null;
  chainHash: string;
  chainVersion: "sha256-vault-v1" | string;
  metadata?: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerEvidenceVaultIntegrity = {
  total: number;
  sealed: number;
  legalHold: number;
  brokenLinks: number;
  anchorHash: string | null;
  chainVersion: string;
};

export type AdminMessengerSafetyCaseReview = {
  id: string;
  title: string;
  status: AdminMessengerSafetyCaseStatus;
  category: AdminMessengerSafetyCategory;
  severity: "high" | "critical";
  priority: "normal" | "urgent" | "critical";
  linkedReportIds: string[];
  linkedAiSignalIds: string[];
  linkedEvidenceIds: string[];
  linkedAuthorityRequestIds: string[];
  targetType?: string;
  targetId?: string;
  relatedUserId?: string;
  relatedChatId?: string;
  relatedMessageId?: string;
  assignedTo?: string;
  checklist: {
    evidencePreserved: boolean;
    vaultLinked: boolean;
    legalBasisChecked: boolean;
    targetIdentified: boolean;
    ownerDecisionRequired: boolean;
    authorityRequestLinked: boolean;
    userNotNotified: boolean;
    rawContentHidden: boolean;
  };
  restriction?: {
    scope: string;
    targetId: string;
    status: "none" | "pending_owner_decision" | "active" | "released";
    reason?: string;
    decidedBy?: string;
    decidedAt?: string;
    releasedBy?: string;
    releasedAt?: string;
    releaseReason?: string;
  };
  decision?: { decision: AdminMessengerSafetyCaseDecision; by: string; at: string; note?: string; legalBasis?: string; authorityRequestId?: string };
  timeline: Array<{ event: string; by: string; at: string; note?: string; metadata?: Record<string, unknown> }>;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  closedBy?: string;
  closedAt?: string;
  closureNote?: string;
};

export type AdminMessengerSafetyReport = {
  id: string;
  source: AdminMessengerSafetyReportSource;
  category: AdminMessengerSafetyCategory;
  severity: "high" | "critical";
  status: AdminMessengerSafetyReportStatus;
  title: string;
  description: string;
  targetType?: "user" | "message" | "chat" | "group" | "channel" | "bot" | "wallet" | "merchant" | "business" | "system" | string;
  targetId?: string;
  relatedUserId?: string;
  relatedChatId?: string;
  relatedMessageId?: string;
  detectedBy?: string;
  legalBasis?: string;
  aiSignalId?: string;
  confidence?: number;
  evidenceHash?: string;
  vaultEvidenceIds?: string[];
  metadata?: Record<string, unknown>;
  evidencePreservation?: { preserved: boolean; preservedBy?: string; preservedAt?: string; note?: string };
  authorityReport?: { prepared: boolean; preparedBy?: string; preparedAt?: string; requestReference?: string; note?: string };
  assignedTo?: string;
  actions: Array<{ action: string; by: string; at: string; note?: string }>;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNote?: string;
};

export type AdminMessengerAiSafetySignalStatus = "received" | "report_created" | "ignored";

export type AdminMessengerAiSafetySignal = {
  id: string;
  externalSignalId?: string;
  source: string;
  category: AdminMessengerSafetyCategory;
  severity: "high" | "critical";
  confidence: number;
  status: AdminMessengerAiSafetySignalStatus;
  summary: string;
  targetType?: string;
  targetId?: string;
  relatedUserId?: string;
  relatedChatId?: string;
  relatedMessageId?: string;
  provider?: string;
  model?: string;
  evidenceHash?: string;
  linkedReportId?: string;
  ignoredBy?: string;
  ignoredAt?: string;
  ignoreReason?: string;
  metadata?: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyRestrictionScope =
  | "user_messaging_lock"
  | "chat_freeze"
  | "message_visibility_hold"
  | "group_restriction"
  | "channel_restriction"
  | "bot_restriction"
  | "evidence_preservation_lock"
  | "target_safety_hold";

export type AdminMessengerSafetyRestrictionStatus =
  | "pending_owner_decision"
  | "active"
  | "released"
  | "rejected"
  | "expired";

export type AdminMessengerSafetyRestriction = {
  id: string;
  scope: AdminMessengerSafetyRestrictionScope;
  status: AdminMessengerSafetyRestrictionStatus;
  category: AdminMessengerSafetyCategory;
  severity: "high" | "critical";
  targetType: string;
  targetId: string;
  relatedUserId?: string;
  relatedChatId?: string;
  relatedMessageId?: string;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedAiSignalIds: string[];
  linkedEvidenceIds: string[];
  reason: string;
  legalBasis: string;
  ownerApprovalRequired: boolean;
  ownerApprovedBy?: string;
  ownerApprovedAt?: string;
  activeFrom?: string;
  expiresAt?: string;
  releasedBy?: string;
  releasedAt?: string;
  releaseReason?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  enforcementRef?: string;
  checklist: {
    targetIdentified: boolean;
    legalBasisProvided: boolean;
    evidenceLinked: boolean;
    reportOrCaseLinked: boolean;
    ownerApproved: boolean;
    auditWritten: boolean;
    userNotNotified: boolean;
    rawContentHidden: boolean;
  };
  timeline: Array<{ event: string; by: string; at: string; note?: string; metadata?: Record<string, unknown> }>;
  metadata?: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetySettings = {
  aiSafetySignalsEnabled: boolean;
  criticalSignalAutoCreateReport: boolean;
  autoRestrictCriticalAfterAdminReview: boolean;
  evidencePreservationEnabled: boolean;
  lawEnforcementCooperationEnabled: boolean;
  rootOwnerApprovalForExternalExport: boolean;
  notifyUserAboutInternalReport: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerAuthorityRequest = {
  id: string;
  authorityName: string;
  requestReference?: string;
  legalBasis: string;
  requestedScope: string;
  status: "received" | "under_review" | "approved" | "rejected" | "completed";
  linkedReportIds?: string[];
  decisionNote?: string;
  completedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyDashboard = {
  generatedAt: string;
  summary: {
    openCriticalReports: number;
    underReviewReports: number;
    targetRestrictedReports: number;
    evidencePreservedReports: number;
    authorityPreparedReports: number;
    authorityRequests: number;
    aiSignalsReceived: number;
    aiSignalsPending: number;
    aiSignalsConverted: number;
    vaultEvidenceItems?: number;
    sealedVaultEvidenceItems?: number;
    legalHoldVaultEvidenceItems?: number;
    openReviewCases?: number;
    ownerPendingReviewCases?: number;
    activeRestrictionCases?: number;
    safetyRestrictions?: number;
    activeSafetyRestrictions?: number;
    pendingSafetyRestrictions?: number;
    releasedSafetyRestrictions?: number;
    expiredSafetyRestrictions?: number;
    supervisorAttentionItems?: number;
    supervisorCriticalItems?: number;
    supervisorBlockedExports?: number;
  };
  categories: Array<{ key: AdminMessengerSafetyCategory; severity: "high" | "critical"; enabled: boolean; description: string }>;
  settings: AdminMessengerSafetySettings;
  recentReports: AdminMessengerSafetyReport[];
  caseReviewCenter?: AdminMessengerSafetyCaseReview[];
  authorityRequests: AdminMessengerAuthorityRequest[];
  aiSignals: AdminMessengerAiSafetySignal[];
  evidenceVault?: AdminMessengerEvidenceVaultItem[];
  restrictionCenter?: AdminMessengerSafetyRestriction[];
  evidenceVaultIntegrity?: AdminMessengerEvidenceVaultIntegrity;
  vaultPolicy?: string[];
  caseReviewPolicy?: string[];
  restrictionPolicy?: string[];
  authorityDeskPolicy?: string[];
  cooperationRules: string[];
};


export type AdminProviderKind =
  | "kyc"
  | "aml"
  | "bank"
  | "card_tokenization"
  | "virtual_card"
  | "wallet"
  | "merchant"
  | "business"
  | "coin"
  | "crypto"
  | "ai"
  | "push"
  | "redis"
  | "storage"
  | "generic";

export type AdminProviderCatalogItem = {
  key: string;
  title: string;
  kind: AdminProviderKind;
  description: string;
  requiredFields: string[];
  secretFields: string[];
  optionalFields: string[];
  recommendedBeforeLaunch: boolean;
};

export type AdminProviderPersistedConfig = {
  key: string;
  enabled: boolean;
  fields: Record<string, string>;
  secretFields: Record<string, string>;
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  lastTest?: AdminProviderTestResult;
};

export type AdminProviderPublicConfig = {
  key: string;
  enabled: boolean;
  fields: Record<string, string>;
  secretFields: Record<string, string>;
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  lastTest?: AdminProviderTestResult;
};

export type AdminProviderTestResult = {
  ok: boolean;
  status: "ready" | "provider_not_configured" | "disabled" | "test_not_supported" | "failed";
  checkedAt: string;
  message?: string;
  missingFields?: string[];
  metadata?: Record<string, unknown>;
};

export type AdminProviderStatus = {
  key: string;
  title: string;
  kind: AdminProviderKind;
  configured: boolean;
  enabled: boolean;
  status: "ready" | "provider_not_configured" | "disabled";
  source: "admin_config" | "env" | "mixed" | "none";
  requiredFields: string[];
  missingFields: string[];
  secretFields: string[];
  optionalFields: string[];
  liveAllowed: boolean;
  recommendedBeforeLaunch: boolean;
  updatedAt?: string;
  lastTest?: AdminProviderTestResult;
};



export type AdminMerchantStatus = "pending_review" | "active" | "restricted" | "suspended" | "closed";
export type AdminMerchantKybStatus = "not_started" | "pending" | "approved" | "rejected";
export type AdminMerchantRiskLevel = "low" | "medium" | "high" | "critical";
export type AdminMerchantSettlementStatus = "pending" | "approved" | "paid" | "held" | "cancelled";

export type AdminMerchantAccount = {
  id: string;
  ownerUserId?: string;
  legalName: string;
  tradeName: string;
  username?: string;
  category?: string;
  country?: string;
  city?: string;
  phone?: string;
  email?: string;
  status: AdminMerchantStatus;
  kybStatus: AdminMerchantKybStatus;
  riskLevel: AdminMerchantRiskLevel;
  settlementStatus: "not_configured" | "ready" | "hold";
  walletRoute: "merchant_wallet" | "business_wallet_pending" | "provider_not_configured";
  allowQrPay: boolean;
  commissionPercent: number;
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  restrictedBy?: string;
  restrictedAt?: string;
  restrictionReason?: string;
};

export type AdminMerchantSettlement = {
  id: string;
  merchantId: string;
  amount: number;
  currency: string;
  status: AdminMerchantSettlementStatus;
  providerRef?: string;
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminMerchantDashboard = {
  total: number;
  active: number;
  restricted: number;
  pendingReview: number;
  kybPending: number;
  settlementsPending: number;
  riskHighOrCritical: number;
  generatedAt: string;
};


export type AdminBusinessStatus = "pending_review" | "active" | "restricted" | "suspended" | "closed";
export type AdminBusinessKybStatus = "not_started" | "pending" | "approved" | "rejected";
export type AdminBusinessRiskLevel = "low" | "medium" | "high" | "critical";
export type AdminBusinessSettlementStatus = "pending" | "approved" | "paid" | "held" | "cancelled";

export type AdminBusinessAccount = {
  id: string;
  ownerUserId?: string;
  legalName: string;
  businessName: string;
  username?: string;
  businessType?: string;
  country?: string;
  city?: string;
  phone?: string;
  email?: string;
  status: AdminBusinessStatus;
  kybStatus: AdminBusinessKybStatus;
  riskLevel: AdminBusinessRiskLevel;
  settlementStatus: "not_configured" | "ready" | "hold";
  walletRoute: "business_wallet" | "provider_not_configured";
  allowBusinessPay: boolean;
  allowInvoices: boolean;
  allowEmployeeAccess: boolean;
  commissionPercent: number;
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  restrictedBy?: string;
  restrictedAt?: string;
  restrictionReason?: string;
};

export type AdminBusinessSettlement = {
  id: string;
  businessId: string;
  amount: number;
  currency: string;
  status: AdminBusinessSettlementStatus;
  providerRef?: string;
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminBusinessDashboard = {
  total: number;
  active: number;
  restricted: number;
  pendingReview: number;
  kybPending: number;
  settlementsPending: number;
  riskHighOrCritical: number;
  generatedAt: string;
};



export type AdminFinanceReportKind = "daily" | "weekly" | "monthly" | "custom";
export type AdminFinanceReportStatus = "draft" | "ready" | "exported" | "locked";

export type AdminFinanceReport = {
  id: string;
  kind: AdminFinanceReportKind;
  title: string;
  status: AdminFinanceReportStatus;
  periodStart: string;
  periodEnd: string;
  currency: string;
  grossAmount: number;
  feeAmount: number;
  netAmount: number;
  merchantSettlementCount: number;
  businessSettlementCount: number;
  paidSettlementCount: number;
  heldSettlementCount: number;
  pendingSettlementCount: number;
  source: "admin_file_store" | "provider_ledger_pending";
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminFinanceDashboard = {
  totalGrossAmount: number;
  totalFeeAmount: number;
  totalNetAmount: number;
  pendingSettlementAmount: number;
  heldSettlementAmount: number;
  paidSettlementAmount: number;
  merchantSettlementCount: number;
  businessSettlementCount: number;
  reportCount: number;
  currencies: string[];
  generatedAt: string;
};

export type AdminFinanceExportBundle = {
  ok: true;
  exportedAt: string;
  exportedBy: string;
  dashboard: AdminFinanceDashboard;
  reports: AdminFinanceReport[];
  merchantSettlements: AdminMerchantSettlement[];
  businessSettlements: AdminBusinessSettlement[];
  rules: string[];
};


export type AdminDeveloperCheckStatus = "pass" | "warn" | "fail" | "not_configured";

export type AdminDeveloperDiagnosticCheck = {
  key: string;
  status: AdminDeveloperCheckStatus;
  severity: "info" | "warning" | "critical";
  message: string;
  metadata?: Record<string, unknown>;
};

export type AdminDeveloperModuleStatus = {
  key: string;
  title: string;
  status: "ok" | "warning" | "blocked" | "not_configured";
  version?: string;
  details?: string;
  safeForDeveloper: true;
};

export type AdminDeveloperProviderBlocker = {
  key: string;
  title: string;
  kind: string;
  status: string;
  missingFields: string[];
  recommendedBeforeLaunch: boolean;
};

export type AdminDeveloperProviderSummary = {
  total: number;
  ready: number;
  disabled: number;
  notConfigured: number;
  launchBlockers: number;
  blockers: AdminDeveloperProviderBlocker[];
};

export type AdminDeveloperRuntimeSnapshot = {
  nodeVersion: string;
  platform: string;
  arch: string;
  pid: number;
  uptimeSeconds: number;
  environment: string;
  memory: { rss: number; heapTotal: number; heapUsed: number; external: number; arrayBuffers?: number; };
};

export type AdminDeveloperFeatureFlag = {
  key: string;
  enabled: boolean;
  source: "env" | "default" | "admin_planned";
  safeToShow: true;
  description: string;
};

export type AdminDeveloperConsoleState = {
  generatedAt: string;
  runtime: AdminDeveloperRuntimeSnapshot;
  modules: AdminDeveloperModuleStatus[];
  providerSummary: AdminDeveloperProviderSummary;
  featureFlags: AdminDeveloperFeatureFlag[];
  diagnostics: AdminDeveloperDiagnosticCheck[];
  recentAudit: AdminAuditEntry[];
  safetyRules: string[];
};

export type AdminState = {
  audit: AdminAuditEntry[];
  restrictions: AdminRestrictionState[];
  riskCases: AdminRiskCase[];
  riskSignals: AdminRiskSignal[];
  staffUsers: AdminStaffAccessUser[];
  staffSessions?: AdminStaffSession[];
  merchants: AdminMerchantAccount[];
  merchantSettlements: AdminMerchantSettlement[];
  businesses: AdminBusinessAccount[];
  businessSettlements: AdminBusinessSettlement[];
  financeReports: AdminFinanceReport[];
  ownerConfirmations: AdminOwnerCriticalConfirmation[];
  emergencyLocks?: AdminEmergencyLock[];
};


export type AdminOwnerCriticalConfirmationStatus = "pending" | "approved" | "rejected" | "expired";
export type AdminOwnerCriticalConfirmationKind =
  | "provider_secret_change"
  | "provider_disable"
  | "provider_enable"
  | "staff_role_change"
  | "staff_revoke"
  | "settlement_release"
  | "wallet_route_change"
  | "security_policy_change"
  | "emergency_lock"
  | "system_maintenance"
  | "custom";

export type AdminOwnerCriticalConfirmation = {
  id: string;
  kind: AdminOwnerCriticalConfirmationKind;
  status: AdminOwnerCriticalConfirmationStatus;
  title: string;
  description?: string;
  requestedBy: string;
  requestedByRole: AdminRole;
  targetType?: string;
  targetId?: string;
  riskLevel: "high" | "critical";
  requiredOwner: true;
  expiresAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  metadata?: Record<string, unknown>;
  usedBy?: string;
  usedAt?: string;
  usedForAction?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminOwnerSecurityCenterState = {
  rootOwnerId: string;
  rootOwnerRole: "owner";
  ownerTokenConfigured: boolean;
  pendingConfirmations: number;
  approvedConfirmations: number;
  rejectedConfirmations: number;
  expiredConfirmations: number;
  criticalQueue: AdminOwnerCriticalConfirmation[];
  recentConfirmations: AdminOwnerCriticalConfirmation[];
  requiredConfirmationKinds: AdminOwnerCriticalConfirmationKind[];
  emergencyControls: {
    providerEmergencyLock: boolean;
    walletRouteEmergencyLock: boolean;
    staffAccessEmergencyLock: boolean;
    settlementEmergencyLock: boolean;
  };
  rules: string[];
  generatedAt: string;
};


export type AdminEmergencyLockScope =
  | "all"
  | "providers"
  | "wallet"
  | "merchant"
  | "business"
  | "settlements"
  | "staff"
  | "qr"
  | "ai"
  | "system";

export type AdminEmergencyLockStatus = "active" | "released";

export type AdminEmergencyLock = {
  id: string;
  scope: AdminEmergencyLockScope;
  status: AdminEmergencyLockStatus;
  title: string;
  reason: string;
  targetType?: string;
  targetId?: string;
  createdBy: string;
  createdAt: string;
  releasedBy?: string;
  releasedAt?: string;
  releaseReason?: string;
  metadata?: Record<string, unknown>;
};

export type AdminEmergencyDashboard = {
  activeLocks: number;
  releasedLocks: number;
  totalLocks: number;
  activeScopes: AdminEmergencyLockScope[];
  systemLocked: boolean;
  providersLocked: boolean;
  walletLocked: boolean;
  settlementsLocked: boolean;
  staffLocked: boolean;
  merchantLocked: boolean;
  businessLocked: boolean;
  qrLocked: boolean;
  aiLocked: boolean;
  locks: AdminEmergencyLock[];
  rules: string[];
  generatedAt: string;
};

export type AdminProviderState = {
  providers: AdminProviderPersistedConfig[];
};


export type AdminSecretSecurityRule = {
  key: string;
  severity: "info" | "warning" | "critical";
  ok: boolean;
};

export type AdminSecretSecurityState = {
  encryptedAtRest: true;
  algorithm: "aes-256-gcm";
  secretKeyConfigured: boolean;
  secretKeySource: "explicit_env" | "derived_admin_token" | "missing";
  secretFingerprint: string | null;
  publicRevealSupported: false;
  liveSafe: boolean;
  totalProviders: number;
  providersWithSecrets: number;
  totalSecretFields: number;
  encryptedSecretFields: number;
  legacyPlainSecretFields: number;
  unreadableSecretFields: number;
  rules: AdminSecretSecurityRule[];
  generatedAt: string;
};

export type AdminSecretMigrationResult = {
  migratedProviders: number;
  migratedSecretFields: number;
  skippedEncryptedSecretFields: number;
  unreadableSecretFields: number;
  generatedAt: string;
};
