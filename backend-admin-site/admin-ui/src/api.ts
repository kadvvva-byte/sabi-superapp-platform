import type {
  AdminAuditEntry,
  AdminAuditIntegrityReport,
  AdminAuditSecurityState,
  AdminHealth,
  AdminPrincipal,
  AdminOwnerProtectionState,
  AdminRestriction,
  AdminRiskCase,
  AdminRiskConsoleState,
  AdminRiskDashboard,
  AdminRiskSignal,
  AdminUser,
  AdminStaffAccessUser,
  ApiError,
  ProviderCatalogItem,
  ProviderDetails,
  ProviderStatus,
  AdminRoleMatrix,
  AdminSecretMigrationResult,
  AdminSecretSecurityState,
  AdminMerchantAccount,
  AdminMerchantDashboard,
  AdminMerchantSettlement,
  AdminBusinessAccount,
  AdminBusinessDashboard,
  AdminBusinessSettlement,
  AdminFinanceDashboard,
  AdminWalletDashboard,
  AdminWalletFiatDashboard,
  AdminWalletQrPayDashboard,
  AdminWalletCoinSecurityVaultDashboard,
  AdminWalletProviderCenter,
  AdminWalletMerchantApiCenter,
  AdminWalletPremiumSubscriptionsDashboard,
  AdminWalletGiftPurchaseDashboard,
  AdminWalletMerchantCredential,
  AdminWalletMerchantCredentialActionResult,
  AdminFinanceReport,
  AdminDeveloperConsoleState,
  AdminDeveloperDiagnosticCheck,
  AdminDeveloperFeatureFlag,
  AdminOwnerSecurityCenterState,
  AdminOwnerCriticalConfirmation,
  AdminEmergencyDashboard,
  AdminEmergencyLock,
  AdminMessengerCenterState,
  AdminMessengerProMonitoringDashboard,
  AdminMessengerGrowthPromotionGreetingSnapshot,
  AdminMessengerGrowthAnalyticsSnapshot,
  AdminMessengerContentQualitySettings,
  AdminMessengerContentQualitySignal,
  AdminMessengerContentQualitySnapshot,
  AdminMessengerApprovalVisibilitySnapshot,
  AdminMessengerApprovalVisibilitySettings,
  AdminMessengerApprovalVisibilityEntry,
  AdminMessengerPresenceOperationsSnapshot,
  AdminMessengerPresenceSettings,
  AdminMessengerNotificationsMonitorSnapshot,
  AdminMessengerNotificationsMonitorSettings,
  AdminMessengerFinalReadinessSnapshot,
  AdminMessengerFinalReadinessSettings,
  AdminMessengerMaxPrelaunchSnapshot,
  AdminMessengerMaxPrelaunchSettings,
  AdminMessengerRuntimeVerificationSnapshot,
  AdminMessengerRuntimeVerificationSettings,
  AdminMessengerFixControlSnapshot,
  AdminMessengerFixControlSettings,
  AdminMessengerReleaseCandidateSnapshot, AdminMessengerUiTextCleanlinessSnapshot, AdminMessengerUiTextCleanlinessSettings, AdminMessengerRegressionSnapshot, AdminMessengerRegressionSettings, AdminMessengerOwnerHandoffSnapshot, AdminMessengerOwnerHandoffSettings, AdminMessengerAccessTextGateSnapshot, AdminMessengerAccessTextGateSettings, AdminMessengerMobileTransitionSnapshot, AdminMessengerMobileTransitionSettings,
  AdminMessengerReleaseCandidateSettings,
  AdminMessengerGrowthPromotionSettings,
  AdminMessengerGrowthPromotionStatus,
  AdminMessengerGreetingStatus,
  AdminMessengerControlState,
  AdminMessengerDiagnosticCheck,
  AdminMessengerFeatureFlag,
  AdminMessengerLaunchBlocker,
  AdminMessengerModerationDashboard,
  AdminMessengerModerationReport,
  AdminMessengerPremiumSettings,
  AdminMessengerDirectoryDashboard,
  AdminMessengerDirectoryPromotionSnapshot,
  AdminMessengerDirectoryPromotionListingStatus,
  AdminMessengerDirectoryPromotionSettings,
  AdminMessengerDirectorySettings,
  AdminMessengerDirectoryItem,
  AdminMessengerDirectoryKind,
  AdminMessengerDirectoryReviewAction,
  AdminMessengerDirectoryReviewActionResult,
  AdminMessengerDirectoryReviewQueueEntry,
  AdminMessengerDirectoryReviewQueueSnapshot,
  AdminMessengerSafetyDashboard,
  AdminMessengerAiSafetySignal,
  AdminMessengerSafetyReport,
  AdminMessengerSafetyReportPackage,
  AdminMessengerSafetySettings,
  AdminMessengerSafetyCaseReview,
  AdminMessengerSafetyRestriction,
  AdminMessengerAuthorityRequest,
  AdminMessengerEvidenceVaultItem,
  AdminMessengerEvidenceVaultIntegrity,
  AdminMessengerSafetyRuntimeBridgeSnapshot,
  AdminMessengerSafetyClientGuardsSnapshot,
  AdminMessengerSafetyRuntimeBridgeCheckResult,
  AdminMessengerSafetyClientGuardValidationResult,
  AdminMessengerSafetyGuardEventSnapshot,
  AdminMessengerSafetyIntegrityMonitorSnapshot,
  AdminMessengerSafetyEscalationSnapshot,
  AdminMessengerSafetyEscalationItem,
  AdminMessengerSafetyComplianceReportSnapshot,
  AdminMessengerSafetyComplianceReportPackage,
  AdminMessengerSafetyRetentionSnapshot,
  AdminMessengerSafetyRetentionPackage,
  AdminMessengerSafetyExportVerificationSnapshot,
  AdminMessengerSafetyExportVerificationPackage,
  AdminMessengerSafetyAccessControlSnapshot,
  AdminMessengerSafetyAccessControlPackage,
  AdminMessengerSafetyStaffAssignment,
  AdminMessengerSafetyStaffAssignmentSnapshot,
  AdminMessengerSafetyStaffAssignmentPackage,
  AdminMessengerSafetySupervisorDashboardSnapshot,
  AdminMessengerSafetySupervisorDashboardPackage,
  AdminMessengerSafetyDailyOperationsSnapshot,
  AdminMessengerSafetyDailyOperationsPackage,
  AdminMessengerSafetyPrelaunchReadinessGateSnapshot,
  AdminMessengerSafetyPrelaunchReadinessGatePackage,
  AdminMessengerSafetyLaunchCommandSnapshot,
  AdminMessengerSafetyLaunchCommandPackage,
  AdminMessengerSafetyPostLaunchMonitorSnapshot,
  AdminMessengerSafetyPostLaunchMonitorPackage,
  AdminMessengerSafetyIncidentResponseSnapshot,
  AdminMessengerSafetyIncidentResponsePackage,
  AdminMessengerSafetyIncidentResponse,
  AdminMessengerSafetyEmergencyActionSnapshot,
  AdminMessengerSafetyEmergencyActionPackage,
  AdminMessengerSafetyEmergencyAction,
  AdminMessengerSafetyRecoveryReviewSnapshot,
  AdminMessengerSafetyRecoveryReviewPackage,
  AdminMessengerSafetyRecoveryReview,
  AdminMessengerSafetyPolicyFeedbackSnapshot,
  AdminMessengerSafetyPolicyFeedbackPackage,
  AdminMessengerSafetyPolicyFeedbackItem,
  AdminMessengerSafetyPolicyRegistrySnapshot,
  AdminMessengerSafetyPolicyRegistryPackage,
  AdminMessengerSafetyPolicyRegistryItem,
  AdminMessengerSafetyPolicyDeploymentSnapshot,
  AdminMessengerSafetyPolicyDeploymentPackage,
  AdminMessengerSafetyPolicyDeploymentItem,
  AdminMessengerSafetyPolicyTrainingSnapshot,
  AdminMessengerSafetyPolicyTrainingPackage,
  AdminMessengerSafetyPolicyTrainingAcknowledgementItem,
  AdminPlatformDashboard,
  AdminMessengerSafetyAccessControlDecision,
  AdminMessengerSafetyLegalHold,
  AdminMessengerSafetyEnforcementSnapshot,
  AdminMessengerSafetyEnforcementCheckResult,
  StreamLiveAdminReadinessApiResponse,
} from "./types";
import type { StreamRealtimeMediaLifecycleAdminReadinessClientResult156C, StreamRealtimeMediaLifecycleAdminReadinessSnapshot156C } from "./types";

export type AdminApiConfig = {
  baseUrl: string;
  token: string;
};

export function normalizeAdminBackendBaseUrl(baseUrl: string): string {
  const fallback = "http://127.0.0.1:4001";
  const trimmed = (baseUrl || fallback).trim();
  if (!trimmed) return fallback;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();
    const isLocalHost = host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host === "::1";
    const looksLikeAdminUiPort = url.port === "4000" || url.port === "5173" || url.port === "4173";

    if (isLocalHost && looksLikeAdminUiPort) {
      url.hostname = host === "0.0.0.0" ? "127.0.0.1" : url.hostname;
      url.port = "4001";
      url.pathname = "";
      url.search = "";
      url.hash = "";
      return url.toString().replace(/\/+$/, "");
    }

    if (isLocalHost && !url.port) {
      url.port = "4001";
    }

    return url.toString().replace(/\/+$/, "");
  } catch {
    return trimmed
      .replace(/localhost:4000/g, "localhost:4001")
      .replace(/127\.0\.0\.1:4000/g, "127.0.0.1:4001")
      .replace(/\/+$/, "");
  }
}

function cleanBaseUrl(baseUrl: string): string {
  return normalizeAdminBackendBaseUrl(baseUrl);
}


function isApiRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readApiString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function readApiNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function normalizeMessengerDirectoryKind(value: unknown): AdminMessengerDirectoryKind | "ALL" {
  const raw = String(value || "ALL").trim().toUpperCase();
  if (raw === "GROUP" || raw === "GROUPS") return "group";
  if (raw === "CHANNEL" || raw === "CHANNELS") return "channel";
  if (raw === "BOT" || raw === "BOTS") return "bot";
  if (raw === "ALL") return "ALL";
  const lower = raw.toLowerCase();
  if (lower === "group" || lower === "channel" || lower === "bot") return lower;
  return raw.toLowerCase();
}

function reviewActionKindForApi(kind: string): "GROUP" | "CHANNEL" | "BOT" | null {
  const normalized = normalizeMessengerDirectoryKind(kind);
  if (normalized === "group") return "GROUP";
  if (normalized === "channel") return "CHANNEL";
  if (normalized === "bot") return "BOT";
  return null;
}

function reviewActionEndpointForKind(kind: string): string | null {
  const apiKind = reviewActionKindForApi(kind);
  if (apiKind === "GROUP") return "/api/v2/messenger/groups";
  if (apiKind === "CHANNEL") return "/api/v2/messenger/channels";
  if (apiKind === "BOT") return "/api/v2/messenger/bots";
  return null;
}

function normalizeMessengerDirectoryReviewQueueEntry(value: unknown): AdminMessengerDirectoryReviewQueueEntry | null {
  if (!isApiRecord(value)) return null;
  const id = readApiString(value.id) ?? readApiString(value.targetId) ?? readApiString(value.roomId) ?? readApiString(value.botId);
  if (!id) return null;
  const kind = normalizeMessengerDirectoryKind(value.kind ?? value.type);
  if (kind === "ALL") return null;
  const title = readApiString(value.title) ?? readApiString(value.name) ?? id;
  return {
    id,
    kind,
    title,
    name: readApiString(value.name) ?? title,
    username: readApiString(value.username),
    ownerUserId: readApiString(value.ownerUserId),
    status: readApiString(value.status) ?? readApiString(value.visibilityStatus) ?? "needs_review",
    reason: readApiString(value.reason) ?? readApiString(value.restrictionReason) ?? readApiString(value.reviewReason) ?? "admin_review",
    visibilityStatus: readApiString(value.visibilityStatus),
    listingStatus: readApiString(value.listingStatus),
    approvalStatus: readApiString(value.approvalStatus),
    promotionPlacement: readApiString(value.promotionPlacement),
    qualityScore: readApiNumber(value.qualityScore, 0),
    safetyScore: readApiNumber(value.safetyScore, 0),
    adminControlled: true,
    rawContentIncluded: false,
    updatedAt: readApiString(value.updatedAt),
  };
}

function normalizeMessengerDirectoryReviewQueue(payload: unknown, fallbackKind: AdminMessengerDirectoryKind | "ALL"): AdminMessengerDirectoryReviewQueueSnapshot {
  const root = isApiRecord(payload) ? payload : {};
  const source = Array.isArray(root.entries) ? root.entries : Array.isArray(root.items) ? root.items : Array.isArray(root.data) ? root.data : [];
  const entries = source.map(normalizeMessengerDirectoryReviewQueueEntry).filter((item): item is AdminMessengerDirectoryReviewQueueEntry => Boolean(item));
  return {
    ok: true,
    updatedAt: readApiString(root.updatedAt),
    adminControlled: true,
    rawContentIncluded: false,
    forAdminReviewOnly: true,
    currentUserId: readApiString(root.currentUserId),
    kind: normalizeMessengerDirectoryKind(root.kind ?? fallbackKind),
    count: typeof root.count === "number" ? root.count : entries.length,
    entries,
  };
}

function normalizeMessengerDirectoryReviewActionResult(
  payload: unknown,
  input: { kind: AdminMessengerDirectoryKind; id: string; action: AdminMessengerDirectoryReviewAction },
): AdminMessengerDirectoryReviewActionResult {
  const root = isApiRecord(payload) ? payload : {};
  return {
    ok: Boolean(root.ok),
    kind: normalizeMessengerDirectoryKind(root.kind ?? input.kind),
    id: readApiString(root.id) ?? input.id,
    action: (readApiString(root.action) ?? input.action) as AdminMessengerDirectoryReviewAction,
    visibleInMobile: root.visibleInMobile === true,
    error: readApiString(root.error),
    adminControlled: true,
    rawContentIncluded: false,
    updatedAt: readApiString(root.updatedAt),
  };
}

async function request<T>(config: AdminApiConfig, path: string, init?: RequestInit): Promise<T> {
  const baseUrl = cleanBaseUrl(config.baseUrl || "http://localhost:4001");
  const controller = new AbortController();
  const timeoutMs = 90000;
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  let response: Response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      signal: init?.signal ?? controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-sabi-admin-token": config.token,
        ...(init?.headers ?? {}),
      },
    });
  } catch (error) {
    const normalized = new Error(error instanceof DOMException && error.name === "AbortError"
      ? `timeout_${timeoutMs}ms · ${path}`
      : `${error instanceof Error ? error.message : String(error)} · ${path}`) as ApiError;
    normalized.status = 0;
    normalized.payload = { path, status: 0, body: { error: normalized.message } };
    throw normalized;
  } finally {
    window.clearTimeout(timeout);
  }

  const text = await response.text();
  let payload: unknown = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text;
  }

  if (!response.ok) {
    const payloadError = typeof payload === "object" && payload && "error" in payload
      ? String((payload as { error: unknown }).error)
      : null;
    const error = new Error(payloadError ? `${payloadError} · ${response.status} · ${path}` : `HTTP ${response.status} · ${path}`) as ApiError;
    error.status = response.status;
    error.payload = { path, status: response.status, body: payload };
    throw error;
  }

  return payload as T;
}

export const adminApi = {
  health(baseUrl: string) {
    return fetch(`${cleanBaseUrl(baseUrl || "http://localhost:4001")}/api/admin/health`).then((res) => res.json()) as Promise<AdminHealth>;
  },

  me(config: AdminApiConfig) {
    return request<{ ok: true; admin: AdminPrincipal }>(config, "/api/admin/me");
  },

  runtimeHealth(config: AdminApiConfig) {
    return request<{ ok: true; health: unknown; locals: unknown }>(config, "/api/admin/runtime/health");
  },


  rolesMatrix(config: AdminApiConfig) {
    return request<{ ok: true; matrix: AdminRoleMatrix }>(config, "/api/admin/roles/matrix");
  },


  ownerProtection(config: AdminApiConfig) {
    return request<{ ok: true; ownerProtection: AdminOwnerProtectionState }>(config, "/api/admin/owner/protection");
  },

  staff(config: AdminApiConfig) {
    return request<{ ok: true; staff: AdminStaffAccessUser[] }>(config, "/api/admin/staff");
  },

  createStaff(config: AdminApiConfig, body: {
    displayName: string;
    email?: string;
    phone?: string;
    role: string;
    notes?: string;
    allowedIpCidrs?: string[];
    deviceBinding?: "optional" | "required";
    clientScope?: { merchantId?: string; businessId?: string };
  }) {
    return request<{ ok: true; staff: AdminStaffAccessUser }>(config, "/api/admin/staff", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  updateStaff(config: AdminApiConfig, id: string, body: Partial<{
    displayName: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    notes: string;
    allowedIpCidrs: string[];
    deviceBinding: "optional" | "required";
    clientScope: { merchantId?: string; businessId?: string };
  }>) {
    return request<{ ok: true; staff: AdminStaffAccessUser }>(config, `/api/admin/staff/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  revokeStaff(config: AdminApiConfig, id: string) {
    return request<{ ok: true; staff: AdminStaffAccessUser }>(config, `/api/admin/staff/${encodeURIComponent(id)}/revoke`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  secretSecurity(config: AdminApiConfig) {
    return request<{ ok: true; security: AdminSecretSecurityState }>(config, "/api/admin/security/secrets");
  },

  migrateSecrets(config: AdminApiConfig) {
    return request<{ ok: true; result: AdminSecretMigrationResult; security: AdminSecretSecurityState }>(config, "/api/admin/security/secrets/migrate", {
      method: "POST",
      body: JSON.stringify({}),
    });
  },


  emergencyDashboard(config: AdminApiConfig) {
    return request<{ ok: true; dashboard: AdminEmergencyDashboard }>(config, "/api/admin/emergency/dashboard");
  },

  emergencyLocks(config: AdminApiConfig) {
    return request<{ ok: true; locks: AdminEmergencyLock[] }>(config, "/api/admin/emergency/locks");
  },

  createEmergencyLock(config: AdminApiConfig, body: { scope: string; title?: string; reason: string; targetType?: string; targetId?: string }) {
    return request<{ ok: true; lock: AdminEmergencyLock; dashboard: AdminEmergencyDashboard }>(config, "/api/admin/emergency/locks", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  releaseEmergencyLock(config: AdminApiConfig, id: string, reason?: string) {
    return request<{ ok: true; lock: AdminEmergencyLock; dashboard: AdminEmergencyDashboard }>(config, `/api/admin/emergency/locks/${encodeURIComponent(id)}/release`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },

  providerStatuses(config: AdminApiConfig) {
    return request<{ ok: true; providers: ProviderStatus[] }>(config, "/api/admin/providers/status");
  },

  providerCatalog(config: AdminApiConfig) {
    return request<{ ok: true; providers: ProviderCatalogItem[] }>(config, "/api/admin/providers/catalog");
  },

  providerDetails(config: AdminApiConfig, key: string) {
    return request<{ ok: true; provider: ProviderDetails }>(config, `/api/admin/providers/${encodeURIComponent(key)}`);
  },

  saveProviderConfig(
    config: AdminApiConfig,
    key: string,
    body: { enabled: boolean; fields: Record<string, string>; secretFields: Record<string, string>; notes?: string; ownerConfirmationId?: string },
  ) {
    return request<{ ok: true; provider: ProviderDetails }>(config, `/api/admin/providers/${encodeURIComponent(key)}/config`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  deleteProviderConfig(config: AdminApiConfig, key: string, ownerConfirmationId?: string) {
    return request<{ ok: true; deleted: boolean }>(config, `/api/admin/providers/${encodeURIComponent(key)}/config`, {
      method: "DELETE",
      body: JSON.stringify({ ownerConfirmationId }),
    });
  },

  enableProvider(config: AdminApiConfig, key: string, ownerConfirmationId?: string) {
    return request<{ ok: true; provider: ProviderDetails }>(config, `/api/admin/providers/${encodeURIComponent(key)}/enable`, {
      method: "POST",
      body: JSON.stringify({ ownerConfirmationId }),
    });
  },

  disableProvider(config: AdminApiConfig, key: string, ownerConfirmationId?: string) {
    return request<{ ok: true; provider: ProviderDetails }>(config, `/api/admin/providers/${encodeURIComponent(key)}/disable`, {
      method: "POST",
      body: JSON.stringify({ ownerConfirmationId }),
    });
  },

  testProvider(config: AdminApiConfig, key: string) {
    return request<{ ok: true; result: unknown; provider: ProviderDetails }>(config, `/api/admin/providers/${encodeURIComponent(key)}/test`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  users(config: AdminApiConfig, q: string) {
    const query = q.trim() ? `?q=${encodeURIComponent(q.trim())}&limit=100` : "?limit=100";
    return request<{ ok: true; users: AdminUser[]; restrictions: AdminRestriction[] }>(config, `/api/admin/users${query}`);
  },

  userDetails(config: AdminApiConfig, id: string) {
    return request<{ ok: true; user: AdminUser; wallets: unknown[]; operations: unknown[]; restrictions: AdminRestriction[] }>(
      config,
      `/api/admin/users/${encodeURIComponent(id)}`,
    );
  },

  restrictUser(config: AdminApiConfig, id: string, body: { reason: string; scope: string }) {
    return request<{ ok: true; restriction: AdminRestriction }>(config, `/api/admin/users/${encodeURIComponent(id)}/restrict`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  unrestrictUser(config: AdminApiConfig, id: string, body: { scope: string }) {
    return request<{ ok: true; restriction: AdminRestriction | null }>(config, `/api/admin/users/${encodeURIComponent(id)}/unrestrict`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  risk(config: AdminApiConfig) {
    return request<{ ok: true; riskCases: AdminRiskCase[] }>(config, "/api/admin/risk?limit=200");
  },

  createRisk(config: AdminApiConfig, body: { title: string; category: string; severity: string; userId?: string; description?: string }) {
    return request<{ ok: true; riskCase: AdminRiskCase }>(config, "/api/admin/risk", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },


  riskDashboard(config: AdminApiConfig) {
    return request<{ ok: true; dashboard: AdminRiskDashboard }>(config, "/api/admin/risk/dashboard");
  },

  riskConsole(config: AdminApiConfig) {
    return request<{ ok: true; console: AdminRiskConsoleState }>(config, "/api/admin/security/risk-console?limit=300");
  },

  riskSignals(config: AdminApiConfig) {
    return request<{ ok: true; signals: AdminRiskSignal[] }>(config, "/api/admin/risk/signals?limit=300");
  },

  createRiskSignal(config: AdminApiConfig, body: {
    source: string;
    category: string;
    severity: string;
    status?: string;
    targetType?: string;
    targetId?: string;
    title: string;
    description?: string;
    recommendedAction?: string;
    assignedTo?: string;
  }) {
    return request<{ ok: true; signal: AdminRiskSignal }>(config, "/api/admin/risk/signals", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  acknowledgeRiskSignal(config: AdminApiConfig, id: string) {
    return request<{ ok: true; signal: AdminRiskSignal }>(config, `/api/admin/risk/signals/${encodeURIComponent(id)}/acknowledge`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  resolveRiskSignal(config: AdminApiConfig, id: string, status = "resolved") {
    return request<{ ok: true; signal: AdminRiskSignal }>(config, `/api/admin/risk/signals/${encodeURIComponent(id)}/resolve`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });
  },

  audit(config: AdminApiConfig) {
    return request<{ ok: true; audit: AdminAuditEntry[] }>(config, "/api/admin/audit?limit=300");
  },

  auditSecurity(config: AdminApiConfig) {
    return request<{ ok: true; security: AdminAuditSecurityState }>(config, "/api/admin/audit/security");
  },

  auditIntegrity(config: AdminApiConfig) {
    return request<{ ok: true; integrity: AdminAuditIntegrityReport }>(config, "/api/admin/audit/integrity");
  },

  auditExport(config: AdminApiConfig) {
    return request<{ ok: true; exportedAt: string; exportedBy: string; integrity: AdminAuditIntegrityReport; entries: AdminAuditEntry[] }>(config, "/api/admin/audit/export?limit=1000");
  },


  walletDashboard(config: AdminApiConfig) {
    return request<{ ok: true; dashboard: AdminWalletDashboard }>(config, "/api/admin/wallet/dashboard");
  },

  walletFiatDashboard(config: AdminApiConfig) {
    return request<{ ok: true; fiatDashboard: AdminWalletFiatDashboard }>(config, "/api/admin/wallet/fiat-dashboard");
  },

  walletCoinSecurityVault(config: AdminApiConfig) {
    return request<{ ok: true; coinVault: AdminWalletCoinSecurityVaultDashboard }>(config, "/api/admin/wallet/coin-security-vault");
  },

  walletQrPayDashboard(config: AdminApiConfig) {
    return request<{ ok: true; qrPayDashboard: AdminWalletQrPayDashboard }>(config, "/api/admin/wallet/qr-pay-dashboard");
  },

  walletPremiumSubscriptions(config: AdminApiConfig) {
    return request<{ ok: true; premiumDashboard: AdminWalletPremiumSubscriptionsDashboard }>(config, "/api/admin/wallet/premium-subscriptions");
  },
  walletGiftPurchases(config: AdminApiConfig) {
    return request<{ ok: true; giftDashboard: AdminWalletGiftPurchaseDashboard }>(config, "/api/admin/wallet/gift-purchases");
  },

  walletProviderCenter(config: AdminApiConfig) {
    return request<{ ok: true; providerCenter: AdminWalletProviderCenter }>(config, "/api/admin/wallet/provider-center");
  },

  walletMerchantApiCenter(config: AdminApiConfig) {
    return request<{ ok: true; merchantApiCenter: AdminWalletMerchantApiCenter }>(config, "/api/admin/wallet/merchant-api-center");
  },

  generateWalletMerchantCredential(config: AdminApiConfig, body: { merchantId: string; kind: "api_key" | "webhook_secret"; mode: "test" | "live"; label?: string; scopes?: string[]; callbackUrl?: string; ipAllowlist?: string[] }) {
    return request<{ ok: true; result: AdminWalletMerchantCredentialActionResult; merchantApiCenter: AdminWalletMerchantApiCenter }>(config, "/api/admin/wallet/merchant-api-center/credentials", { method: "POST", body: JSON.stringify(body) });
  },

  rotateWalletMerchantCredential(config: AdminApiConfig, id: string) {
    return request<{ ok: true; result: AdminWalletMerchantCredentialActionResult; merchantApiCenter: AdminWalletMerchantApiCenter }>(config, `/api/admin/wallet/merchant-api-center/credentials/${encodeURIComponent(id)}/rotate`, { method: "POST", body: JSON.stringify({}) });
  },

  revokeWalletMerchantCredential(config: AdminApiConfig, id: string) {
    return request<{ ok: true; credential: AdminWalletMerchantCredential; merchantApiCenter: AdminWalletMerchantApiCenter }>(config, `/api/admin/wallet/merchant-api-center/credentials/${encodeURIComponent(id)}/revoke`, { method: "POST", body: JSON.stringify({}) });
  },

  financeDashboard(config: AdminApiConfig) {
    return request<{ ok: true; dashboard: AdminFinanceDashboard }>(config, "/api/admin/finance/dashboard");
  },

  financeReports(config: AdminApiConfig) {
    return request<{ ok: true; reports: AdminFinanceReport[] }>(config, "/api/admin/finance/reports");
  },

  createFinanceReport(config: AdminApiConfig, body: { kind: string; title: string; periodStart?: string; periodEnd?: string; currency?: string; notes?: string }) {
    return request<{ ok: true; report: AdminFinanceReport }>(config, "/api/admin/finance/reports", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  financeExport(config: AdminApiConfig) {
    return request<{ ok: true; exportedAt: string; exportedBy: string; dashboard: AdminFinanceDashboard; reports: AdminFinanceReport[]; merchantSettlements: AdminMerchantSettlement[]; businessSettlements: AdminBusinessSettlement[]; rules: string[] }>(config, "/api/admin/finance/export?limit=1000");
  },

  merchantDashboard(config: AdminApiConfig) {
    return request<{ ok: true; dashboard: AdminMerchantDashboard }>(config, "/api/admin/merchant/dashboard");
  },

  merchants(config: AdminApiConfig, q = "") {
    const query = q.trim() ? `?q=${encodeURIComponent(q.trim())}` : "";
    return request<{ ok: true; merchants: AdminMerchantAccount[] }>(config, `/api/admin/merchant/accounts${query}`);
  },

  merchantDetails(config: AdminApiConfig, id: string) {
    return request<{ ok: true; merchant: AdminMerchantAccount; settlements: AdminMerchantSettlement[] }>(config, `/api/admin/merchant/accounts/${encodeURIComponent(id)}`);
  },

  createMerchant(config: AdminApiConfig, body: Partial<AdminMerchantAccount>) {
    return request<{ ok: true; merchant: AdminMerchantAccount }>(config, "/api/admin/merchant/accounts", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  updateMerchant(config: AdminApiConfig, id: string, body: Partial<AdminMerchantAccount>) {
    return request<{ ok: true; merchant: AdminMerchantAccount }>(config, `/api/admin/merchant/accounts/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  restrictMerchant(config: AdminApiConfig, id: string, reason: string) {
    return request<{ ok: true; merchant: AdminMerchantAccount }>(config, `/api/admin/merchant/accounts/${encodeURIComponent(id)}/restrict`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },

  releaseMerchant(config: AdminApiConfig, id: string) {
    return request<{ ok: true; merchant: AdminMerchantAccount }>(config, `/api/admin/merchant/accounts/${encodeURIComponent(id)}/release`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  merchantSettlements(config: AdminApiConfig, merchantId?: string) {
    const query = merchantId ? `?merchantId=${encodeURIComponent(merchantId)}` : "";
    return request<{ ok: true; settlements: AdminMerchantSettlement[] }>(config, `/api/admin/merchant/settlements${query}`);
  },

  createMerchantSettlement(config: AdminApiConfig, body: { merchantId: string; amount: number; currency: string; status?: string; providerRef?: string; notes?: string }) {
    return request<{ ok: true; settlement: AdminMerchantSettlement }>(config, "/api/admin/merchant/settlements", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  businessDashboard(config: AdminApiConfig) {
    return request<{ ok: true; dashboard: AdminBusinessDashboard }>(config, "/api/admin/business/dashboard");
  },

  businesses(config: AdminApiConfig, q = "") {
    const query = q.trim() ? `?q=${encodeURIComponent(q.trim())}` : "";
    return request<{ ok: true; businesses: AdminBusinessAccount[] }>(config, `/api/admin/business/accounts${query}`);
  },

  businessDetails(config: AdminApiConfig, id: string) {
    return request<{ ok: true; business: AdminBusinessAccount; settlements: AdminBusinessSettlement[] }>(config, `/api/admin/business/accounts/${encodeURIComponent(id)}`);
  },

  createBusiness(config: AdminApiConfig, body: Partial<AdminBusinessAccount>) {
    return request<{ ok: true; business: AdminBusinessAccount }>(config, "/api/admin/business/accounts", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  updateBusiness(config: AdminApiConfig, id: string, body: Partial<AdminBusinessAccount>) {
    return request<{ ok: true; business: AdminBusinessAccount }>(config, `/api/admin/business/accounts/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  restrictBusiness(config: AdminApiConfig, id: string, reason: string) {
    return request<{ ok: true; business: AdminBusinessAccount }>(config, `/api/admin/business/accounts/${encodeURIComponent(id)}/restrict`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },

  releaseBusiness(config: AdminApiConfig, id: string) {
    return request<{ ok: true; business: AdminBusinessAccount }>(config, `/api/admin/business/accounts/${encodeURIComponent(id)}/release`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  businessSettlements(config: AdminApiConfig, businessId?: string) {
    const query = businessId ? `?businessId=${encodeURIComponent(businessId)}` : "";
    return request<{ ok: true; settlements: AdminBusinessSettlement[] }>(config, `/api/admin/business/settlements${query}`);
  },

  createBusinessSettlement(config: AdminApiConfig, body: { businessId: string; amount: number; currency: string; status?: string; providerRef?: string; notes?: string }) {
    return request<{ ok: true; settlement: AdminBusinessSettlement }>(config, "/api/admin/business/settlements", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },



  platformDashboard(config: AdminApiConfig) {
    return request<AdminPlatformDashboard>(config, "/api/admin/dashboard/platform");
  },

  ownerSecurityCenter(config: AdminApiConfig) {
    return request<{ ok: true; center: AdminOwnerSecurityCenterState }>(config, "/api/admin/owner/security-center");
  },

  ownerConfirmations(config: AdminApiConfig) {
    return request<{ ok: true; confirmations: AdminOwnerCriticalConfirmation[] }>(config, "/api/admin/owner/confirmations?limit=300");
  },

  createOwnerConfirmation(config: AdminApiConfig, body: { kind: string; title: string; description?: string; targetType?: string; targetId?: string; riskLevel?: string }) {
    return request<{ ok: true; confirmation: AdminOwnerCriticalConfirmation }>(config, "/api/admin/owner/confirmations", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  approveOwnerConfirmation(config: AdminApiConfig, id: string) {
    return request<{ ok: true; confirmation: AdminOwnerCriticalConfirmation }>(config, `/api/admin/owner/confirmations/${encodeURIComponent(id)}/approve`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  rejectOwnerConfirmation(config: AdminApiConfig, id: string, reason: string) {
    return request<{ ok: true; confirmation: AdminOwnerCriticalConfirmation }>(config, `/api/admin/owner/confirmations/${encodeURIComponent(id)}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },


  messengerDashboard(config: AdminApiConfig) {
    return request<{ ok: true; center: AdminMessengerCenterState; proMonitoring?: AdminMessengerProMonitoringDashboard }>(config, "/api/admin/messenger/dashboard");
  },

  async messengerAdmin100Snapshot(config: AdminApiConfig) {
    try {
      return await request<{ ok: true; status: string; sections: Record<string, unknown>; failures: unknown[]; generatedAt: string; elapsedMs?: number; finalGate?: Record<string, unknown> }>(config, "/api/admin/messenger/admin-100/snapshot");
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 404) {
        return request<{ ok: true; status: string; sections: Record<string, unknown>; failures: unknown[]; generatedAt: string; elapsedMs?: number; finalGate?: Record<string, unknown> }>(config, "/api/v2/admin/messenger/admin-100/snapshot");
      }
      throw error;
    }
  },

  messengerAdmin100FinalReadiness(config: AdminApiConfig) {
    return request<{ ok: true; finalGate: Record<string, unknown>; admin100: Record<string, unknown>; center: AdminMessengerCenterState; prelaunchGate: Record<string, unknown>; launchCommand: Record<string, unknown>; directoryReviewQueue: Record<string, unknown>; generatedAt: string }>(config, "/api/admin/messenger/admin-100/final-readiness");
  },

  runMessengerAdmin100LaunchCommand(config: AdminApiConfig) {
    return request<{ ok: true; command: string; launchReady: boolean; status: string; blockers: unknown[]; warnings: unknown[]; summary: Record<string, unknown>; generatedAt: string }>(config, "/api/admin/messenger/admin-100/launch-command/run", {
      method: "POST",
      body: JSON.stringify({}),
    });
  },






  messengerRuntimeVerificationSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerRuntimeVerificationSnapshot>(config, "/api/admin/messenger/runtime-verification/snapshot");
  },

  updateMessengerRuntimeVerificationSettings(config: AdminApiConfig, body: Partial<AdminMessengerRuntimeVerificationSettings>) {
    return request<{ ok: true; settings: AdminMessengerRuntimeVerificationSettings; snapshot: AdminMessengerRuntimeVerificationSnapshot }>(config, "/api/admin/messenger/runtime-verification/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  setMessengerRuntimeVerificationItemStatus(config: AdminApiConfig, key: string, status: "verify" | "block" | "waive" | "reset", note?: string, proofRef?: string) {
    return request<{ ok: true; snapshot: AdminMessengerRuntimeVerificationSnapshot }>(config, `/api/admin/messenger/runtime-verification/items/${encodeURIComponent(key)}/${encodeURIComponent(status)}`, {
      method: "POST",
      body: JSON.stringify({ note, proofRef }),
    });
  },

  createMessengerRuntimeVerificationSession(config: AdminApiConfig, body: { title?: string; deviceAUserId: string; deviceBUserId: string; deviceALabel?: string; deviceBLabel?: string; connectionMode?: string; startedAt?: string; note?: string }) {
    return request<{ ok: true; snapshot: AdminMessengerRuntimeVerificationSnapshot }>(config, "/api/admin/messenger/runtime-verification/sessions", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  setMessengerRuntimeVerificationSessionStatus(config: AdminApiConfig, id: string, status: "draft" | "running" | "passed" | "failed" | "cancelled", note?: string) {
    return request<{ ok: true; snapshot: AdminMessengerRuntimeVerificationSnapshot }>(config, `/api/admin/messenger/runtime-verification/sessions/${encodeURIComponent(id)}/${encodeURIComponent(status)}`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },


  messengerFixControlSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerFixControlSnapshot>(config, "/api/admin/messenger/fix-control/snapshot");
  },

  updateMessengerFixControlSettings(config: AdminApiConfig, body: Partial<AdminMessengerFixControlSettings>) {
    return request<{ ok: true; settings: AdminMessengerFixControlSettings; snapshot: AdminMessengerFixControlSnapshot }>(config, "/api/admin/messenger/fix-control/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  createMessengerFixControlTicket(config: AdminApiConfig, body: { title: string; category: string; severity: string; targetArea?: string; deviceAUserId?: string; deviceBUserId?: string; description?: string; fixNote?: string; proofRef?: string }) {
    return request<{ ok: true; snapshot: AdminMessengerFixControlSnapshot }>(config, "/api/admin/messenger/fix-control/tickets", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  setMessengerFixControlTicketStatus(config: AdminApiConfig, id: string, status: "open" | "in_progress" | "fixed" | "verified" | "blocked" | "waived", note?: string, proofRef?: string) {
    return request<{ ok: true; snapshot: AdminMessengerFixControlSnapshot }>(config, `/api/admin/messenger/fix-control/tickets/${encodeURIComponent(id)}/${encodeURIComponent(status)}`, {
      method: "POST",
      body: JSON.stringify({ note, fixNote: note, proofRef }),
    });
  },

  messengerMaxPrelaunchSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerMaxPrelaunchSnapshot>(config, "/api/admin/messenger/max-prelaunch/snapshot");
  },

  updateMessengerMaxPrelaunchSettings(config: AdminApiConfig, body: Partial<AdminMessengerMaxPrelaunchSettings>) {
    return request<{ ok: true; settings: AdminMessengerMaxPrelaunchSettings; snapshot: AdminMessengerMaxPrelaunchSnapshot }>(config, "/api/admin/messenger/max-prelaunch/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  setMessengerMaxPrelaunchGateStatus(config: AdminApiConfig, key: string, status: "verify" | "block" | "waive" | "reset", note?: string) {
    return request<{ ok: true; snapshot: AdminMessengerMaxPrelaunchSnapshot }>(config, `/api/admin/messenger/max-prelaunch/gates/${encodeURIComponent(key)}/${encodeURIComponent(status)}`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  messengerFinalReadinessSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerFinalReadinessSnapshot>(config, "/api/admin/messenger/final-readiness/snapshot");
  },

  updateMessengerFinalReadinessSettings(config: AdminApiConfig, body: Partial<AdminMessengerFinalReadinessSettings>) {
    return request<{ ok: true; settings: AdminMessengerFinalReadinessSettings; snapshot: AdminMessengerFinalReadinessSnapshot }>(config, "/api/admin/messenger/final-readiness/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  setMessengerFinalReadinessItemStatus(config: AdminApiConfig, key: string, status: "verify" | "block" | "waive" | "reset", note?: string) {
    return request<{ ok: true; snapshot: AdminMessengerFinalReadinessSnapshot }>(config, `/api/admin/messenger/final-readiness/items/${encodeURIComponent(key)}/${encodeURIComponent(status)}`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  messengerNotificationsMonitorSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerNotificationsMonitorSnapshot>(config, "/api/admin/messenger/notifications-monitor/snapshot");
  },

  updateMessengerNotificationsMonitorSettings(config: AdminApiConfig, body: Partial<AdminMessengerNotificationsMonitorSettings>) {
    return request<{ ok: true; settings: AdminMessengerNotificationsMonitorSettings; snapshot: AdminMessengerNotificationsMonitorSnapshot }>(config, "/api/admin/messenger/notifications-monitor/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  setMessengerNotificationsMonitorIssueStatus(config: AdminApiConfig, id: string, status: "acknowledge" | "resolve", note?: string) {
    return request<{ ok: true; snapshot: AdminMessengerNotificationsMonitorSnapshot }>(config, `/api/admin/messenger/notifications-monitor/issues/${encodeURIComponent(id)}/${encodeURIComponent(status)}`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  messengerPresenceOperationsSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerPresenceOperationsSnapshot>(config, "/api/admin/messenger/presence-operations/snapshot");
  },

  updateMessengerPresenceOperationsSettings(config: AdminApiConfig, body: Partial<AdminMessengerPresenceSettings>) {
    return request<{ ok: true; settings: AdminMessengerPresenceSettings; snapshot: AdminMessengerPresenceOperationsSnapshot }>(config, "/api/admin/messenger/presence-operations/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  acknowledgeMessengerPresenceAnomaly(config: AdminApiConfig, id: string, note?: string) {
    return request<{ ok: true; snapshot: AdminMessengerPresenceOperationsSnapshot }>(config, `/api/admin/messenger/presence-operations/anomalies/${encodeURIComponent(id)}/acknowledge`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  resolveMessengerPresenceAnomaly(config: AdminApiConfig, id: string, note?: string) {
    return request<{ ok: true; snapshot: AdminMessengerPresenceOperationsSnapshot }>(config, `/api/admin/messenger/presence-operations/anomalies/${encodeURIComponent(id)}/resolve`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  messengerGrowthAnalyticsSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerGrowthAnalyticsSnapshot>(config, "/api/admin/messenger/growth-analytics/snapshot");
  },

  messengerContentQualitySnapshot(config: AdminApiConfig) {
    return request<AdminMessengerContentQualitySnapshot>(config, "/api/admin/messenger/content-quality/snapshot");
  },

  updateMessengerContentQualitySettings(config: AdminApiConfig, body: Partial<AdminMessengerContentQualitySettings>) {
    return request<{ ok: true; settings: AdminMessengerContentQualitySettings; snapshot: AdminMessengerContentQualitySnapshot }>(config, "/api/admin/messenger/content-quality/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  createMessengerContentQualitySignal(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; signal: AdminMessengerContentQualitySignal; snapshot: AdminMessengerContentQualitySnapshot }>(config, "/api/admin/messenger/content-quality/signals", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  setMessengerContentQualitySignalStatus(config: AdminApiConfig, id: string, status: string, note?: string) {
    return request<{ ok: true; signal: AdminMessengerContentQualitySignal; snapshot: AdminMessengerContentQualitySnapshot }>(config, `/api/admin/messenger/content-quality/signals/${encodeURIComponent(id)}/${encodeURIComponent(status)}`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },



  messengerApprovalVisibilitySnapshot(config: AdminApiConfig) {
    return request<AdminMessengerApprovalVisibilitySnapshot>(config, "/api/admin/messenger/approval-visibility/snapshot");
  },

  updateMessengerApprovalVisibilitySettings(config: AdminApiConfig, body: Partial<AdminMessengerApprovalVisibilitySettings>) {
    return request<{ ok: true; settings: AdminMessengerApprovalVisibilitySettings; snapshot: AdminMessengerApprovalVisibilitySnapshot }>(config, "/api/admin/messenger/approval-visibility/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  decideMessengerApprovalVisibilityEntry(config: AdminApiConfig, id: string, decision: string, body: Record<string, unknown> = {}) {
    return request<{ ok: true; entry: AdminMessengerApprovalVisibilityEntry; snapshot: AdminMessengerApprovalVisibilitySnapshot }>(config, `/api/admin/messenger/approval-visibility/entries/${encodeURIComponent(id)}/decision`, {
      method: "POST",
      body: JSON.stringify({ ...body, decision }),
    });
  },

  setMessengerApprovalVisibilityEntryVisibility(config: AdminApiConfig, id: string, visibility: "public" | "hidden" | "restricted", note?: string) {
    return request<{ ok: true; entry: AdminMessengerApprovalVisibilityEntry; snapshot: AdminMessengerApprovalVisibilitySnapshot }>(config, `/api/admin/messenger/approval-visibility/entries/${encodeURIComponent(id)}/visibility`, {
      method: "POST",
      body: JSON.stringify({ visibility, note }),
    });
  },

  messengerGrowthPromotionGreetingsSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerGrowthPromotionGreetingSnapshot>(config, "/api/admin/messenger/growth-promotion-greetings/snapshot");
  },

  updateMessengerGrowthPromotionSettings(config: AdminApiConfig, body: Partial<AdminMessengerGrowthPromotionSettings>) {
    return request<{ ok: true; settings: AdminMessengerGrowthPromotionSettings; snapshot: AdminMessengerGrowthPromotionGreetingSnapshot }>(config, "/api/admin/messenger/growth-promotion-greetings/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  upsertMessengerPromotionCampaign(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; campaign: unknown; snapshot: AdminMessengerGrowthPromotionGreetingSnapshot }>(config, "/api/admin/messenger/growth-promotion-greetings/promotions", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  updateMessengerPromotionCampaignStatus(config: AdminApiConfig, id: string, status: AdminMessengerGrowthPromotionStatus, note?: string) {
    return request<{ ok: true; campaign: unknown; snapshot: AdminMessengerGrowthPromotionGreetingSnapshot }>(config, `/api/admin/messenger/growth-promotion-greetings/promotions/${encodeURIComponent(id)}/status`, {
      method: "POST",
      body: JSON.stringify({ status, note }),
    });
  },

  upsertMessengerGreetingTemplate(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; template: unknown; snapshot: AdminMessengerGrowthPromotionGreetingSnapshot }>(config, "/api/admin/messenger/growth-promotion-greetings/greeting-templates", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  createMessengerGreetingTask(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; task: unknown; snapshot: AdminMessengerGrowthPromotionGreetingSnapshot }>(config, "/api/admin/messenger/growth-promotion-greetings/greeting-tasks", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  updateMessengerGreetingTaskStatus(config: AdminApiConfig, id: string, status: AdminMessengerGreetingStatus, note?: string) {
    return request<{ ok: true; task: unknown; snapshot: AdminMessengerGrowthPromotionGreetingSnapshot }>(config, `/api/admin/messenger/growth-promotion-greetings/greeting-tasks/${encodeURIComponent(id)}/status`, {
      method: "POST",
      body: JSON.stringify({ status, note }),
    });
  },

  upsertMessengerGreetingHoliday(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; holiday: unknown; snapshot: AdminMessengerGrowthPromotionGreetingSnapshot }>(config, "/api/admin/messenger/growth-promotion-greetings/holidays", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  runMessengerGreetingAutomation(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; run: unknown; snapshot: AdminMessengerGrowthPromotionGreetingSnapshot }>(config, "/api/admin/messenger/growth-promotion-greetings/automation/run", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  messengerDiagnostics(config: AdminApiConfig) {
    return request<{ ok: true; diagnostics: AdminMessengerDiagnosticCheck[]; generatedAt: string }>(config, "/api/admin/messenger/diagnostics");
  },

  runMessengerDiagnostics(config: AdminApiConfig) {
    return request<{ ok: true; diagnostics: AdminMessengerDiagnosticCheck[]; generatedAt: string }>(config, "/api/admin/messenger/diagnostics/run", {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  messengerFeatureFlags(config: AdminApiConfig) {
    return request<{ ok: true; featureFlags: AdminMessengerFeatureFlag[] }>(config, "/api/admin/messenger/feature-flags");
  },

  messengerControl(config: AdminApiConfig) {
    return request<{ ok: true; control: AdminMessengerControlState; center: AdminMessengerCenterState }>(config, "/api/admin/messenger/control");
  },

  setMessengerFeatureFlag(config: AdminApiConfig, key: string, body: { enabled: boolean; note?: string }) {
    return request<{ ok: true; control: AdminMessengerControlState; featureFlags: AdminMessengerFeatureFlag[]; center: AdminMessengerCenterState }>(config, `/api/admin/messenger/feature-flags/${encodeURIComponent(key)}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  messengerDirectoryDashboard(config: AdminApiConfig, kind?: string) {
    const query = kind ? `?kind=${encodeURIComponent(kind)}` : "";
    return request<{ ok: true; dashboard: AdminMessengerDirectoryDashboard }>(config, `/api/admin/messenger/directory/dashboard${query}`);
  },

  messengerDirectoryItems(config: AdminApiConfig, kind?: string) {
    const query = kind ? `?kind=${encodeURIComponent(kind)}` : "";
    return request<{ ok: true; items: AdminMessengerDirectoryItem[]; dashboard: AdminMessengerDirectoryDashboard }>(config, `/api/admin/messenger/directory/items${query}`);
  },

  async messengerDirectoryReviewQueue(config: AdminApiConfig, input: { kind?: AdminMessengerDirectoryKind | "ALL"; status?: string; limit?: number } = {}) {
    const kind = normalizeMessengerDirectoryKind(input.kind || "ALL");
    const search = new URLSearchParams();
    search.set("adminControlled", "1");
    search.set("forAdminReviewOnly", "1");
    if (kind !== "ALL") search.set("kind", String(kind).toUpperCase());
    if (input.status && input.status !== "all") search.set("status", input.status);
    if (input.limit && input.limit > 0) search.set("limit", String(Math.floor(input.limit)));
    const payload = await request<Record<string, unknown>>(config, `/api/admin/messenger/directory/review-queue?${search.toString()}`);
    return normalizeMessengerDirectoryReviewQueue(payload, kind);
  },

  async applyMessengerDirectoryReviewAction(config: AdminApiConfig, input: { kind: AdminMessengerDirectoryKind; id: string; action: AdminMessengerDirectoryReviewAction; reason?: string }) {
    const id = input.id.trim();
    const apiKindRaw = reviewActionKindForApi(input.kind);
    if (!id || !apiKindRaw) {
      return {
        ok: false,
        kind: input.kind,
        id,
        action: input.action,
        visibleInMobile: false,
        error: !id ? "directory_target_id_required" : "directory_kind_required",
        adminControlled: true,
        rawContentIncluded: false,
        updatedAt: null,
      } as AdminMessengerDirectoryReviewActionResult;
    }
    const apiKind = apiKindRaw.toLowerCase();
    const payload = await request<Record<string, unknown>>(config, `/api/admin/messenger/directory/${encodeURIComponent(apiKind)}/${encodeURIComponent(id)}/review-action`, {
      method: "POST",
      body: JSON.stringify({
        id,
        targetId: id,
        kind: input.kind,
        type: input.kind,
        action: input.action,
        reason: input.reason || undefined,
        adminControlled: true,
        rawContentIncluded: false,
      }),
    });
    return normalizeMessengerDirectoryReviewActionResult(payload, input);
  },

  messengerDirectoryPromotionSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerDirectoryPromotionSnapshot>(config, "/api/admin/messenger/directory-promotion/snapshot");
  },

  updateMessengerDirectoryPromotionSettings(config: AdminApiConfig, body: Partial<AdminMessengerDirectoryPromotionSettings>) {
    return request<{ ok: true; settings: AdminMessengerDirectoryPromotionSettings; snapshot: AdminMessengerDirectoryPromotionSnapshot }>(config, "/api/admin/messenger/directory-promotion/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  syncMessengerDirectoryPromotion(config: AdminApiConfig) {
    return request<{ ok: true; snapshot: AdminMessengerDirectoryPromotionSnapshot; synced: { before: number; after: number; directoryItems: number } }>(config, "/api/admin/messenger/directory-promotion/sync-directory", {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  updateMessengerDirectoryPromotionEntryStatus(config: AdminApiConfig, id: string, status: AdminMessengerDirectoryPromotionListingStatus, note?: string) {
    return request<{ ok: true; entry: unknown; snapshot: AdminMessengerDirectoryPromotionSnapshot }>(config, `/api/admin/messenger/directory-promotion/entries/${encodeURIComponent(id)}/status`, {
      method: "POST",
      body: JSON.stringify({ status, note }),
    });
  },

  boostMessengerDirectoryPromotionEntry(config: AdminApiConfig, id: string, body: { featuredRank?: number; searchBoostPct?: number; directoryBoostPct?: number; recommended?: boolean; note?: string }) {
    return request<{ ok: true; entry: unknown; snapshot: AdminMessengerDirectoryPromotionSnapshot }>(config, `/api/admin/messenger/directory-promotion/entries/${encodeURIComponent(id)}/boost`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  updateMessengerDirectorySettings(config: AdminApiConfig, body: Partial<AdminMessengerDirectorySettings>) {
    return request<{ ok: true; control: { settings: AdminMessengerDirectorySettings } }>(config, "/api/admin/messenger/directory/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  restrictMessengerDirectoryItem(config: AdminApiConfig, kind: string, id: string, reason: string) {
    return request<{ ok: true }>(config, `/api/admin/messenger/directory/${encodeURIComponent(kind)}/${encodeURIComponent(id)}/restrict`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },

  releaseMessengerDirectoryItem(config: AdminApiConfig, kind: string, id: string, reason?: string) {
    return request<{ ok: true }>(config, `/api/admin/messenger/directory/${encodeURIComponent(kind)}/${encodeURIComponent(id)}/release`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },

  createMessengerLaunchBlocker(config: AdminApiConfig, body: { key?: string; title: string; message: string; severity: "warning" | "critical" }) {
    return request<{ ok: true; blocker: AdminMessengerLaunchBlocker; control: AdminMessengerControlState; center: AdminMessengerCenterState }>(config, "/api/admin/messenger/launch-blockers", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  resolveMessengerLaunchBlocker(config: AdminApiConfig, id: string, body: { resolutionNote?: string }) {
    return request<{ ok: true; blocker: AdminMessengerLaunchBlocker; control: AdminMessengerControlState; center: AdminMessengerCenterState }>(config, `/api/admin/messenger/launch-blockers/${encodeURIComponent(id)}/resolve`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },


  messengerModerationDashboard(config: AdminApiConfig) {
    return request<{ ok: true; dashboard: AdminMessengerModerationDashboard }>(config, "/api/admin/messenger/moderation/dashboard");
  },

  messengerModerationReports(config: AdminApiConfig, status?: string) {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    return request<{ ok: true; reports: AdminMessengerModerationReport[]; dashboard: AdminMessengerModerationDashboard }>(config, `/api/admin/messenger/moderation/reports${query}`);
  },

  createMessengerModerationReport(config: AdminApiConfig, body: Partial<AdminMessengerModerationReport> & { title: string; description: string }) {
    return request<{ ok: true; report: AdminMessengerModerationReport; reports: AdminMessengerModerationReport[]; dashboard: AdminMessengerModerationDashboard }>(config, "/api/admin/messenger/moderation/reports", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  assignMessengerModerationReport(config: AdminApiConfig, id: string, assignedTo?: string) {
    return request<{ ok: true; report: AdminMessengerModerationReport; reports: AdminMessengerModerationReport[]; dashboard: AdminMessengerModerationDashboard }>(config, `/api/admin/messenger/moderation/reports/${encodeURIComponent(id)}/assign`, {
      method: "POST",
      body: JSON.stringify({ assignedTo }),
    });
  },

  resolveMessengerModerationReport(config: AdminApiConfig, id: string, body: { status?: "resolved" | "rejected"; resolutionNote?: string }) {
    return request<{ ok: true; report: AdminMessengerModerationReport; reports: AdminMessengerModerationReport[]; dashboard: AdminMessengerModerationDashboard }>(config, `/api/admin/messenger/moderation/reports/${encodeURIComponent(id)}/resolve`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  messengerPremiumDashboard(config: AdminApiConfig) {
    return request<{ ok: true; premiumSettings: AdminMessengerPremiumSettings; dashboard: AdminMessengerModerationDashboard }>(config, "/api/admin/messenger/premium/dashboard");
  },

  updateMessengerPremiumSettings(config: AdminApiConfig, body: Partial<AdminMessengerPremiumSettings>) {
    return request<{ ok: true; premiumSettings: AdminMessengerPremiumSettings; dashboard: AdminMessengerModerationDashboard }>(config, "/api/admin/messenger/premium/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },


  messengerSafetyDashboard(config: AdminApiConfig) {
    return request<{ ok: true; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/dashboard");
  },

  messengerAiSafetySignals(config: AdminApiConfig) {
    return request<{ ok: true; signals: AdminMessengerAiSafetySignal[]; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/ai-signals");
  },

  ingestMessengerAiSafetySignal(config: AdminApiConfig, body: Partial<AdminMessengerAiSafetySignal> & { summary: string }) {
    return request<{ ok: true; signal: AdminMessengerAiSafetySignal; report?: AdminMessengerSafetyReport; signals: AdminMessengerAiSafetySignal[]; reports: AdminMessengerSafetyReport[]; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/ai-signals", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  convertMessengerAiSafetySignal(config: AdminApiConfig, id: string) {
    return request<{ ok: true; signal?: AdminMessengerAiSafetySignal; report: AdminMessengerSafetyReport; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/ai-signals/${encodeURIComponent(id)}/convert`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  ignoreMessengerAiSafetySignal(config: AdminApiConfig, id: string, reason?: string) {
    return request<{ ok: true; signal?: AdminMessengerAiSafetySignal; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/ai-signals/${encodeURIComponent(id)}/ignore`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },

  messengerSafetyReports(config: AdminApiConfig, status?: string) {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    return request<{ ok: true; reports: AdminMessengerSafetyReport[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/reports${query}`);
  },

  createMessengerSafetyReport(config: AdminApiConfig, body: Partial<AdminMessengerSafetyReport> & { title: string; description: string }) {
    return request<{ ok: true; report: AdminMessengerSafetyReport; reports: AdminMessengerSafetyReport[]; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/reports", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  assignMessengerSafetyReport(config: AdminApiConfig, id: string, assignedTo?: string) {
    return request<{ ok: true; report: AdminMessengerSafetyReport; reports: AdminMessengerSafetyReport[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/reports/${encodeURIComponent(id)}/assign`, {
      method: "POST",
      body: JSON.stringify({ assignedTo }),
    });
  },

  actionMessengerSafetyReport(config: AdminApiConfig, id: string, body: { action: string; note?: string; requestReference?: string }) {
    return request<{ ok: true; report: AdminMessengerSafetyReport; reports: AdminMessengerSafetyReport[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/reports/${encodeURIComponent(id)}/action`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  createMessengerAuthorityRequest(config: AdminApiConfig, body: {
    authorityName: string;
    requestReference?: string;
    requestKind?: string;
    authorityCountry?: string;
    authorityOfficerName?: string;
    authorityContactHash?: string;
    legalBasis: string;
    requestedScope: string;
    priority?: string;
    dueAt?: string;
    linkedReportIds?: string[];
    linkedCaseIds?: string[];
    linkedEvidenceIds?: string[];
  }) {
    return request<{ ok: true; request: AdminMessengerAuthorityRequest; authorityRequests: AdminMessengerAuthorityRequest[]; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/authority-requests", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  updateMessengerAuthorityRequestStatus(config: AdminApiConfig, id: string, body: { status: string; decisionNote?: string; linkedReportIds?: string[]; linkedCaseIds?: string[]; linkedEvidenceIds?: string[] }) {
    return request<{ ok: true; request: AdminMessengerAuthorityRequest; authorityRequests: AdminMessengerAuthorityRequest[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/authority-requests/${encodeURIComponent(id)}/status`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  exportMessengerAuthorityRequestPackage(config: AdminApiConfig, id: string) {
    return request<Record<string, unknown>>(config, `/api/admin/messenger/safety/authority-requests/${encodeURIComponent(id)}/export`);
  },

  exportMessengerSafetyReportPackage(config: AdminApiConfig, id: string) {
    return request<AdminMessengerSafetyReportPackage>(config, `/api/admin/messenger/safety/reports/${encodeURIComponent(id)}/cooperation-package`);
  },


  messengerSafetyEnforcementSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyEnforcementSnapshot>(config, "/api/admin/messenger/safety/enforcement/snapshot");
  },

  checkMessengerSafetyEnforcement(config: AdminApiConfig, body: { action?: string; targetType?: string; targetId?: string; userId?: string; chatId?: string; messageId?: string; groupId?: string; channelId?: string; botId?: string }) {
    return request<AdminMessengerSafetyEnforcementCheckResult>(config, "/api/admin/messenger/safety/enforcement/check", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  exportMessengerSafetyEnforcement(config: AdminApiConfig) {
    return request<AdminMessengerSafetyEnforcementSnapshot & { packageId?: string; purpose?: string }>(config, "/api/admin/messenger/safety/enforcement/export");
  },

  messengerSafetyRuntimeBridgeSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyRuntimeBridgeSnapshot>(config, "/api/admin/messenger/safety/runtime-bridge/snapshot");
  },

  checkMessengerSafetyRuntimeBridge(config: AdminApiConfig, body: { runtimeAction?: string; action?: string; targetType?: string; targetId?: string; userId?: string; actorUserId?: string; peerUserId?: string; chatId?: string; conversationId?: string; messageId?: string; clientMessageId?: string; groupId?: string; channelId?: string; botId?: string; rawContentPresent?: boolean }) {
    return request<AdminMessengerSafetyRuntimeBridgeCheckResult>(config, "/api/admin/messenger/safety/runtime-bridge/check", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  exportMessengerSafetyRuntimeBridge(config: AdminApiConfig) {
    return request<AdminMessengerSafetyRuntimeBridgeSnapshot & { packageId?: string; purpose?: string }>(config, "/api/admin/messenger/safety/runtime-bridge/export");
  },


  messengerSafetyClientGuardsSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyClientGuardsSnapshot>(config, "/api/admin/messenger/safety/client-guards/snapshot");
  },

  validateMessengerSafetyClientGuard(config: AdminApiConfig, body: { guardKey?: string; platform?: string; clientLayer?: string; runtimeAction?: string; action?: string; targetType?: string; targetId?: string; userId?: string; actorUserId?: string; peerUserId?: string; chatId?: string; conversationId?: string; messageId?: string; clientMessageId?: string; groupId?: string; channelId?: string; botId?: string; rawContentPresent?: boolean }) {
    return request<AdminMessengerSafetyClientGuardValidationResult>(config, "/api/admin/messenger/safety/client-guards/validate", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  exportMessengerSafetyClientGuards(config: AdminApiConfig) {
    return request<AdminMessengerSafetyClientGuardsSnapshot & { packageId?: string; purpose?: string }>(config, "/api/admin/messenger/safety/client-guards/export");
  },


  messengerSafetyGuardEventsSnapshot(config: AdminApiConfig, limit = 100) {
    return request<AdminMessengerSafetyGuardEventSnapshot>(config, `/api/admin/messenger/safety/guard-events/snapshot?limit=${encodeURIComponent(String(limit))}`);
  },

  exportMessengerSafetyGuardEvents(config: AdminApiConfig) {
    return request<AdminMessengerSafetyGuardEventSnapshot & { packageId?: string; purpose?: string; rawContentIncluded?: false }>(config, "/api/admin/messenger/safety/guard-events/export");
  },

  messengerSafetyIntegrityMonitorSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyIntegrityMonitorSnapshot>(config, "/api/admin/messenger/safety/integrity-monitor/snapshot");
  },

  exportMessengerSafetyIntegrityMonitor(config: AdminApiConfig) {
    return request<AdminMessengerSafetyIntegrityMonitorSnapshot & { packageId?: string; purpose?: string; rawContentIncluded?: false }>(config, "/api/admin/messenger/safety/integrity-monitor/export");
  },

  messengerSafetyEscalationsSnapshot(config: AdminApiConfig, limit = 100) {
    return request<AdminMessengerSafetyEscalationSnapshot>(config, `/api/admin/messenger/safety/escalations/snapshot?limit=${encodeURIComponent(String(limit))}`);
  },

  updateMessengerSafetyEscalationStatus(config: AdminApiConfig, id: string, body: { status: string; note?: string; assignedTo?: string }) {
    return request<{ ok: true; escalation: AdminMessengerSafetyEscalationItem; escalations: AdminMessengerSafetyEscalationItem[]; snapshot: AdminMessengerSafetyEscalationSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/escalations/${encodeURIComponent(id)}/status`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  exportMessengerSafetyEscalations(config: AdminApiConfig) {
    return request<AdminMessengerSafetyEscalationSnapshot & { packageId?: string; purpose?: string; rawContentIncluded?: false }>(config, "/api/admin/messenger/safety/escalations/export");
  },


  messengerSafetyComplianceReportsSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyComplianceReportSnapshot>(config, "/api/admin/messenger/safety/compliance-reports/snapshot");
  },

  buildMessengerSafetyComplianceReport(config: AdminApiConfig, body: { scope?: string; scopeId?: string; title?: string }) {
    return request<AdminMessengerSafetyComplianceReportPackage>(config, "/api/admin/messenger/safety/compliance-reports/build", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  exportMessengerSafetyComplianceReport(config: AdminApiConfig, scope = "full_messenger_safety", scopeId?: string, title?: string) {
    const params = new URLSearchParams({ scope });
    if (scopeId) params.set("scopeId", scopeId);
    if (title) params.set("title", title);
    return request<AdminMessengerSafetyComplianceReportPackage>(config, `/api/admin/messenger/safety/compliance-reports/export?${params.toString()}`);
  },


  messengerSafetyAccessControlSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyAccessControlSnapshot>(config, "/api/admin/messenger/safety/access-control/snapshot");
  },
  checkMessengerSafetyAccessControl(config: AdminApiConfig, payload: { scope?: string; action?: string; role?: string; adminId?: string; permissions?: string[]; rootOwner?: boolean }) {
    return request<{ ok: true; decision: AdminMessengerSafetyAccessControlDecision; checks: AdminMessengerSafetyAccessControlDecision[]; snapshot: AdminMessengerSafetyAccessControlSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/access-control/check", { method: "POST", body: JSON.stringify(payload) });
  },
  exportMessengerSafetyAccessControl(config: AdminApiConfig) {
    return request<AdminMessengerSafetyAccessControlPackage>(config, "/api/admin/messenger/safety/access-control/export");
  },


  messengerSafetyStaffAssignmentsSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyStaffAssignmentSnapshot>(config, "/api/admin/messenger/safety/staff-assignments/snapshot");
  },
  createMessengerSafetyStaffAssignment(config: AdminApiConfig, payload: Record<string, unknown>) {
    return request<{ ok: true; assignment: AdminMessengerSafetyStaffAssignment; assignments: AdminMessengerSafetyStaffAssignment[]; snapshot: AdminMessengerSafetyStaffAssignmentSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/staff-assignments", { method: "POST", body: JSON.stringify(payload) });
  },
  updateMessengerSafetyStaffAssignmentStatus(config: AdminApiConfig, id: string, body: { status: string; note?: string; assignedToAdminId?: string; assignedRole?: string }) {
    return request<{ ok: true; assignment: AdminMessengerSafetyStaffAssignment; assignments: AdminMessengerSafetyStaffAssignment[]; snapshot: AdminMessengerSafetyStaffAssignmentSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/staff-assignments/${encodeURIComponent(id)}/status`, { method: "POST", body: JSON.stringify(body) });
  },
  exportMessengerSafetyStaffAssignments(config: AdminApiConfig) {
    return request<AdminMessengerSafetyStaffAssignmentPackage>(config, "/api/admin/messenger/safety/staff-assignments/export");
  },

  messengerSafetySupervisorDashboardSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetySupervisorDashboardSnapshot>(config, "/api/admin/messenger/safety/supervisor-dashboard/snapshot");
  },
  exportMessengerSafetySupervisorDashboard(config: AdminApiConfig) {
    return request<AdminMessengerSafetySupervisorDashboardPackage>(config, "/api/admin/messenger/safety/supervisor-dashboard/export");
  },

  messengerSafetyDailyOperationsSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyDailyOperationsSnapshot>(config, "/api/admin/messenger/safety/daily-operations/snapshot");
  },
  exportMessengerSafetyDailyOperations(config: AdminApiConfig) {
    return request<AdminMessengerSafetyDailyOperationsPackage>(config, "/api/admin/messenger/safety/daily-operations/export");
  },

  messengerSafetyPrelaunchReadinessGateSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPrelaunchReadinessGateSnapshot>(config, "/api/admin/messenger/safety/prelaunch-gate/snapshot");
  },
  exportMessengerSafetyPrelaunchReadinessGate(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPrelaunchReadinessGatePackage>(config, "/api/admin/messenger/safety/prelaunch-gate/export");
  },

  messengerSafetyLaunchCommandSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyLaunchCommandSnapshot>(config, "/api/admin/messenger/safety/launch-command/snapshot");
  },
  exportMessengerSafetyLaunchCommand(config: AdminApiConfig) {
    return request<AdminMessengerSafetyLaunchCommandPackage>(config, "/api/admin/messenger/safety/launch-command/export");
  },

  messengerSafetyPostLaunchMonitorSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPostLaunchMonitorSnapshot>(config, "/api/admin/messenger/safety/post-launch-monitor/snapshot");
  },
  exportMessengerSafetyPostLaunchMonitor(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPostLaunchMonitorPackage>(config, "/api/admin/messenger/safety/post-launch-monitor/export");
  },

  messengerSafetyIncidentResponseSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyIncidentResponseSnapshot>(config, "/api/admin/messenger/safety/incidents/snapshot");
  },
  createMessengerSafetyIncident(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; incident: AdminMessengerSafetyIncidentResponse; incidents: AdminMessengerSafetyIncidentResponse[]; snapshot: AdminMessengerSafetyIncidentResponseSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/incidents", { method: "POST", body: JSON.stringify(body) });
  },
  updateMessengerSafetyIncidentStatus(config: AdminApiConfig, id: string, body: { status: string; note?: string }) {
    return request<{ ok: true; incident: AdminMessengerSafetyIncidentResponse; incidents: AdminMessengerSafetyIncidentResponse[]; snapshot: AdminMessengerSafetyIncidentResponseSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/incidents/${encodeURIComponent(id)}/status`, { method: "POST", body: JSON.stringify(body) });
  },
  exportMessengerSafetyIncidentResponse(config: AdminApiConfig) {
    return request<AdminMessengerSafetyIncidentResponsePackage>(config, "/api/admin/messenger/safety/incidents/export");
  },

  messengerSafetyEmergencyActionSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyEmergencyActionSnapshot>(config, "/api/admin/messenger/safety/emergency-actions/snapshot");
  },
  createMessengerSafetyEmergencyAction(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; action: AdminMessengerSafetyEmergencyAction; actions: AdminMessengerSafetyEmergencyAction[]; snapshot: AdminMessengerSafetyEmergencyActionSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/emergency-actions", { method: "POST", body: JSON.stringify(body) });
  },
  updateMessengerSafetyEmergencyActionStatus(config: AdminApiConfig, id: string, body: { status: string; note?: string }) {
    return request<{ ok: true; action: AdminMessengerSafetyEmergencyAction; actions: AdminMessengerSafetyEmergencyAction[]; snapshot: AdminMessengerSafetyEmergencyActionSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/emergency-actions/${encodeURIComponent(id)}/status`, { method: "POST", body: JSON.stringify(body) });
  },
  exportMessengerSafetyEmergencyAction(config: AdminApiConfig) {
    return request<AdminMessengerSafetyEmergencyActionPackage>(config, "/api/admin/messenger/safety/emergency-actions/export");
  },

  messengerSafetyRecoveryReviewSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyRecoveryReviewSnapshot>(config, "/api/admin/messenger/safety/recovery-reviews/snapshot");
  },
  createMessengerSafetyRecoveryReview(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; review: AdminMessengerSafetyRecoveryReview; reviews: AdminMessengerSafetyRecoveryReview[]; snapshot: AdminMessengerSafetyRecoveryReviewSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/recovery-reviews", { method: "POST", body: JSON.stringify(body) });
  },
  updateMessengerSafetyRecoveryReviewStatus(config: AdminApiConfig, id: string, body: Record<string, unknown>) {
    return request<{ ok: true; review: AdminMessengerSafetyRecoveryReview; reviews: AdminMessengerSafetyRecoveryReview[]; snapshot: AdminMessengerSafetyRecoveryReviewSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/recovery-reviews/${encodeURIComponent(id)}/status`, { method: "POST", body: JSON.stringify(body) });
  },
  exportMessengerSafetyRecoveryReview(config: AdminApiConfig) {
    return request<AdminMessengerSafetyRecoveryReviewPackage>(config, "/api/admin/messenger/safety/recovery-reviews/export");
  },



  messengerSafetyPolicyFeedbackSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPolicyFeedbackSnapshot>(config, "/api/admin/messenger/safety/policy-feedback/snapshot");
  },
  createMessengerSafetyPolicyFeedback(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; feedbackItem: AdminMessengerSafetyPolicyFeedbackItem; feedbackItems: AdminMessengerSafetyPolicyFeedbackItem[]; snapshot: AdminMessengerSafetyPolicyFeedbackSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/policy-feedback", { method: "POST", body: JSON.stringify(body) });
  },
  updateMessengerSafetyPolicyFeedbackStatus(config: AdminApiConfig, id: string, body: Record<string, unknown>) {
    return request<{ ok: true; feedbackItem: AdminMessengerSafetyPolicyFeedbackItem; feedbackItems: AdminMessengerSafetyPolicyFeedbackItem[]; snapshot: AdminMessengerSafetyPolicyFeedbackSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/policy-feedback/${encodeURIComponent(id)}/status`, { method: "POST", body: JSON.stringify(body) });
  },
  exportMessengerSafetyPolicyFeedback(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPolicyFeedbackPackage>(config, "/api/admin/messenger/safety/policy-feedback/export");
  },
  messengerSafetyPolicyRegistrySnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPolicyRegistrySnapshot>(config, "/api/admin/messenger/safety/policy-registry/snapshot");
  },
  createMessengerSafetyPolicyRegistry(config: AdminApiConfig, body: Record<string, unknown>) {
    return request<{ ok: true; policy: AdminMessengerSafetyPolicyRegistryItem; policies: AdminMessengerSafetyPolicyRegistryItem[]; snapshot: AdminMessengerSafetyPolicyRegistrySnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/policy-registry", { method: "POST", body: JSON.stringify(body) });
  },
  updateMessengerSafetyPolicyRegistryStatus(config: AdminApiConfig, id: string, body: Record<string, unknown>) {
    return request<{ ok: true; policy: AdminMessengerSafetyPolicyRegistryItem; policies: AdminMessengerSafetyPolicyRegistryItem[]; snapshot: AdminMessengerSafetyPolicyRegistrySnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/policy-registry/${encodeURIComponent(id)}/status`, { method: "POST", body: JSON.stringify(body) });
  },
  exportMessengerSafetyPolicyRegistry(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPolicyRegistryPackage>(config, "/api/admin/messenger/safety/policy-registry/export");
  },
  messengerSafetyPolicyDeploymentSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPolicyDeploymentSnapshot>(config, "/api/admin/messenger/safety/policy-deployment/snapshot");
  },
  syncMessengerSafetyPolicyDeployment(config: AdminApiConfig) {
    return request<{ ok: true; deployments: AdminMessengerSafetyPolicyDeploymentItem[]; createdDeployments: AdminMessengerSafetyPolicyDeploymentItem[]; snapshot: AdminMessengerSafetyPolicyDeploymentSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/policy-deployment/sync-active", { method: "POST" });
  },
  updateMessengerSafetyPolicyDeploymentStatus(config: AdminApiConfig, id: string, body: Record<string, unknown>) {
    return request<{ ok: true; deployment: AdminMessengerSafetyPolicyDeploymentItem; deployments: AdminMessengerSafetyPolicyDeploymentItem[]; snapshot: AdminMessengerSafetyPolicyDeploymentSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/policy-deployment/${encodeURIComponent(id)}/status`, { method: "POST", body: JSON.stringify(body) });
  },
  exportMessengerSafetyPolicyDeployment(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPolicyDeploymentPackage>(config, "/api/admin/messenger/safety/policy-deployment/export");
  },

  messengerSafetyPolicyTrainingSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPolicyTrainingSnapshot>(config, "/api/admin/messenger/safety/policy-training/snapshot");
  },
  syncMessengerSafetyPolicyTraining(config: AdminApiConfig) {
    return request<{ ok: true; tasks: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[]; createdTrainingTasks: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[]; snapshot: AdminMessengerSafetyPolicyTrainingSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/policy-training/sync-required", { method: "POST" });
  },
  assignMessengerSafetyPolicyTraining(config: AdminApiConfig, id: string, body: Record<string, unknown>) {
    return request<{ ok: true; task: AdminMessengerSafetyPolicyTrainingAcknowledgementItem; tasks: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[]; snapshot: AdminMessengerSafetyPolicyTrainingSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/policy-training/${encodeURIComponent(id)}/assign`, { method: "POST", body: JSON.stringify(body) });
  },
  acknowledgeMessengerSafetyPolicyTraining(config: AdminApiConfig, id: string, body: Record<string, unknown>) {
    return request<{ ok: true; task: AdminMessengerSafetyPolicyTrainingAcknowledgementItem; tasks: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[]; snapshot: AdminMessengerSafetyPolicyTrainingSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/policy-training/${encodeURIComponent(id)}/acknowledge`, { method: "POST", body: JSON.stringify(body) });
  },
  completeMessengerSafetyPolicyTraining(config: AdminApiConfig, id: string, body: Record<string, unknown>) {
    return request<{ ok: true; task: AdminMessengerSafetyPolicyTrainingAcknowledgementItem; tasks: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[]; snapshot: AdminMessengerSafetyPolicyTrainingSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/policy-training/${encodeURIComponent(id)}/complete`, { method: "POST", body: JSON.stringify(body) });
  },
  waiveMessengerSafetyPolicyTraining(config: AdminApiConfig, id: string, body: Record<string, unknown>) {
    return request<{ ok: true; task: AdminMessengerSafetyPolicyTrainingAcknowledgementItem; tasks: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[]; snapshot: AdminMessengerSafetyPolicyTrainingSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/policy-training/${encodeURIComponent(id)}/waive`, { method: "POST", body: JSON.stringify(body) });
  },
  exportMessengerSafetyPolicyTraining(config: AdminApiConfig) {
    return request<AdminMessengerSafetyPolicyTrainingPackage>(config, "/api/admin/messenger/safety/policy-training/export");
  },



  messengerUiTextCleanlinessSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerUiTextCleanlinessSnapshot>(config, "/api/admin/messenger/ui-text-cleanliness/snapshot");
  },
  updateMessengerUiTextCleanlinessSettings(config: AdminApiConfig, body: Partial<AdminMessengerUiTextCleanlinessSettings>) {
    return request<{ ok: true; settings: AdminMessengerUiTextCleanlinessSettings; snapshot: AdminMessengerUiTextCleanlinessSnapshot }>(config, "/api/admin/messenger/ui-text-cleanliness/settings", { method: "PATCH", body: JSON.stringify(body) });
  },
  setMessengerUiTextCleanlinessItemStatus(config: AdminApiConfig, key: string, status: "verify" | "block" | "waive" | "reset", note?: string, proofRef?: string) {
    return request<{ ok: true; snapshot: AdminMessengerUiTextCleanlinessSnapshot }>(config, `/api/admin/messenger/ui-text-cleanliness/items/${encodeURIComponent(key)}/${encodeURIComponent(status)}`, { method: "POST", body: JSON.stringify({ note, proofRef }) });
  },
  exportMessengerUiTextCleanliness(config: AdminApiConfig) {
    return request<Record<string, unknown>>(config, "/api/admin/messenger/ui-text-cleanliness/export");
  },

  messengerRegressionSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerRegressionSnapshot>(config, "/api/admin/messenger/regression-recheck/snapshot");
  },

  updateMessengerRegressionSettings(config: AdminApiConfig, body: Partial<AdminMessengerRegressionSettings>) {
    return request<{ ok: true; settings: AdminMessengerRegressionSettings; snapshot: AdminMessengerRegressionSnapshot }>(config, "/api/admin/messenger/regression-recheck/settings", { method: "PATCH", body: JSON.stringify(body) });
  },

  setMessengerRegressionItemStatus(config: AdminApiConfig, key: string, status: "verify" | "block" | "waive" | "reset", note?: string, proofRef?: string) {
    return request<{ ok: true; snapshot: AdminMessengerRegressionSnapshot }>(config, `/api/admin/messenger/regression-recheck/items/${encodeURIComponent(key)}/${encodeURIComponent(status)}`, { method: "POST", body: JSON.stringify({ note, proofRef }) });
  },

  exportMessengerRegression(config: AdminApiConfig) {
    return request<Record<string, unknown>>(config, "/api/admin/messenger/regression-recheck/export");
  },




  messengerAccessTextGateSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerAccessTextGateSnapshot>(config, "/api/admin/messenger/access-text-gate/snapshot");
  },

  updateMessengerAccessTextGateSettings(config: AdminApiConfig, body: Partial<AdminMessengerAccessTextGateSettings>) {
    return request<{ ok: true; settings: AdminMessengerAccessTextGateSettings; snapshot: AdminMessengerAccessTextGateSnapshot }>(config, "/api/admin/messenger/access-text-gate/settings", { method: "PATCH", body: JSON.stringify(body) });
  },

  setMessengerAccessTextGateItemStatus(config: AdminApiConfig, key: string, status: "verify" | "block" | "waive" | "reset", note?: string, proofRef?: string) {
    return request<{ ok: true; snapshot: AdminMessengerAccessTextGateSnapshot }>(config, `/api/admin/messenger/access-text-gate/items/${encodeURIComponent(key)}/${encodeURIComponent(status)}`, { method: "POST", body: JSON.stringify({ note, proofRef }) });
  },

  exportMessengerAccessTextGate(config: AdminApiConfig) {
    return request<Record<string, unknown>>(config, "/api/admin/messenger/access-text-gate/export");
  },

  messengerOwnerHandoffSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerOwnerHandoffSnapshot>(config, "/api/admin/messenger/owner-handoff/snapshot");
  },

  updateMessengerOwnerHandoffSettings(config: AdminApiConfig, body: Partial<AdminMessengerOwnerHandoffSettings>) {
    return request<{ ok: true; settings: AdminMessengerOwnerHandoffSettings; snapshot: AdminMessengerOwnerHandoffSnapshot }>(config, "/api/admin/messenger/owner-handoff/settings", { method: "PATCH", body: JSON.stringify(body) });
  },

  setMessengerOwnerHandoffItemStatus(config: AdminApiConfig, key: string, status: "verify" | "block" | "waive" | "reset", note?: string, proofRef?: string) {
    return request<{ ok: true; snapshot: AdminMessengerOwnerHandoffSnapshot }>(config, `/api/admin/messenger/owner-handoff/items/${encodeURIComponent(key)}/${encodeURIComponent(status)}`, { method: "POST", body: JSON.stringify({ note, proofRef }) });
  },

  exportMessengerOwnerHandoff(config: AdminApiConfig) {
    return request<Record<string, unknown>>(config, "/api/admin/messenger/owner-handoff/export");
  },



  messengerMobileTransitionSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerMobileTransitionSnapshot>(config, "/api/admin/messenger/mobile-transition/snapshot");
  },

  updateMessengerMobileTransitionSettings(config: AdminApiConfig, body: Partial<AdminMessengerMobileTransitionSettings>) {
    return request<{ ok: true; settings: AdminMessengerMobileTransitionSettings; snapshot: AdminMessengerMobileTransitionSnapshot }>(config, "/api/admin/messenger/mobile-transition/settings", { method: "PATCH", body: JSON.stringify(body) });
  },

  setMessengerMobileTransitionItemStatus(config: AdminApiConfig, key: string, status: "verify" | "block" | "waive" | "reset", note?: string, proofRef?: string) {
    return request<{ ok: true; snapshot: AdminMessengerMobileTransitionSnapshot }>(config, `/api/admin/messenger/mobile-transition/items/${encodeURIComponent(key)}/${encodeURIComponent(status)}`, { method: "POST", body: JSON.stringify({ note, proofRef }) });
  },

  exportMessengerMobileTransition(config: AdminApiConfig) {
    return request<Record<string, unknown>>(config, "/api/admin/messenger/mobile-transition/export");
  },

  messengerReleaseCandidateSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerReleaseCandidateSnapshot>(config, "/api/admin/messenger/release-candidate/snapshot");
  },
  updateMessengerReleaseCandidateSettings(config: AdminApiConfig, body: Partial<AdminMessengerReleaseCandidateSettings>) {
    return request<{ ok: true; settings: AdminMessengerReleaseCandidateSettings; snapshot: AdminMessengerReleaseCandidateSnapshot }>(config, "/api/admin/messenger/release-candidate/settings", { method: "PATCH", body: JSON.stringify(body) });
  },
  setMessengerReleaseCandidateGateStatus(config: AdminApiConfig, key: string, status: "verify" | "block" | "waive" | "reset", note?: string, proofRef?: string) {
    return request<{ ok: true; snapshot: AdminMessengerReleaseCandidateSnapshot }>(config, `/api/admin/messenger/release-candidate/gates/${encodeURIComponent(key)}/${encodeURIComponent(status)}`, { method: "POST", body: JSON.stringify({ note, proofRef }) });
  },

  messengerSafetyExportVerificationSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyExportVerificationSnapshot>(config, "/api/admin/messenger/safety/export-verification/snapshot");
  },
  verifyMessengerSafetyExportPackage(config: AdminApiConfig, payload: Record<string, unknown>) {
    return request<{ ok: true; verification: AdminMessengerSafetyExportVerificationSnapshot["recentVerifications"][number]; snapshot: AdminMessengerSafetyExportVerificationSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/export-verification/verify", { method: "POST", body: JSON.stringify(payload) });
  },
  exportMessengerSafetyExportVerification(config: AdminApiConfig) {
    return request<AdminMessengerSafetyExportVerificationPackage>(config, "/api/admin/messenger/safety/export-verification/export");
  },
  messengerSafetyRetentionSnapshot(config: AdminApiConfig) {
    return request<AdminMessengerSafetyRetentionSnapshot>(config, "/api/admin/messenger/safety/retention/snapshot");
  },

  createMessengerSafetyRetentionLegalHold(config: AdminApiConfig, body: { targetType: string; targetId: string; reason?: string; legalBasis?: string; linkedReportIds?: string[]; linkedCaseIds?: string[]; linkedEvidenceIds?: string[]; linkedAuthorityRequestIds?: string[] }) {
    return request<{ ok: true; legalHold: AdminMessengerSafetyLegalHold; legalHolds: AdminMessengerSafetyLegalHold[]; snapshot: AdminMessengerSafetyRetentionSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/retention/legal-holds", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  releaseMessengerSafetyRetentionLegalHold(config: AdminApiConfig, id: string, note?: string) {
    return request<{ ok: true; legalHold: AdminMessengerSafetyLegalHold; legalHolds: AdminMessengerSafetyLegalHold[]; snapshot: AdminMessengerSafetyRetentionSnapshot; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/retention/legal-holds/${encodeURIComponent(id)}/release`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  exportMessengerSafetyRetention(config: AdminApiConfig) {
    return request<AdminMessengerSafetyRetentionPackage>(config, "/api/admin/messenger/safety/retention/export");
  },

  messengerSafetyRestrictions(config: AdminApiConfig, status?: string) {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    return request<{ ok: true; restrictions: AdminMessengerSafetyRestriction[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/restrictions${query}`);
  },

  createMessengerSafetyRestriction(config: AdminApiConfig, body: Partial<AdminMessengerSafetyRestriction> & { activateNow?: boolean }) {
    return request<{ ok: true; restriction: AdminMessengerSafetyRestriction; restrictions: AdminMessengerSafetyRestriction[]; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/restrictions", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  updateMessengerSafetyRestrictionStatus(config: AdminApiConfig, id: string, body: { status: string; note?: string }) {
    return request<{ ok: true; restriction: AdminMessengerSafetyRestriction; restrictions: AdminMessengerSafetyRestriction[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/restrictions/${encodeURIComponent(id)}/status`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  releaseMessengerSafetyRestriction(config: AdminApiConfig, id: string, note?: string) {
    return request<{ ok: true; restriction: AdminMessengerSafetyRestriction; restrictions: AdminMessengerSafetyRestriction[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/restrictions/${encodeURIComponent(id)}/release`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  exportMessengerSafetyRestrictions(config: AdminApiConfig) {
    return request<Record<string, unknown>>(config, "/api/admin/messenger/safety/restrictions/export");
  },

  messengerSafetyCaseReviewCenter(config: AdminApiConfig) {
    return request<{ ok: true; cases: AdminMessengerSafetyCaseReview[]; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/case-review-center");
  },

  openMessengerSafetyReviewCase(config: AdminApiConfig, reportId: string, note?: string) {
    return request<{ ok: true; caseReview: AdminMessengerSafetyCaseReview; cases: AdminMessengerSafetyCaseReview[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/reports/${encodeURIComponent(reportId)}/review-case`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  updateMessengerSafetyCaseStatus(config: AdminApiConfig, id: string, body: { status: string; assignedTo?: string; note?: string }) {
    return request<{ ok: true; caseReview: AdminMessengerSafetyCaseReview; cases: AdminMessengerSafetyCaseReview[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/cases/${encodeURIComponent(id)}/status`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  decideMessengerSafetyCase(config: AdminApiConfig, id: string, body: { decision: string; note?: string; legalBasis?: string; authorityRequestId?: string; requestReference?: string; restrictionScope?: string; restrictionTargetId?: string }) {
    return request<{ ok: true; caseReview: AdminMessengerSafetyCaseReview; cases: AdminMessengerSafetyCaseReview[]; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/cases/${encodeURIComponent(id)}/decision`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  exportMessengerSafetyCasePackage(config: AdminApiConfig, id: string) {
    return request<Record<string, unknown>>(config, `/api/admin/messenger/safety/cases/${encodeURIComponent(id)}/export`);
  },

  messengerEvidenceVault(config: AdminApiConfig, params?: { reportId?: string; aiSignalId?: string }) {
    const query = params?.reportId
      ? `?reportId=${encodeURIComponent(params.reportId)}`
      : params?.aiSignalId
        ? `?aiSignalId=${encodeURIComponent(params.aiSignalId)}`
        : "";
    return request<{ ok: true; evidence: AdminMessengerEvidenceVaultItem[]; integrity: AdminMessengerEvidenceVaultIntegrity; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/evidence-vault${query}`);
  },

  createMessengerEvidenceVaultItem(config: AdminApiConfig, body: Partial<AdminMessengerEvidenceVaultItem> & { note?: string }) {
    return request<{ ok: true; evidence: AdminMessengerEvidenceVaultItem; evidenceVault: AdminMessengerEvidenceVaultItem[]; integrity: AdminMessengerEvidenceVaultIntegrity; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/evidence-vault", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  sealMessengerEvidenceVaultItem(config: AdminApiConfig, id: string, note?: string) {
    return request<{ ok: true; evidence: AdminMessengerEvidenceVaultItem; integrity: AdminMessengerEvidenceVaultIntegrity; dashboard: AdminMessengerSafetyDashboard }>(config, `/api/admin/messenger/safety/evidence-vault/${encodeURIComponent(id)}/seal`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  exportMessengerEvidenceVault(config: AdminApiConfig) {
    return request<Record<string, unknown>>(config, "/api/admin/messenger/safety/evidence-vault/export");
  },

  updateMessengerSafetySettings(config: AdminApiConfig, body: Partial<AdminMessengerSafetySettings>) {
    return request<{ ok: true; settings: AdminMessengerSafetySettings; dashboard: AdminMessengerSafetyDashboard }>(config, "/api/admin/messenger/safety/settings", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  exportMessengerSafetyCooperation(config: AdminApiConfig) {
    return request<Record<string, unknown>>(config, "/api/admin/messenger/safety/cooperation/export");
  },


  developerConsole(config: AdminApiConfig) {
    return request<{ ok: true; console: AdminDeveloperConsoleState }>(config, "/api/admin/developer/console");
  },

  runDeveloperDiagnostics(config: AdminApiConfig) {
    return request<{ ok: true; diagnostics: AdminDeveloperDiagnosticCheck[]; generatedAt: string }>(config, "/api/admin/developer/diagnostics/run", {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  developerLogs(config: AdminApiConfig) {
    return request<{ ok: true; logs: AdminDeveloperConsoleState["recentAudit"] }>(config, "/api/admin/developer/logs?limit=100");
  },

  developerFeatureFlags(config: AdminApiConfig) {
    return request<{ ok: true; featureFlags: AdminDeveloperFeatureFlag[] }>(config, "/api/admin/developer/feature-flags");
  },

};

// PLAY-READY-41 REVIEWER EVIDENCE API START
export type PlayReady41ReviewerEvidenceRouteId =
  | "summary"
  | "categories"
  | "manual_screenshots"
  | "permission_declarations"
  | "production_readiness_blockers"
  | "safety_status";

export type PlayReady41ReviewerEvidenceClientResult = {
  ok: boolean;
  status: number;
  routeId: PlayReady41ReviewerEvidenceRouteId;
  method: "GET";
  readOnly: true;
  json: Record<string, unknown> | null;
  error?: string;
};

const playReady41ReviewerEvidenceRouteMap: Record<PlayReady41ReviewerEvidenceRouteId, string> = {
  summary: "/api/admin/play-ready/reviewer-evidence/summary",
  categories: "/api/admin/play-ready/reviewer-evidence/categories",
  manual_screenshots: "/api/admin/play-ready/reviewer-evidence/manual-screenshots",
  permission_declarations: "/api/admin/play-ready/reviewer-evidence/permission-declarations",
  production_readiness_blockers: "/api/admin/play-ready/reviewer-evidence/production-readiness-blockers",
  safety_status: "/api/admin/play-ready/reviewer-evidence/safety-status",
};

function getPlayReady41AdminToken(): string {
  const keys = ["ADMIN_PANEL_TOKEN", "adminPanelToken", "admin_token", "adminToken", "token"];
  for (const key of keys) {
    const value = globalThis.localStorage?.getItem(key);
    if (value) return value;
  }
  return "";
}

function getPlayReady41ReviewerEvidenceHeaders(): HeadersInit {
  const token = getPlayReady41AdminToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = "Bearer " + token;
    headers["x-admin-token"] = token;
    headers["x-admin-panel-token"] = token;
  }
  return headers;
}

export async function fetchPlayReadyReviewerEvidenceRoute(
  routeId: PlayReady41ReviewerEvidenceRouteId,
): Promise<PlayReady41ReviewerEvidenceClientResult> {
  const path = playReady41ReviewerEvidenceRouteMap[routeId];
  try {
    const response = await fetch(path, {
      method: "GET",
      headers: getPlayReady41ReviewerEvidenceHeaders(),
    });
    const text = await response.text();
    let json: Record<string, unknown> | null = null;
    if (text) {
      try {
        json = JSON.parse(text) as Record<string, unknown>;
      } catch {
        json = { ok: false, parseError: "reviewer_evidence_json_parse_failed" };
      }
    }
    return {
      ok: response.ok,
      status: response.status,
      routeId,
      method: "GET",
      readOnly: true,
      json,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      routeId,
      method: "GET",
      readOnly: true,
      json: null,
      error: error instanceof Error ? error.message : "reviewer_evidence_fetch_failed",
    };
  }
}

export function fetchPlayReadyReviewerEvidenceSummary() {
  return fetchPlayReadyReviewerEvidenceRoute("summary");
}

export function fetchPlayReadyReviewerEvidenceSafetyStatus() {
  return fetchPlayReadyReviewerEvidenceRoute("safety_status");
}

export function getPlayReadyReviewerEvidenceRouteMap() {
  return playReady41ReviewerEvidenceRouteMap;
}
// PLAY-READY-41 REVIEWER EVIDENCE API END


/**
 * BACKEND-STREAM-FOUNDATION-149C
 * Read-only Stream live/admin readiness binding.
 * No provider activation, no credential read, no DB/Wallet/money movement.
 */
export async function fetchStreamLiveAdminReadiness(config: AdminApiConfig): Promise<StreamLiveAdminReadinessApiResponse> {
  return request<StreamLiveAdminReadinessApiResponse>(config, "/api/admin/stream/live-admin/readiness");
}


// BACKEND-STREAM-FOUNDATION-156C STREAM REALTIME MEDIA LIFECYCLE ADMIN UI API START
function normalizeStreamRealtimeMediaLifecycleAdminBaseUrl156C(baseUrl: string): string {
  const fallback = "http://127.0.0.1:3000";
  const trimmed = String(baseUrl || fallback).trim() || fallback;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();
    const isLocalHost = host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host === "::1";
    const looksLikeAdminUiPort = url.port === "4000" || url.port === "5173" || url.port === "4173";
    if (isLocalHost && looksLikeAdminUiPort) {
      url.hostname = host === "0.0.0.0" ? "127.0.0.1" : url.hostname;
      url.port = "3000";
      url.pathname = "";
      url.search = "";
      url.hash = "";
      return url.toString().replace(/\/+$/, "");
    }
    if (isLocalHost && !url.port) {
      url.port = "3000";
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    return fallback;
  }
}

function readStreamRealtimeMediaLifecycleFlag156C(
  payload: StreamRealtimeMediaLifecycleAdminReadinessSnapshot156C | null,
  key: string,
): false | boolean {
  const value = payload?.[key];
  return value === true ? true : false;
}

export async function fetchStreamRealtimeMediaLifecycleReadiness156C(
  config: AdminApiConfig,
): Promise<StreamRealtimeMediaLifecycleAdminReadinessClientResult156C> {
  const baseUrl = normalizeStreamRealtimeMediaLifecycleAdminBaseUrl156C(config.baseUrl || "http://127.0.0.1:3000");
  const endpoint = "/api/admin/stream/realtime-media-lifecycle/readiness" as const;

  try {
    const response = await fetch(baseUrl + endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-sabi-admin-token": config.token || "",
        Authorization: config.token ? "Bearer " + config.token : "",
      },
    });

    const text = await response.text();
    let json: StreamRealtimeMediaLifecycleAdminReadinessSnapshot156C | null = null;
    if (text) {
      try {
        json = JSON.parse(text) as StreamRealtimeMediaLifecycleAdminReadinessSnapshot156C;
      } catch {
        json = { status: "json_parse_failed" };
      }
    }

    const providerStatus = String(json?.providerStatus || "provider_not_configured");

    return {
      ok: response.ok,
      status: response.status,
      readOnly: true,
      endpoint,
      json,
      providerStatus,
      runtimeEnabled: readStreamRealtimeMediaLifecycleFlag156C(json, "runtimeEnabled"),
      providerCallAllowedNow: readStreamRealtimeMediaLifecycleFlag156C(json, "providerCallAllowedNow"),
      databaseWriteAllowedNow: readStreamRealtimeMediaLifecycleFlag156C(json, "databaseWriteAllowedNow"),
      walletMutationAllowedNow: readStreamRealtimeMediaLifecycleFlag156C(json, "walletMutationAllowedNow"),
      moneyMovementAllowedNow: readStreamRealtimeMediaLifecycleFlag156C(json, "moneyMovementAllowedNow"),
      fakeSuccessAllowedNow: readStreamRealtimeMediaLifecycleFlag156C(json, "fakeSuccessAllowedNow"),
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      readOnly: true,
      endpoint,
      json: null,
      providerStatus: "provider_not_configured",
      runtimeEnabled: false,
      providerCallAllowedNow: false,
      databaseWriteAllowedNow: false,
      walletMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      fakeSuccessAllowedNow: false,
      error: error instanceof Error ? error.message : "stream_realtime_media_lifecycle_readiness_fetch_failed",
    };
  }
}
// BACKEND-STREAM-FOUNDATION-156C STREAM REALTIME MEDIA LIFECYCLE ADMIN UI API END
