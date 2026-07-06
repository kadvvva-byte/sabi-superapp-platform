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

export type AdminRoleCategory = "root" | "internal" | "client" | "legacy" | string;
export type AdminPermissionRiskLevel = "low" | "medium" | "high" | "critical" | string;

export type AdminPermissionDefinition = {
  key: AdminPermission;
  group: string;
  riskLevel: AdminPermissionRiskLevel;
};

export type AdminRoleDefinition = {
  key: string;
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
  key: string;
  ownerRole: string;
  panels: string[];
  securityRules: string[];
};

export type AdminRoleMatrix = {
  rootOwnerRole: string;
  roles: AdminRoleDefinition[];
  permissions: AdminPermissionDefinition[];
  separationRules: string[];
  criticalActionRules: string[];
  clientPortals: AdminClientPortalDefinition[];
};

export type AdminPrincipal = {
  id: string;
  role: string;
  permissions: AdminPermission[];
  tokenSource: string;
  rootOwner?: boolean;
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

export type AdminFinanceReport = {
  id: string;
  kind: "daily" | "weekly" | "monthly" | "custom" | string;
  title: string;
  status: "draft" | "ready" | "exported" | "locked" | string;
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
  source: string;
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};


export type AdminDeveloperCheckStatus = "pass" | "warn" | "fail" | "not_configured" | string;

export type AdminDeveloperDiagnosticCheck = {
  key: string;
  status: AdminDeveloperCheckStatus;
  severity: "info" | "warning" | "critical" | string;
  message: string;
  metadata?: Record<string, unknown>;
};

export type AdminDeveloperModuleStatus = {
  key: string;
  title: string;
  status: "ok" | "warning" | "blocked" | "not_configured" | string;
  version?: string;
  details?: string;
  safeForDeveloper: boolean;
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
  memory: Record<string, number>;
};

export type AdminDeveloperFeatureFlag = {
  key: string;
  enabled: boolean;
  source: "env" | "default" | "admin_planned" | string;
  safeToShow: boolean;
  description: string;
};

export type AdminDeveloperConsoleState = {
  generatedAt: string;
  runtime: AdminDeveloperRuntimeSnapshot;
  modules: AdminDeveloperModuleStatus[];
  providerSummary: AdminDeveloperProviderSummary;
  featureFlags: AdminDeveloperFeatureFlag[];
  diagnostics: AdminDeveloperDiagnosticCheck[];
  recentAudit: Array<{ id: string; sequence?: number; action: string; adminId: string; role: string; targetType?: string; targetId?: string; createdAt: string; metadataKeys?: string[] }>;
  safetyRules: string[];
  runtimeHealth?: unknown;
};


export type AdminOwnerCriticalConfirmation = {
  id: string;
  kind: string;
  status: "pending" | "approved" | "rejected" | "expired" | string;
  title: string;
  description?: string;
  requestedBy: string;
  requestedByRole: string;
  targetType?: string;
  targetId?: string;
  riskLevel: "high" | "critical" | string;
  requiredOwner: boolean;
  expiresAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export type AdminOwnerSecurityCenterState = {
  rootOwnerId: string;
  rootOwnerRole: "owner" | string;
  ownerTokenConfigured: boolean;
  pendingConfirmations: number;
  approvedConfirmations: number;
  rejectedConfirmations: number;
  expiredConfirmations: number;
  criticalQueue: AdminOwnerCriticalConfirmation[];
  recentConfirmations: AdminOwnerCriticalConfirmation[];
  requiredConfirmationKinds: string[];
  emergencyControls: {
    providerEmergencyLock: boolean;
    walletRouteEmergencyLock: boolean;
    staffAccessEmergencyLock: boolean;
    settlementEmergencyLock: boolean;
  };
  rules: string[];
  generatedAt: string;
};

export type AdminPlatformDashboard = {
  ok: true;
  dashboardVersion: string;
  generatedAt: string;
  summary: {
    totalUsers: number;
    onlineUsers: number;
    newUsersToday: number;
    newUsersYesterday: number;
    newUsers14Days: number;
    chats: number;
    messages: number;
    groups: number;
    channels: number;
    bots: number;
    providersReady: number;
    providersTotal: number;
    providerBlockers: number;
    messengerReadiness: string;
    messengerBlockers: number;
    messengerWarnings: number;
    riskOpenCases: number;
    riskCriticalCases: number;
    safetyOpenCriticalReports: number;
    auditIntegrityOk: boolean;
    auditAnchorHash: string | null;
  };
  modules: Array<{ key: string; title: string; status: string; dashboardRoute: string; metrics: Record<string, unknown> }>;
  charts: {
    userGrowth14d: Array<{ date: string; value: number }>;
    onlineUsers: Array<{ label: string; value: number }>;
    messengerObjects: Array<{ label: string; value: number }>;
  };
  rules: string[];
};

export type AdminHealth = {
  ok: boolean;
  module?: string;
  status?: string;
  writeEnabled?: boolean;
  tokenConfigured?: boolean;
  providerConsole?: string;
  generatedAt?: string;
};

export type ProviderStatus = {
  key: string;
  title: string;
  kind: string;
  configured: boolean;
  enabled: boolean;
  status: "ready" | "provider_not_configured" | "disabled" | string;
  source: "admin_config" | "env" | "mixed" | "none" | string;
  requiredFields: string[];
  missingFields: string[];
  secretFields: string[];
  optionalFields: string[];
  liveAllowed: boolean;
  recommendedBeforeLaunch: boolean;
  updatedAt?: string;
  lastTest?: ProviderTestResult;
};

export type ProviderCatalogItem = {
  key: string;
  title: string;
  kind: string;
  description: string;
  requiredFields: string[];
  secretFields: string[];
  optionalFields: string[];
  recommendedBeforeLaunch: boolean;
};

export type ProviderPublicConfig = {
  key: string;
  enabled: boolean;
  fields: Record<string, string>;
  secretFields: Record<string, string>;
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  lastTest?: ProviderTestResult;
};

export type ProviderDetails = {
  catalog: ProviderCatalogItem;
  status: ProviderStatus;
  config: ProviderPublicConfig | null;
};

export type ProviderTestResult = {
  ok: boolean;
  status: string;
  checkedAt: string;
  message?: string;
  missingFields?: string[];
  metadata?: Record<string, unknown>;
};


export type AdminStaffAccessStatus = "active" | "disabled" | "revoked" | string;

export type AdminStaffAccessUser = {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  role: string;
  permissions: AdminPermission[];
  status: AdminStaffAccessStatus;
  requireTwoFactor: boolean;
  allowedIpCidrs: string[];
  deviceBinding: "optional" | "required" | string;
  clientScope?: { merchantId?: string; businessId?: string };
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  revokedBy?: string;
  revokedAt?: string;
  lastLoginAt?: string;
};

export type AdminOwnerProtectionState = {
  rootOwnerRole: "owner";
  rootOwnerId: string;
  ownerTokenConfigured: boolean;
  staffCanCreateOwner: false;
  ownerOnlyActions: string[];
  criticalSecurityRules: string[];
};

export type AdminUser = Record<string, unknown> & {
  id?: string;
  email?: string;
  phone?: string;
  username?: string;
  displayName?: string;
  role?: string;
  createdAt?: string;
};

export type AdminRestriction = {
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
  status: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminRiskSignal = {
  id: string;
  source: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical" | string;
  status: "new" | "acknowledged" | "under_review" | "restricted" | "resolved" | "rejected" | string;
  targetType?: string;
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
  restrictions: AdminRestriction[];
  rules: string[];
};

export type AdminAuditEntry = {
  id: string;
  sequence?: number;
  prevHash?: string | null;
  hash?: string;
  integrityVersion?: "sha256-v1";
  action: string;
  adminId: string;
  role: string;
  targetType?: string;
  targetId?: string;
  ip?: string;
  userAgent?: string | string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
};


export type AdminAuditIntegrityReport = {
  ok: boolean;
  algorithm: "sha256" | string;
  integrityVersion: "sha256-v1" | string;
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
  appendOnly: boolean;
  hashChained: boolean;
  deleteSupported: boolean;
  exportSupported: boolean;
  retentionLimit: number;
  protectedEntries: number;
  legacyEntries: number;
  anchorHash: string | null;
  rules: string[];
};

export type ApiError = Error & {
  status?: number;
  payload?: unknown;
};

export type AdminSecretSecurityRule = {
  key: string;
  severity: "info" | "warning" | "critical" | string;
  ok: boolean;
};

export type AdminSecretSecurityState = {
  encryptedAtRest: true;
  algorithm: "aes-256-gcm" | string;
  secretKeyConfigured: boolean;
  secretKeySource: "explicit_env" | "derived_admin_token" | "missing" | string;
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

export type AdminMerchantStatus = "pending_review" | "active" | "restricted" | "suspended" | "closed" | string;
export type AdminMerchantKybStatus = "not_started" | "pending" | "approved" | "rejected" | string;
export type AdminMerchantRiskLevel = "low" | "medium" | "high" | "critical" | string;
export type AdminMerchantSettlementStatus = "pending" | "approved" | "paid" | "held" | "cancelled" | string;

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
  settlementStatus: "not_configured" | "ready" | "hold" | string;
  walletRoute: "merchant_wallet" | "business_wallet_pending" | "provider_not_configured" | string;
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


export type AdminBusinessStatus = "pending_review" | "active" | "restricted" | "suspended" | "closed" | string;
export type AdminBusinessKybStatus = "not_started" | "pending" | "approved" | "rejected" | string;
export type AdminBusinessRiskLevel = "low" | "medium" | "high" | "critical" | string;
export type AdminBusinessSettlementStatus = "pending" | "approved" | "paid" | "held" | "cancelled" | string;

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
  settlementStatus: "not_configured" | "ready" | "hold" | string;
  walletRoute: "business_wallet" | "provider_not_configured" | string;
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


export type AdminEmergencyLockScope = "all" | "providers" | "wallet" | "merchant" | "business" | "settlements" | "staff" | "qr" | "ai" | "system" | string;
export type AdminEmergencyLockStatus = "active" | "released" | string;

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


export type AdminMessengerStatus = "ok" | "warning" | "blocked" | "not_configured" | string;

export type AdminMessengerDiagnosticCheck = {
  key: string;
  title: string;
  status: AdminMessengerStatus;
  severity: "info" | "medium" | "warning" | "critical" | string;
  message: string;
  metadata?: Record<string, unknown>;
};

export type AdminMessengerFeatureFlag = {
  key: string;
  enabled: boolean;
  ownerControlled: boolean;
  riskLevel: "medium" | "high" | string;
  description: string;
  source?: "env_or_default" | "admin" | string;
  updatedBy?: string;
  updatedAt?: string;
  note?: string;
};

export type AdminMessengerLaunchBlocker = {
  id?: string;
  key: string;
  title: string;
  message: string;
  severity: "warning" | "critical" | string;
  status: AdminMessengerStatus | "active" | "resolved" | string;
  source?: "diagnostic" | "manual" | string;
  createdBy?: string;
  createdAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNote?: string;
};



export type AdminMessengerDirectoryKind = "group" | "channel" | "bot" | string;

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
  status: string;
  publicVisible: boolean;
  memberCount?: number;
  createdAt?: string;
  updatedAt?: string;
  restrictedBy?: string;
  restrictedAt?: string;
  restrictionReason?: string;
  source: string;
};

export type AdminMessengerDirectoryRestriction = {
  id: string;
  kind: AdminMessengerDirectoryKind;
  targetId: string;
  reason: string;
  status: "active" | "released" | string;
  createdBy: string;
  createdAt: string;
  releasedBy?: string;
  releasedAt?: string;
  releaseReason?: string;
};

export type AdminMessengerDirectoryDashboard = {
  generatedAt: string;
  settings: AdminMessengerDirectorySettings;
  summary: { groups: number; channels: number; bots: number; restricted: number; databaseConnected: boolean; publicDirectoryEnabled: boolean };
  items: AdminMessengerDirectoryItem[];
  restrictions: AdminMessengerDirectoryRestriction[];
  rules: string[];
};



export type AdminMessengerDirectoryReviewAction = "approve" | "hide" | "restrict" | "reject" | "restore";

export type AdminMessengerDirectoryReviewStatus =
  | "needs_review"
  | "restricted"
  | "hidden"
  | "rejected"
  | "unsafe"
  | "profile_removed"
  | string;

export type AdminMessengerDirectoryReviewQueueEntry = {
  id: string;
  kind: AdminMessengerDirectoryKind;
  title: string;
  name?: string;
  username?: string | null;
  ownerUserId?: string | null;
  status: AdminMessengerDirectoryReviewStatus;
  reason: string;
  visibilityStatus: string | null;
  listingStatus: string | null;
  approvalStatus: string | null;
  promotionPlacement: string | null;
  qualityScore: number;
  safetyScore: number;
  adminControlled: boolean;
  rawContentIncluded: false;
  updatedAt: string | null;
};

export type AdminMessengerDirectoryReviewQueueSnapshot = {
  ok: true;
  updatedAt: string | null;
  adminControlled: true;
  rawContentIncluded: false;
  forAdminReviewOnly: true;
  currentUserId?: string | null;
  kind: AdminMessengerDirectoryKind | "ALL";
  count: number;
  entries: AdminMessengerDirectoryReviewQueueEntry[];
};

export type AdminMessengerDirectoryReviewActionResult = {
  ok: boolean;
  kind: AdminMessengerDirectoryKind;
  id: string;
  action: AdminMessengerDirectoryReviewAction;
  visibleInMobile: boolean;
  error?: string | null;
  adminControlled: true;
  rawContentIncluded: false;
  updatedAt?: string | null;
};

export type AdminMessengerDirectoryPromotionListingStatus = "pending_approval" | "approved" | "featured" | "boosted" | "recommended" | "hidden" | "paused" | "rejected" | string;

export type AdminMessengerDirectoryPromotionSettings = {
  approvalRequired: boolean;
  autoPublishVerifiedProfileObjects: boolean;
  featuredRequiresOwnerApproval: boolean;
  qualityGateEnabled: boolean;
  antiSpamReviewRequired: boolean;
  maxFeaturedSlots: number;
  maxRecommendedSlots: number;
  rawContentAllowed: false;
  managementSource: "profile_and_admin_only";
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerDirectoryPromotionEntry = {
  id: string;
  kind: AdminMessengerDirectoryKind;
  targetId: string;
  title: string;
  username?: string;
  ownerUserId?: string;
  listingStatus: AdminMessengerDirectoryPromotionListingStatus;
  approvalStatus: "not_required" | "pending" | "approved" | "rejected" | string;
  visibility: "public" | "hidden" | "restricted" | string;
  qualityScore: number;
  safetyScore: number;
  promotionScore: number;
  featuredRank?: number;
  searchBoostPct: number;
  directoryBoostPct: number;
  recommended: boolean;
  memberCount?: number;
  impressions: number;
  opens: number;
  joins: number;
  botStarts: number;
  conversionPct: number;
  note?: string;
  rejectionReason?: string;
  traceHash: string;
  source: "directory" | "admin_manual" | string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerDirectoryPromotionSnapshot = {
  ok: true;
  centerVersion: string;
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  settings: AdminMessengerDirectoryPromotionSettings;
  summary: {
    totalEntries: number;
    publicEntries: number;
    pendingApproval: number;
    featuredEntries: number;
    boostedEntries: number;
    recommendedEntries: number;
    hiddenEntries: number;
    lowQualityEntries: number;
    groups: number;
    channels: number;
    bots: number;
    totalImpressions: number;
    totalConversions: number;
    conversionPct: number;
    status: string;
    directoryDatabaseConnected: boolean;
    rawContentIncluded: false;
  };
  entries: AdminMessengerDirectoryPromotionEntry[];
  charts: {
    byKind: Array<{ label: string; value: number; public: number }>;
    funnel: Array<{ label: string; value: number }>;
    quality: Array<{ label: string; value: number }>;
  };
  directoryRules: string[];
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: { directoryDatabaseConnected: boolean; entriesSyncedFromDirectory: number; noRawMessages: boolean; noPrivateMedia: boolean; noWalletData: boolean };
};


export type AdminMessengerModerationReport = {
  id: string;
  source: "user_report" | "ai_signal" | "admin_manual" | "system" | string;
  kind: "message" | "media" | "group" | "channel" | "bot" | "user" | "call" | "sticker" | "gift" | string;
  severity: "low" | "medium" | "high" | "critical" | string;
  status: "open" | "in_review" | "resolved" | "rejected" | string;
  title: string;
  description: string;
  targetType?: string;
  targetId?: string;
  reportedBy?: string;
  assignedTo?: string;
  resolutionNote?: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
};

export type AdminMessengerPremiumSettings = {
  aiTranslationEnabled: boolean;
  premiumStickersEnabled: boolean;
  gift3dPremiumEnabled: boolean;
  animatedEmojiEnabled: boolean;
  paidBotsEnabled: boolean;
  coinPaymentsRequired: boolean;
  adminReviewForPremiumAbuse: boolean;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerModerationDashboard = {
  generatedAt: string;
  summary: {
    openReports: number;
    inReviewReports: number;
    resolvedReports: number;
    criticalReports: number;
    premiumControlsEnabled: number;
  };
  premiumSettings: AdminMessengerPremiumSettings;
  recentReports: AdminMessengerModerationReport[];
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
  | "other_critical_safety"
  | string;

export type AdminMessengerSafetyCaseStatus =
  | "intake"
  | "evidence_review"
  | "restriction_review"
  | "authority_review"
  | "awaiting_owner_decision"
  | "actioned"
  | "closed"
  | "rejected"
  | string;

export type AdminMessengerSafetyCaseDecision =
  | "preserve_only"
  | "restrict_target"
  | "release_target"
  | "prepare_authority_package"
  | "notify_authority"
  | "resolve_no_action"
  | "resolve_restricted"
  | "reject_report"
  | string;

export type AdminMessengerSafetyCaseReview = {
  id: string;
  title: string;
  status: AdminMessengerSafetyCaseStatus;
  category: AdminMessengerSafetyCategory;
  severity: "high" | "critical" | string;
  priority: "normal" | "urgent" | "critical" | string;
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
    status: "none" | "pending_owner_decision" | "active" | "released" | string;
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

export type AdminMessengerEvidenceType =
  | "message_reference"
  | "chat_reference"
  | "user_reference"
  | "target_reference"
  | "ai_signal_hash"
  | "external_hash"
  | "manual_reference"
  | "report_package_hash"
  | "system_reference"
  | string;

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

export type AdminMessengerSafetyReport = {
  id: string;
  source: "ai_signal" | "admin_manual" | "user_report" | "system" | string;
  category: AdminMessengerSafetyCategory;
  severity: "high" | "critical" | string;
  status: "new" | "under_review" | "target_restricted" | "evidence_preserved" | "authority_report_prepared" | "authority_notified" | "resolved" | "rejected" | string;
  title: string;
  description: string;
  targetType?: string;
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

export type AdminMessengerAuthorityDisclosureLog = {
  id: string;
  packageId: string;
  packageHash: string;
  deliveryStatus: "prepared" | "delivered" | "cancelled" | string;
  legalBasis: string;
  scope: string;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedEvidenceIds: string[];
  auditAnchorHash: string | null;
  note?: string;
  exportedBy: string;
  exportedAt: string;
};

export type AdminMessengerAuthorityRequest = {
  id: string;
  authorityName: string;
  requestReference?: string;
  requestKind?: "official_request" | "emergency_disclosure" | "court_order" | "security_service_review" | "follow_up" | string;
  authorityCountry?: string;
  authorityOfficerName?: string;
  authorityContactHash?: string;
  legalBasis: string;
  requestedScope: string;
  priority?: "normal" | "urgent" | "critical" | string;
  dueAt?: string;
  status: "received" | "under_review" | "approved" | "rejected" | "completed" | string;
  linkedReportIds?: string[];
  linkedCaseIds?: string[];
  linkedEvidenceIds?: string[];
  checklist?: {
    legalBasisProvided: boolean;
    scopeLimited: boolean;
    ownerApprovalRequired: boolean;
    ownerApproved: boolean;
    linkedCaseOrReport: boolean;
    linkedEvidence: boolean;
    rawContentHidden: boolean;
    auditAnchored: boolean;
  };
  disclosureLog?: AdminMessengerAuthorityDisclosureLog[];
  decisionNote?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  completedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyReportPackage = {
  ok: true;
  packageId: string;
  exportedAt: string;
  exportedBy: string;
  purpose: string;
  legalBasis: string;
  report: Partial<AdminMessengerSafetyReport> & { id: string };
  evidenceIndex: Array<{ type: string; value: string }>;
  linkedVaultEvidence?: AdminMessengerEvidenceVaultItem[];
  linkedCaseReviews?: AdminMessengerSafetyCaseReview[];
  linkedRestrictions?: AdminMessengerSafetyRestriction[];
  vaultIntegrity?: AdminMessengerEvidenceVaultIntegrity;
  cooperationRules: string[];
  auditIntegrity: AdminAuditIntegrityReport;
  auditAnchorHash: string | null;
  complianceNote: string;
};

export type AdminMessengerAiSafetySignal = {
  id: string;
  externalSignalId?: string;
  source: string;
  category: AdminMessengerSafetyCategory;
  severity: "high" | "critical" | string;
  confidence: number;
  status: "received" | "report_created" | "ignored" | string;
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
  | "target_safety_hold"
  | string;

export type AdminMessengerSafetyRestrictionStatus =
  | "pending_owner_decision"
  | "active"
  | "released"
  | "rejected"
  | "expired"
  | string;

export type AdminMessengerSafetyRestriction = {
  id: string;
  scope: AdminMessengerSafetyRestrictionScope;
  status: AdminMessengerSafetyRestrictionStatus;
  category: AdminMessengerSafetyCategory;
  severity: "high" | "critical" | string;
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
  checklist?: {
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


export type AdminMessengerSafetyEnforcementDecision = "allow" | "deny" | "hold_for_review" | string;
export type AdminMessengerSafetyEnforcementAction =
  | "send_message"
  | "edit_message"
  | "delete_message"
  | "forward_message"
  | "upload_media"
  | "view_message"
  | "join_group"
  | "post_group"
  | "join_channel"
  | "post_channel"
  | "start_bot"
  | "message_bot"
  | "any_messenger_action"
  | string;

export type AdminMessengerSafetyEnforcementRule = {
  id: string;
  restrictionId: string;
  enforcementRef: string;
  scope: AdminMessengerSafetyRestrictionScope;
  decision: AdminMessengerSafetyEnforcementDecision;
  actions: AdminMessengerSafetyEnforcementAction[];
  targetType: string;
  targetId: string;
  relatedUserId?: string;
  relatedChatId?: string;
  relatedMessageId?: string;
  category: AdminMessengerSafetyCategory;
  severity: "high" | "critical" | string;
  reason: string;
  legalBasis: string;
  activeFrom?: string;
  expiresAt?: string;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedAiSignalIds: string[];
  linkedEvidenceIds: string[];
  integrity?: {
    ownerApproved: boolean;
    evidenceLinked: boolean;
    auditLinked: boolean;
    rawContentHidden: true;
    userNotNotified: true;
  };
};

export type AdminMessengerSafetyEnforcementSnapshot = {
  ok: true;
  policyVersion: "messenger-safety-enforcement-v1" | string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    activeRules: number;
    denyRules: number;
    holdRules: number;
    userLocks: number;
    chatFreezes: number;
    messageHolds: number;
    groupRestrictions: number;
    channelRestrictions: number;
    botRestrictions: number;
    expiredIgnored: number;
  };
  rules: AdminMessengerSafetyEnforcementRule[];
  vaultIntegrity: AdminMessengerEvidenceVaultIntegrity;
  auditIntegrity: AdminAuditIntegrityReport;
  auditAnchorHash: string | null;
  integrationContract: {
    endpoint: string;
    requiredInputs: string[];
    responseRule: string;
    rawContentPolicy: string;
  };
  policy: string[];
};

export type AdminMessengerSafetyEnforcementCheckResult = {
  ok: true;
  allowed: boolean;
  decision: AdminMessengerSafetyEnforcementDecision;
  action: string;
  matchedRules: AdminMessengerSafetyEnforcementRule[];
  reason?: string;
  checkedAt: string;
  policyVersion: string;
  rawContentHidden: true;
  userNotNotified: true;
  guardEvent?: AdminMessengerSafetyGuardEvent;
};

export type AdminMessengerSafetyRuntimeBridgeLayer = "chat_room" | "groups" | "channels" | "bots" | "media" | "message_visibility" | "directory" | string;
export type AdminMessengerSafetyRuntimeBridgeMode = "enforce" | "audit_only" | string;

export type AdminMessengerSafetyRuntimeGuardedAction = {
  key: string;
  layer: AdminMessengerSafetyRuntimeBridgeLayer;
  messengerEvent: string;
  enforcementAction: AdminMessengerSafetyEnforcementAction;
  requiredIds: string[];
  enabled: boolean;
  decisionPolicy: string;
  rawContentPolicy: string;
};

export type AdminMessengerSafetyRuntimeBridgeSnapshot = {
  ok: true;
  bridgeVersion: "messenger-safety-runtime-bridge-v1" | string;
  generatedAt: string;
  generatedBy: string;
  mode: AdminMessengerSafetyRuntimeBridgeMode;
  summary: {
    guardedActions: number;
    enabledGuardedActions: number;
    activeRules: number;
    denyRules: number;
    holdRules: number;
    rawContentAllowed: false;
    messengerRuntimeReady: boolean;
  };
  guardedActions: AdminMessengerSafetyRuntimeGuardedAction[];
  enforcementSnapshot: AdminMessengerSafetyEnforcementSnapshot;
  runtimeContract: {
    checkEndpoint: string;
    snapshotEndpoint: string;
    method: string;
    authentication: string;
    inputPolicy: string;
    rawContentPolicy: string;
    responsePolicy: string;
  };
  policy: string[];
};

export type AdminMessengerSafetyRuntimeBridgeCheckResult = {
  ok: true;
  allowed: boolean;
  mustBlock: boolean;
  mustHoldForReview: boolean;
  decision: AdminMessengerSafetyEnforcementDecision;
  runtimeAction: string;
  enforcementAction: string;
  matchedRules: AdminMessengerSafetyEnforcementRule[];
  messengerInstruction: "continue" | "block_action" | "hold_for_safety_review" | string;
  checkedAt: string;
  bridgeVersion: string;
  rawContentHidden: true;
  userNotNotified: true;
  requiredClientBehavior: string[];
};


export type AdminMessengerSafetyClientGuardPlatform = "mobile" | "web" | "backend" | "socket_gateway" | string;

export type AdminMessengerSafetyClientGuard = {
  key: string;
  platform: AdminMessengerSafetyClientGuardPlatform;
  layer: AdminMessengerSafetyRuntimeBridgeLayer;
  runtimeAction: string;
  enforcementAction: AdminMessengerSafetyEnforcementAction;
  guardFunction: string;
  beforeEvent: string;
  requiredIds: string[];
  optionalIds: string[];
  bridgeEndpoint: string;
  enabled: boolean;
  successBehavior: string;
  denyBehavior: string;
  holdBehavior: string;
  userMessageKey: string;
  rawContentPolicy: string;
  auditPolicy: string;
};

export type AdminMessengerSafetyClientGuardsSnapshot = {
  ok: true;
  guardVersion: "messenger-safety-client-guards-v1" | string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalGuards: number;
    enabledGuards: number;
    mobileGuards: number;
    webGuards: number;
    backendGuards: number;
    socketGatewayGuards: number;
    activeRuntimeRules: number;
    rawContentAllowed: false;
    messengerClientReady: boolean;
  };
  guards: AdminMessengerSafetyClientGuard[];
  runtimeBridge: AdminMessengerSafetyRuntimeBridgeSnapshot;
  implementationContract: {
    bridgeEndpoint: string;
    method: string;
    mustRunBefore: string[];
    inputPolicy: string;
    rawContentPolicy: string;
    responsePolicy: string;
    suggestedMobileAdapter: string;
    suggestedSocketGatewayGuard: string;
  };
  adapterTemplate: string[];
  policy: string[];
};

export type AdminMessengerSafetyClientGuardValidationResult = {
  ok: true;
  guardFound: boolean;
  ready: boolean;
  guard?: AdminMessengerSafetyClientGuard;
  missingIds: string[];
  runtimeCheck: AdminMessengerSafetyRuntimeBridgeCheckResult;
  validationAt: string;
  guardVersion: string;
  rawContentHidden: true;
  requiredClientBehavior: string[];
  guardEvent?: AdminMessengerSafetyGuardEvent;
};

export type AdminMessengerSafetyGuardEvent = {
  id: string;
  source: "enforcement_check" | "runtime_bridge_check" | "client_guard_validate" | "socket_gateway_guard" | "manual_probe" | string;
  platform?: string;
  guardKey?: string;
  runtimeAction?: string;
  enforcementAction?: string;
  decision: AdminMessengerSafetyEnforcementDecision;
  messengerInstruction?: string;
  allowed: boolean;
  ready?: boolean;
  guardFound?: boolean;
  missingIds: string[];
  actorUserId?: string;
  userId?: string;
  peerUserId?: string;
  chatId?: string;
  conversationId?: string;
  messageId?: string;
  clientMessageId?: string;
  groupId?: string;
  channelId?: string;
  botId?: string;
  targetType?: string;
  targetId?: string;
  requestId?: string;
  runtimeSource?: string;
  matchedRuleIds: string[];
  matchedRestrictionIds: string[];
  rawContentPresent: boolean;
  rawContentHidden: true;
  userNotNotified: true;
  previousTraceHash?: string | null;
  traceHash: string;
  traceVersion: string;
  metadata?: Record<string, unknown>;
  checkedBy: string;
  checkedAt: string;
};

export type AdminMessengerSafetyGuardEventSnapshot = {
  ok: true;
  eventLogVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalEvents: number;
    denyEvents: number;
    holdEvents: number;
    allowEvents: number;
    rawContentHeldEvents: number;
    clientGuardNotReadyEvents: number;
    uniqueUsers: number;
    uniqueChats: number;
    uniqueMessages: number;
    chainAnchorHash: string | null;
  };
  events: AdminMessengerSafetyGuardEvent[];
  integrity: {
    total: number;
    chainVersion: string;
    anchorHash: string | null;
    brokenAtId?: string;
    ok: boolean;
  };
  policy: string[];
};

export type AdminMessengerSafetyIntegrityScope = "evidence_vault" | "guard_event_log" | "restrictions" | "case_reviews" | "authority_requests" | "enforcement_rules" | "audit_log" | string;

export type AdminMessengerSafetyIntegrityFinding = {
  id: string;
  scope: AdminMessengerSafetyIntegrityScope;
  severity: "info" | "warning" | "critical" | string;
  status: "open" | "ok" | string;
  title: string;
  description: string;
  targetType?: string;
  targetId?: string;
  linkedReportIds?: string[];
  linkedCaseIds?: string[];
  linkedEvidenceIds?: string[];
  linkedRestrictionIds?: string[];
  linkedAuthorityRequestIds?: string[];
  remediation: string;
  detectedAt: string;
};

export type AdminMessengerSafetyIntegrityMonitorSnapshot = {
  ok: true;
  monitorVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    status: "ok" | "warning" | "critical" | string;
    totalFindings: number;
    criticalFindings: number;
    warningFindings: number;
    vaultBrokenLinks: number;
    guardEventChainOk: boolean;
    auditChainOk: boolean;
    activeRestrictions: number;
    activeRestrictionsWithoutEnforcementRef: number;
    unsealedLegalHoldEvidence: number;
    missingEvidenceLinks: number;
    authorityRequestsWithoutOwnerApproval: number;
    orphanCaseLinks: number;
    chainAnchorHash: string | null;
  };
  checks: Array<{ key: string; status: "ok" | "warning" | "critical" | string; scope: AdminMessengerSafetyIntegrityScope; message: string }>;
  findings: AdminMessengerSafetyIntegrityFinding[];
  anchors: { evidenceVaultAnchorHash: string | null; guardEventAnchorHash: string | null; auditAnchorHash: string | null; monitorHash: string };
  policy: string[];
};

export type AdminMessengerSafetyEscalationStatus = "open" | "acknowledged" | "compliance_review" | "owner_review" | "authority_pending" | "actioned" | "closed" | "rejected" | string;
export type AdminMessengerSafetyEscalationSource = "critical_report" | "critical_case" | "integrity_finding" | "authority_due" | "pending_restriction" | "guard_deny_spike" | "manual" | string;

export type AdminMessengerSafetyEscalationItem = {
  id: string;
  source: AdminMessengerSafetyEscalationSource;
  sourceKey: string;
  title: string;
  reason: string;
  status: AdminMessengerSafetyEscalationStatus;
  priority: "normal" | "urgent" | "critical" | string;
  severity: "high" | "critical" | string;
  category?: AdminMessengerSafetyCategory;
  targetType?: string;
  targetId?: string;
  relatedUserId?: string;
  relatedChatId?: string;
  relatedMessageId?: string;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedAiSignalIds: string[];
  linkedEvidenceIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedIntegrityFindingIds: string[];
  slaMinutes: number;
  dueAt: string;
  overdue: boolean;
  ownerRequired: boolean;
  complianceRequired: boolean;
  authorityCooperationRequired: boolean;
  rawContentHidden: true;
  userNotNotified: true;
  assignedTo?: string;
  decisionNote?: string;
  timeline: Array<{ event: string; by: string; at: string; note?: string; metadata?: Record<string, unknown> }>;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyEscalationSnapshot = {
  ok: true;
  escalationVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalEscalations: number;
    openEscalations: number;
    criticalEscalations: number;
    overdueEscalations: number;
    ownerReviewRequired: number;
    complianceReviewRequired: number;
    authorityPending: number;
    actionedEscalations: number;
    closedEscalations: number;
    nextDueAt: string | null;
  };
  escalations: AdminMessengerSafetyEscalationItem[];
  policy: string[];
};



export type AdminMessengerSafetyRetentionRecordType = "safety_report" | "case_review" | "ai_signal" | "evidence_vault" | "restriction" | "authority_request" | "guard_event" | "escalation" | "compliance_report" | "audit_anchor" | string;

export type AdminMessengerSafetyLegalHold = {
  id: string;
  targetType: AdminMessengerSafetyRetentionRecordType;
  targetId: string;
  reason: string;
  legalBasis: string;
  status: "active" | "released" | string;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedEvidenceIds: string[];
  linkedAuthorityRequestIds: string[];
  rawContentHidden: true;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  releasedBy?: string;
  releasedAt?: string;
  releaseReason?: string;
};

export type AdminMessengerSafetyRetentionRule = {
  recordType: AdminMessengerSafetyRetentionRecordType;
  retentionDays: number;
  legalHoldSupported: boolean;
  archiveBeforeDelete: boolean;
  rootOwnerApprovalRequired: boolean;
  description: string;
};

export type AdminMessengerSafetyRetentionRecord = {
  id: string;
  recordType: AdminMessengerSafetyRetentionRecordType;
  sourceId: string;
  title: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  retentionDays: number;
  retentionUntil: string;
  daysRemaining: number;
  expired: boolean;
  nearExpiry: boolean;
  legalHold: boolean;
  sealed: boolean;
  purgeEligible: boolean;
  purgeBlockedReason?: string;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedEvidenceIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedRestrictionIds: string[];
  linkedEscalationIds: string[];
  anchorHash?: string | null;
  rawContentIncluded: false;
};

export type AdminMessengerSafetyRetentionSnapshot = {
  ok: true;
  retentionVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalRecords: number;
    legalHoldRecords: number;
    activeLegalHolds: number;
    releasedLegalHolds: number;
    expiredCandidates: number;
    purgeEligibleRecords: number;
    purgeBlockedRecords: number;
    nearExpiryRecords: number;
    sealedLegalHoldEvidence: number;
    unsealedLegalHoldEvidence: number;
    longestRetentionDays: number;
    rawContentIncluded: false;
  };
  rules: AdminMessengerSafetyRetentionRule[];
  legalHolds: AdminMessengerSafetyLegalHold[];
  records: AdminMessengerSafetyRetentionRecord[];
  recommendations: Array<{ key: string; severity: "ok" | "warning" | "critical" | string; message: string; recordIds: string[] }>;
  auditAnchorHash: string | null;
  vaultAnchorHash: string | null;
  retentionHash: string;
  policy: string[];
};

export type AdminMessengerSafetyRetentionPackage = AdminMessengerSafetyRetentionSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};

export type AdminMessengerSafetyExportVerificationKind = "evidence_vault" | "safety_report_package" | "case_package" | "authority_package" | "restriction_package" | "enforcement_package" | "runtime_bridge_package" | "client_guards_package" | "guard_event_package" | "integrity_package" | "escalation_package" | "compliance_report_package" | "retention_package" | string;
export type AdminMessengerSafetyExportVerificationStatus = "verified" | "warning" | "failed" | string;

export type AdminMessengerSafetyExportVerificationReference = {
  key: string;
  packageKind: AdminMessengerSafetyExportVerificationKind;
  title: string;
  sourceId?: string;
  expectedPackageHash: string | null;
  auditAnchorHash: string | null;
  vaultAnchorHash: string | null;
  guardAnchorHash: string | null;
  retentionHash: string | null;
  recordCount: number;
  rawContentIncluded: false;
  ownerOnlyExport: true;
  note: string;
};

export type AdminMessengerSafetyExportVerificationLogItem = {
  id: string;
  packageKind: AdminMessengerSafetyExportVerificationKind;
  packageId?: string;
  sourceId?: string;
  submittedPackageHash?: string;
  expectedPackageHash?: string | null;
  submittedAuditAnchorHash?: string;
  submittedVaultAnchorHash?: string;
  submittedGuardAnchorHash?: string;
  submittedRetentionHash?: string;
  result: AdminMessengerSafetyExportVerificationStatus;
  matched: string[];
  mismatches: string[];
  missing: string[];
  rawContentIncluded: false;
  verifiedBy: string;
  verifiedAt: string;
  note?: string;
};

export type AdminMessengerSafetyExportVerificationSnapshot = {
  ok: true;
  verificationVersion: "messenger-safety-audit-export-verification-v1" | string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    references: number;
    recentVerifications: number;
    verified: number;
    warnings: number;
    failed: number;
    rawContentIncluded: false;
    auditAnchorHash: string | null;
    vaultAnchorHash: string | null;
    guardAnchorHash: string | null;
    retentionHash: string | null;
  };
  references: AdminMessengerSafetyExportVerificationReference[];
  recentVerifications: AdminMessengerSafetyExportVerificationLogItem[];
  policy: string[];
};

export type AdminMessengerSafetyExportVerificationPackage = AdminMessengerSafetyExportVerificationSnapshot & {
  packageId: string;
  packageHash: string;
  classification: "owner_security_export_verification" | string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};

export type AdminMessengerSafetyAccessControlScope = "dashboard" | "ai_signals" | "reports" | "case_reviews" | "evidence_vault" | "authority_requests" | "restrictions" | "enforcement" | "runtime_bridge" | "client_guards" | "guard_events" | "integrity_monitor" | "escalations" | "compliance_reports" | "retention_legal_hold" | "export_verification" | "raw_content" | string;
export type AdminMessengerSafetyAccessControlAction = "read" | "create" | "update" | "approve" | "seal" | "release" | "export" | "verify" | "runtime_check" | "delete" | string;
export type AdminMessengerSafetyAccessControlDecisionStatus = "allow" | "deny" | "owner_required" | string;

export type AdminMessengerSafetyAccessControlRule = {
  key: string;
  scope: AdminMessengerSafetyAccessControlScope;
  action: AdminMessengerSafetyAccessControlAction;
  title: string;
  allowedRoles: string[];
  requiredPermissions: string[];
  ownerOnly: boolean;
  sensitiveExport: boolean;
  rawContentAllowed: false;
  reason: string;
};

export type AdminMessengerSafetyAccessControlDecision = {
  id: string;
  role: string;
  adminId: string;
  rootOwner: boolean;
  scope: AdminMessengerSafetyAccessControlScope;
  action: AdminMessengerSafetyAccessControlAction;
  decision: AdminMessengerSafetyAccessControlDecisionStatus;
  allowed: boolean;
  ownerOnly: boolean;
  sensitiveExport: boolean;
  requiredPermissions: string[];
  missingPermissions: string[];
  matchedRuleKey?: string;
  reasons: string[];
  rawContentIncluded: false;
  checkedBy: string;
  checkedAt: string;
  previousTraceHash?: string | null;
  traceHash: string;
};

export type AdminMessengerSafetyAccessControlSnapshot = {
  ok: true;
  accessControlVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    rules: number;
    ownerOnlyRules: number;
    sensitiveExportRules: number;
    rawContentAllowedRules: number;
    recentChecks: number;
    deniedChecks: number;
    ownerRequiredChecks: number;
    auditAnchorHash: string | null;
    accessTraceAnchorHash: string | null;
    rawContentIncluded: false;
  };
  rules: AdminMessengerSafetyAccessControlRule[];
  recentChecks: AdminMessengerSafetyAccessControlDecision[];
  policy: string[];
};

export type AdminMessengerSafetyAccessControlPackage = AdminMessengerSafetyAccessControlSnapshot & {
  packageId: string;
  packageHash: string;
  classification: "owner_security_access_control" | string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};

export type AdminMessengerSafetyStaffAssignmentTargetType = "report" | "case_review" | "restriction" | "escalation" | "authority_request" | "evidence_vault" | "guard_event" | "integrity_finding" | "compliance_package" | string;
export type AdminMessengerSafetyStaffAssignmentStatus = "open" | "in_progress" | "waiting_owner" | "completed" | "reassigned" | "cancelled" | string;
export type AdminMessengerSafetyStaffAssignmentPriority = "normal" | "urgent" | "critical" | string;

export type AdminMessengerSafetyStaffAssignment = {
  id: string;
  targetType: AdminMessengerSafetyStaffAssignmentTargetType;
  targetId: string;
  title: string;
  priority: AdminMessengerSafetyStaffAssignmentPriority;
  status: AdminMessengerSafetyStaffAssignmentStatus;
  assignedToAdminId: string;
  assignedRole: string;
  assignedBy: string;
  assignedAt: string;
  dueAt?: string;
  ownerDecisionRequired: boolean;
  complianceReviewRequired: boolean;
  authorityCooperationRequired: boolean;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedRestrictionIds: string[];
  linkedEscalationIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  requiredAccessScopes: string[];
  accessDecisionIds: string[];
  rawContentIncluded: false;
  checklist: Record<string, boolean>;
  timeline: Array<{ event: string; by: string; at: string; note?: string; metadata?: Record<string, unknown> }>;
  note?: string;
  completedBy?: string;
  completedAt?: string;
  completionNote?: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  previousTraceHash?: string | null;
  traceHash: string;
};

export type AdminMessengerSafetyStaffAssignmentSnapshot = {
  ok: true;
  assignmentVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalAssignments: number;
    openAssignments: number;
    inProgressAssignments: number;
    waitingOwnerAssignments: number;
    completedAssignments: number;
    overdueAssignments: number;
    criticalAssignments: number;
    ownerDecisionRequiredAssignments: number;
    complianceRequiredAssignments: number;
    authorityRequiredAssignments: number;
    auditAnchorHash: string | null;
    assignmentTraceAnchorHash: string | null;
    rawContentIncluded: false;
  };
  assignments: AdminMessengerSafetyStaffAssignment[];
  policy: string[];
};

export type AdminMessengerSafetyStaffAssignmentPackage = AdminMessengerSafetyStaffAssignmentSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};

export type AdminMessengerSafetySupervisorAttentionKind = "critical_report" | "critical_case" | "active_restriction" | "pending_restriction" | "authority_due" | "integrity_finding" | "overdue_escalation" | "overdue_assignment" | "owner_decision" | "export_verification_failed" | "guard_deny" | "legal_hold_unsealed" | string;

export type AdminMessengerSafetySupervisorAttentionItem = {
  id: string;
  kind: AdminMessengerSafetySupervisorAttentionKind;
  priority: "normal" | "urgent" | "critical" | string;
  title: string;
  reason: string;
  status?: string;
  targetType?: string;
  targetId?: string;
  relatedUserId?: string;
  relatedChatId?: string;
  relatedMessageId?: string;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedRestrictionIds: string[];
  linkedEscalationIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  linkedAssignmentIds: string[];
  dueAt?: string;
  overdue: boolean;
  ownerRequired: boolean;
  complianceRequired: boolean;
  authorityRequired: boolean;
  rawContentIncluded: false;
  createdAt: string;
};

export type AdminMessengerSafetySupervisorWorkloadItem = {
  adminId: string;
  role: string;
  openAssignments: number;
  criticalAssignments: number;
  overdueAssignments: number;
  waitingOwnerAssignments: number;
  authorityAssignments: number;
  complianceAssignments: number;
  dueSoonAssignments: number;
  targetRefs: string[];
};

export type AdminMessengerSafetySupervisorExportReadiness = {
  key: string;
  title: string;
  status: "ready" | "warning" | "blocked" | string;
  reason: string;
  packageKind: string;
  packageHash?: string | null;
  anchorHash?: string | null;
  records: number;
  ownerOnly: boolean;
  rawContentIncluded: false;
};

export type AdminMessengerSafetySupervisorDashboardSnapshot = {
  ok: true;
  supervisorVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalAttentionItems: number;
    criticalAttentionItems: number;
    urgentAttentionItems: number;
    overdueAttentionItems: number;
    ownerDecisionItems: number;
    complianceReviewItems: number;
    authorityCooperationItems: number;
    openReports: number;
    openCases: number;
    activeRestrictions: number;
    pendingRestrictions: number;
    openEscalations: number;
    overdueEscalations: number;
    openAssignments: number;
    overdueAssignments: number;
    staffWithOpenWork: number;
    blockedExports: number;
    warningExports: number;
    readyExports: number;
    integrityStatus: string;
    auditAnchorHash: string | null;
    evidenceVaultAnchorHash: string | null;
    guardEventAnchorHash: string | null;
    rawContentIncluded: false;
  };
  attentionItems: AdminMessengerSafetySupervisorAttentionItem[];
  ownerDecisionQueue: AdminMessengerSafetySupervisorAttentionItem[];
  workload: AdminMessengerSafetySupervisorWorkloadItem[];
  exportReadiness: AdminMessengerSafetySupervisorExportReadiness[];
  policy: string[];
};

export type AdminMessengerSafetySupervisorDashboardPackage = AdminMessengerSafetySupervisorDashboardSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};


export type AdminMessengerSafetyDailyOperationsPriority = "normal" | "urgent" | "critical" | string;
export type AdminMessengerSafetyDailyOperationsStatus = "ready" | "owner_required" | "compliance_required" | "authority_required" | "blocked" | string;

export type AdminMessengerSafetyDailyOperationsQueueItem = {
  id: string;
  source: string;
  title: string;
  priority: AdminMessengerSafetyDailyOperationsPriority;
  status: AdminMessengerSafetyDailyOperationsStatus;
  reason: string;
  targetType?: string;
  targetId?: string;
  relatedUserId?: string;
  relatedChatId?: string;
  relatedMessageId?: string;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedRestrictionIds: string[];
  linkedEscalationIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  linkedAssignmentIds: string[];
  dueAt?: string;
  overdue: boolean;
  ownerRequired: boolean;
  complianceRequired: boolean;
  authorityRequired: boolean;
  rawContentIncluded: false;
  createdAt: string;
};

export type AdminMessengerSafetyDailyOperationsAction = {
  key: string;
  title: string;
  priority: AdminMessengerSafetyDailyOperationsPriority;
  status: AdminMessengerSafetyDailyOperationsStatus;
  reason: string;
  ownerOnly: boolean;
  exportReady: boolean;
  linkedQueueItemIds: string[];
  rawContentIncluded: false;
};

export type AdminMessengerSafetyDailyOperationsSnapshot = {
  ok: true;
  dailyOperationsVersion: string;
  generatedAt: string;
  generatedBy: string;
  dayWindow: {
    startAt: string;
    endAt: string;
    timezone: string;
  };
  summary: {
    totalQueueItems: number;
    criticalQueueItems: number;
    urgentQueueItems: number;
    overdueQueueItems: number;
    dueTodayQueueItems: number;
    ownerRequiredQueueItems: number;
    complianceRequiredQueueItems: number;
    authorityRequiredQueueItems: number;
    unresolvedReports: number;
    unresolvedCases: number;
    activeRestrictions: number;
    pendingRestrictions: number;
    openAssignments: number;
    overdueAssignments: number;
    failedExportVerifications: number;
    blockedExports: number;
    integrityStatus: string;
    readyActions: number;
    blockedActions: number;
    auditAnchorHash: string | null;
    operationsHash: string;
    rawContentIncluded: false;
  };
  queue: AdminMessengerSafetyDailyOperationsQueueItem[];
  actionPlan: AdminMessengerSafetyDailyOperationsAction[];
  staffFollowUp: AdminMessengerSafetySupervisorWorkloadItem[];
  exportReadiness: AdminMessengerSafetySupervisorExportReadiness[];
  policy: string[];
};

export type AdminMessengerSafetyDailyOperationsPackage = AdminMessengerSafetyDailyOperationsSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};


export type AdminMessengerSafetyPrelaunchGateStatus = "passed" | "warning" | "blocked" | string;

export type AdminMessengerSafetyPrelaunchGateCheck = {
  key: string;
  title: string;
  status: AdminMessengerSafetyPrelaunchGateStatus;
  blocking: boolean;
  ownerOnly: boolean;
  reason: string;
  requiredBeforeLaunch: boolean;
  linkedMetricKeys: string[];
  linkedQueueItemIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  rawContentIncluded: false;
};

export type AdminMessengerSafetyPrelaunchReadinessGateSnapshot = {
  ok: true;
  prelaunchGateVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    launchStatus: AdminMessengerSafetyPrelaunchGateStatus;
    launchBlocked: boolean;
    blockingChecks: number;
    warningChecks: number;
    passedChecks: number;
    totalChecks: number;
    criticalReports: number;
    unresolvedCases: number;
    activeRestrictions: number;
    pendingRestrictions: number;
    overdueSlaItems: number;
    pendingAuthorityRequests: number;
    dueAuthorityRequests: number;
    criticalIntegrityFindings: number;
    warningIntegrityFindings: number;
    failedExportVerifications: number;
    blockedExports: number;
    unsealedLegalHoldEvidence: number;
    openStaffAssignments: number;
    overdueStaffAssignments: number;
    runtimeBridgeReady: boolean;
    clientGuardsReady: boolean;
    accessControlReady: boolean;
    retentionReady: boolean;
    exportVerificationReady: boolean;
    dailyOperationsReady: boolean;
    supervisorDashboardReady: boolean;
    auditAnchorHash: string | null;
    evidenceVaultAnchorHash: string | null;
    guardEventAnchorHash: string | null;
    retentionHash: string | null;
    gateHash: string;
    rawContentIncluded: false;
  };
  checks: AdminMessengerSafetyPrelaunchGateCheck[];
  blockers: AdminMessengerSafetyPrelaunchGateCheck[];
  warnings: AdminMessengerSafetyPrelaunchGateCheck[];
  launchChecklist: string[];
  policy: string[];
};

export type AdminMessengerSafetyPrelaunchReadinessGatePackage = AdminMessengerSafetyPrelaunchReadinessGateSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};

export type AdminMessengerSafetyLaunchCommandStatus = "ready" | "hold" | "blocked" | string;
export type AdminMessengerSafetyLaunchCommandItemStatus = "ready" | "owner_required" | "blocked" | string;

export type AdminMessengerSafetyLaunchCommandItem = {
  key: string;
  title: string;
  source: string;
  status: AdminMessengerSafetyLaunchCommandItemStatus;
  blocking: boolean;
  ownerOnly: boolean;
  requiredBeforePublication: boolean;
  reason: string;
  linkedCheckKeys: string[];
  linkedQueueItemIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  rawContentIncluded: false;
};

export type AdminMessengerSafetyLaunchCommandSnapshot = {
  ok: true;
  launchCommandVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    commandStatus: AdminMessengerSafetyLaunchCommandStatus;
    canLaunch: boolean;
    mustHold: boolean;
    launchBlocked: boolean;
    readyCommands: number;
    ownerRequiredCommands: number;
    blockedCommands: number;
    totalCommands: number;
    prelaunchGateStatus: AdminMessengerSafetyPrelaunchGateStatus;
    prelaunchBlockingChecks: number;
    prelaunchWarningChecks: number;
    dailyOverdueItems: number;
    dailyBlockedActions: number;
    supervisorCriticalItems: number;
    supervisorBlockedExports: number;
    failedExportVerifications: number;
    activeRestrictions: number;
    pendingRestrictions: number;
    authorityDueItems: number;
    auditAnchorHash: string | null;
    gateHash: string;
    commandHash: string;
    rawContentIncluded: false;
  };
  commandItems: AdminMessengerSafetyLaunchCommandItem[];
  readyItems: AdminMessengerSafetyLaunchCommandItem[];
  ownerRequiredItems: AdminMessengerSafetyLaunchCommandItem[];
  blockedItems: AdminMessengerSafetyLaunchCommandItem[];
  finalOwnerCommandChecklist: string[];
  policy: string[];
};

export type AdminMessengerSafetyLaunchCommandPackage = AdminMessengerSafetyLaunchCommandSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};


export type AdminMessengerSafetyComplianceReportScope = "full_messenger_safety" | "report" | "case" | "authority_request" | "restriction" | "escalation" | "integrity_review" | string;

export type AdminMessengerSafetyComplianceReportTemplate = {
  key: AdminMessengerSafetyComplianceReportScope;
  title: string;
  description: string;
  ownerOnlyExport: boolean;
  rawContentIncluded: false;
  requiredSections: string[];
};

export type AdminMessengerSafetyComplianceReportSection = {
  key: string;
  title: string;
  status: "ready" | "warning" | "missing" | string;
  recordCount: number;
  linkedIds: string[];
  anchorHash?: string | null;
  note: string;
};

export type AdminMessengerSafetyIncidentResponseStatus = "opened" | "triage" | "containment" | "evidence_review" | "authority_coordination" | "resolved" | "closed" | "rejected" | string;
export type AdminMessengerSafetyIncidentResponseSeverity = "medium" | "high" | "critical" | string;

export type AdminMessengerSafetyIncidentResponse = {
  id: string;
  source: string;
  sourceKey: string;
  title: string;
  severity: AdminMessengerSafetyIncidentResponseSeverity;
  status: AdminMessengerSafetyIncidentResponseStatus;
  priority: "normal" | "urgent" | "critical" | string;
  targetType?: string;
  targetId?: string;
  userId?: string;
  chatId?: string;
  messageId?: string;
  reason: string;
  containmentRequired: boolean;
  ownerDecisionRequired: boolean;
  complianceReviewRequired: boolean;
  authorityCooperationRequired: boolean;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  linkedGuardEventIds: string[];
  linkedEscalationIds: string[];
  linkedExportVerificationIds: string[];
  checklist: Record<string, boolean>;
  timeline: Array<{ at: string; by: string; action: string; status: string; note?: string }>;
  incidentHash: string;
  previousTraceHash: string | null;
  traceHash: string;
  rawContentIncluded: false;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyIncidentResponseSnapshot = {
  ok: true;
  incidentResponseVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalIncidents: number;
    openIncidents: number;
    criticalIncidents: number;
    containmentRequired: number;
    ownerDecisionRequired: number;
    complianceReviewRequired: number;
    authorityCooperationRequired: number;
    postLaunchCriticalItems: number;
    guardLinkedIncidents: number;
    evidenceLinkedIncidents: number;
    unresolvedIncidents: number;
    incidentHash: string;
    auditAnchorHash: string | null;
    rawContentIncluded: false;
  };
  incidents: AdminMessengerSafetyIncidentResponse[];
  openQueue: AdminMessengerSafetyIncidentResponse[];
  criticalQueue: AdminMessengerSafetyIncidentResponse[];
  containmentQueue: AdminMessengerSafetyIncidentResponse[];
  ownerDecisionQueue: AdminMessengerSafetyIncidentResponse[];
  responseChecklist: string[];
  policy: string[];
};

export type AdminMessengerSafetyIncidentResponsePackage = AdminMessengerSafetyIncidentResponseSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};


export type AdminMessengerSafetyEmergencyActionStatus = "draft" | "activated" | "containment" | "authority_coordination" | "resolved" | "released" | "rejected" | string;
export type AdminMessengerSafetyEmergencyActionScope = "user_emergency_hold" | "chat_emergency_freeze" | "message_visibility_hold" | "group_channel_bot_hold" | "authority_emergency_package" | "platform_safety_hold" | string;

export type AdminMessengerSafetyEmergencyAction = {
  id: string;
  source: string;
  sourceId?: string;
  title: string;
  severity: "high" | "critical" | string;
  status: AdminMessengerSafetyEmergencyActionStatus;
  scope: AdminMessengerSafetyEmergencyActionScope;
  targetType?: string;
  targetId?: string;
  userId?: string;
  chatId?: string;
  messageId?: string;
  reason: string;
  legalBasis: string;
  ownerApprovalRequired: boolean;
  ownerApprovedBy?: string;
  ownerApprovedAt?: string;
  complianceReviewRequired: boolean;
  authorityCooperationRequired: boolean;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedIncidentIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  linkedGuardEventIds: string[];
  linkedEscalationIds: string[];
  linkedExportVerificationIds: string[];
  checklist: Record<string, boolean>;
  timeline: Array<{ at: string; by: string; action: string; status: string; note?: string }>;
  emergencyHash: string;
  previousTraceHash: string | null;
  traceHash: string;
  rawContentIncluded: false;
  userNotNotified: true;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyEmergencyActionSnapshot = {
  ok: true;
  emergencyActionVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalActions: number;
    activeActions: number;
    criticalActions: number;
    ownerApprovalRequired: number;
    authorityCoordinationRequired: number;
    incidentLinkedActions: number;
    restrictionLinkedActions: number;
    unresolvedActions: number;
    emergencyHash: string;
    auditAnchorHash: string | null;
    rawContentIncluded: false;
  };
  actions: AdminMessengerSafetyEmergencyAction[];
  activeQueue: AdminMessengerSafetyEmergencyAction[];
  criticalQueue: AdminMessengerSafetyEmergencyAction[];
  ownerApprovalQueue: AdminMessengerSafetyEmergencyAction[];
  authorityQueue: AdminMessengerSafetyEmergencyAction[];
  emergencyChecklist: string[];
  policy: string[];
};

export type AdminMessengerSafetyEmergencyActionPackage = AdminMessengerSafetyEmergencyActionSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};

export type AdminMessengerSafetyRecoveryReviewStatus = "opened" | "recovery_planning" | "evidence_validation" | "restriction_release_review" | "authority_follow_up" | "lessons_learned" | "completed" | "closed" | "rejected" | string;
export type AdminMessengerSafetyReleaseReadiness = "not_ready" | "pending_review" | "ready_to_release" | "keep_restricted" | string;

export type AdminMessengerSafetyRecoveryReview = {
  id: string;
  source: string;
  sourceId?: string;
  title: string;
  severity: "medium" | "high" | "critical" | string;
  status: AdminMessengerSafetyRecoveryReviewStatus;
  targetType?: string;
  targetId?: string;
  userId?: string;
  chatId?: string;
  messageId?: string;
  recoveryPlan: string;
  rootCause?: string;
  lessonsLearned?: string;
  releaseReadiness: AdminMessengerSafetyReleaseReadiness;
  ownerDecisionRequired: boolean;
  complianceReviewRequired: boolean;
  authorityFollowUpRequired: boolean;
  restrictionReleaseReviewRequired: boolean;
  linkedEmergencyActionIds: string[];
  linkedIncidentIds: string[];
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  linkedGuardEventIds: string[];
  linkedEscalationIds: string[];
  linkedExportVerificationIds: string[];
  checklist: Record<string, boolean>;
  recoveryHash: string;
  traceHash: string;
  rawContentIncluded: false;
  userNotNotified: true;
  createdAt: string;
  updatedAt: string;
};

export type AdminMessengerSafetyRecoveryReviewSnapshot = {
  ok: true;
  recoveryReviewVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalReviews: number;
    openReviews: number;
    criticalReviews: number;
    completedReviews: number;
    ownerDecisionRequired: number;
    complianceReviewRequired: number;
    authorityFollowUpRequired: number;
    restrictionReleaseReviews: number;
    emergencyLinkedReviews: number;
    evidenceLinkedReviews: number;
    exportVerifiedReviews: number;
    recoveryHash: string;
    auditAnchorHash: string | null;
    rawContentIncluded: false;
  };
  reviews: AdminMessengerSafetyRecoveryReview[];
  openQueue: AdminMessengerSafetyRecoveryReview[];
  ownerDecisionQueue: AdminMessengerSafetyRecoveryReview[];
  authorityFollowUpQueue: AdminMessengerSafetyRecoveryReview[];
  restrictionReleaseQueue: AdminMessengerSafetyRecoveryReview[];
  afterActionChecklist: string[];
  policy: string[];
};

export type AdminMessengerSafetyRecoveryReviewPackage = AdminMessengerSafetyRecoveryReviewSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
};


export type AdminMessengerSafetyPolicyFeedbackStatus = "proposed" | "triage" | "owner_review" | "approved" | "implemented" | "closed" | "rejected" | string;
export type AdminMessengerSafetyPolicyFeedbackPriority = "normal" | "urgent" | "critical" | string;
export type AdminMessengerSafetyPolicyFeedbackSource = "manual" | "after_action_review" | "incident_response" | "emergency_action" | "integrity_monitor" | "staff_assignment" | "authority_request" | string;
export type AdminMessengerSafetyPolicyFeedbackArea = "ai_detection" | "messenger_runtime_guards" | "evidence_vault" | "authority_cooperation" | "restrictions" | "staff_training" | "incident_response" | "retention_legal_hold" | "export_verification" | "access_control" | "other" | string;

export type AdminMessengerSafetyPolicyFeedbackItem = {
  id: string;
  source: AdminMessengerSafetyPolicyFeedbackSource;
  sourceId?: string;
  title: string;
  policyArea: AdminMessengerSafetyPolicyFeedbackArea;
  priority: AdminMessengerSafetyPolicyFeedbackPriority;
  status: AdminMessengerSafetyPolicyFeedbackStatus;
  targetSystem: string;
  recommendation: string;
  rationale?: string;
  ownerDecisionRequired: boolean;
  complianceReviewRequired: boolean;
  trainingRequired: boolean;
  implementationRequired: boolean;
  linkedRecoveryReviewIds: string[];
  linkedIncidentIds: string[];
  linkedEmergencyActionIds: string[];
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  linkedGuardEventIds: string[];
  linkedEscalationIds: string[];
  linkedExportVerificationIds: string[];
  checklist: Record<string, boolean>;
  timeline: Array<{ at: string; by: string; action: string; status: string; note?: string }>;
  feedbackHash: string;
  previousTraceHash: string | null;
  traceHash: string;
  rawContentIncluded: false;
  userNotNotified: true;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyPolicyFeedbackSnapshot = {
  ok: true;
  feedbackVersion: "messenger-safety-policy-feedback-v1";
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalFeedbackItems: number;
    openFeedbackItems: number;
    criticalFeedbackItems: number;
    ownerReviewItems: number;
    approvedItems: number;
    implementedItems: number;
    trainingRequiredItems: number;
    implementationRequiredItems: number;
    afterActionLinkedItems: number;
    incidentLinkedItems: number;
    feedbackHash: string;
    auditAnchorHash: string | null;
    rawContentIncluded: false;
  };
  feedbackItems: AdminMessengerSafetyPolicyFeedbackItem[];
  openQueue: AdminMessengerSafetyPolicyFeedbackItem[];
  ownerReviewQueue: AdminMessengerSafetyPolicyFeedbackItem[];
  trainingQueue: AdminMessengerSafetyPolicyFeedbackItem[];
  implementationQueue: AdminMessengerSafetyPolicyFeedbackItem[];
  improvementChecklist: string[];
  policy: string[];
};

export type AdminMessengerSafetyPolicyFeedbackPackage = AdminMessengerSafetyPolicyFeedbackSnapshot & {
  packageId: string;
  packageHash: string;
  classification: "owner_security_policy_feedback_continuous_improvement_center";
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};

export type AdminMessengerSafetyPolicyRegistryStatus = "draft" | "owner_review" | "approved" | "active" | "superseded" | "archived" | "rejected" | string;
export type AdminMessengerSafetyPolicyRegistryArea = "ai_detection" | "messenger_runtime_guards" | "evidence_vault" | "authority_cooperation" | "restrictions" | "staff_training" | "incident_response" | "retention_legal_hold" | "export_verification" | "access_control" | "compliance_reporting" | "other" | string;

export type AdminMessengerSafetyPolicyRegistryItem = {
  id: string;
  versionKey: string;
  area: AdminMessengerSafetyPolicyRegistryArea;
  title: string;
  changeSummary: string;
  rationale: string;
  status: AdminMessengerSafetyPolicyRegistryStatus;
  sourceFeedbackIds: string[];
  linkedRecoveryReviewIds: string[];
  linkedIncidentIds: string[];
  linkedEmergencyActionIds: string[];
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  linkedGuardEventIds: string[];
  linkedEscalationIds: string[];
  linkedExportVerificationIds: string[];
  effectiveAt?: string;
  supersedesPolicyId?: string;
  ownerDecisionRequired: boolean;
  ownerApprovedBy?: string;
  ownerApprovedAt?: string;
  trainingRequired: boolean;
  runtimeGuardUpdateRequired: boolean;
  accessControlReviewRequired: boolean;
  checklist: Record<string, boolean>;
  timeline: Array<{ at: string; by: string; action: string; status: string; note?: string }>;
  policyHash: string;
  previousPolicyHash: string | null;
  traceHash: string;
  rawContentIncluded: false;
  userNotNotified: true;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyPolicyRegistrySnapshot = {
  ok: true;
  registryVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalPolicies: number;
    draftPolicies: number;
    ownerReviewPolicies: number;
    approvedPolicies: number;
    activePolicies: number;
    supersededPolicies: number;
    trainingRequiredPolicies: number;
    runtimeGuardUpdatePolicies: number;
    accessControlReviewPolicies: number;
    feedbackLinkedPolicies: number;
    registryHash: string;
    auditAnchorHash: string | null;
    rawContentIncluded: false;
  };
  policies: AdminMessengerSafetyPolicyRegistryItem[];
  activePolicies: AdminMessengerSafetyPolicyRegistryItem[];
  ownerReviewQueue: AdminMessengerSafetyPolicyRegistryItem[];
  draftQueue: AdminMessengerSafetyPolicyRegistryItem[];
  trainingQueue: AdminMessengerSafetyPolicyRegistryItem[];
  policy: string[];
  checklist: string[];
};

export type AdminMessengerSafetyPolicyRegistryPackage = AdminMessengerSafetyPolicyRegistrySnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};


export type AdminMessengerSafetyPolicyDeploymentStatus = "pending_owner_approval" | "approved" | "syncing" | "deployed" | "failed" | "rolled_back" | "superseded" | "archived" | "rejected" | string;
export type AdminMessengerSafetyPolicyDeploymentTarget = "runtime_bridge" | "client_guards" | "enforcement_engine" | "access_control_matrix" | "staff_training" | "compliance_exports" | "admin_only" | string;
export type AdminMessengerSafetyPolicyDeploymentMode = "manual_owner_controlled" | "scheduled" | "emergency" | string;

export type AdminMessengerSafetyPolicyDeploymentItem = {
  id: string;
  policyId: string;
  versionKey: string;
  policyArea: AdminMessengerSafetyPolicyRegistryArea;
  target: AdminMessengerSafetyPolicyDeploymentTarget;
  mode: AdminMessengerSafetyPolicyDeploymentMode;
  status: AdminMessengerSafetyPolicyDeploymentStatus;
  sourcePolicyHash: string;
  deploymentScope: string;
  plannedAt?: string;
  deployedAt?: string;
  failedAt?: string;
  rolledBackAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  rollbackOfDeploymentId?: string;
  linkedPolicyIds: string[];
  linkedFeedbackIds: string[];
  linkedRecoveryReviewIds: string[];
  linkedIncidentIds: string[];
  linkedEmergencyActionIds: string[];
  linkedEvidenceIds: string[];
  linkedGuardEventIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedExportVerificationIds: string[];
  runtimeGuardSyncRequired: boolean;
  clientGuardSyncRequired: boolean;
  enforcementSyncRequired: boolean;
  accessControlSyncRequired: boolean;
  staffTrainingRequired: boolean;
  checklist: Record<string, boolean>;
  timeline: Array<{ at: string; by: string; action: string; status: string; note?: string }>;
  deploymentHash: string;
  previousDeploymentHash: string | null;
  traceHash: string;
  rawContentIncluded: false;
  userNotNotified: true;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyPolicyDeploymentSnapshot = {
  ok: true;
  deploymentVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalDeployments: number;
    pendingOwnerApproval: number;
    approvedDeployments: number;
    syncingDeployments: number;
    deployedPolicies: number;
    failedDeployments: number;
    rollbackRequired: number;
    runtimeSyncRequired: number;
    clientGuardSyncRequired: number;
    accessControlSyncRequired: number;
    staffTrainingRequired: number;
    deploymentHash: string;
    auditAnchorHash: string | null;
    rawContentIncluded: false;
  };
  deployments: AdminMessengerSafetyPolicyDeploymentItem[];
  pendingQueue: AdminMessengerSafetyPolicyDeploymentItem[];
  syncQueue: AdminMessengerSafetyPolicyDeploymentItem[];
  deployedQueue: AdminMessengerSafetyPolicyDeploymentItem[];
  failedQueue: AdminMessengerSafetyPolicyDeploymentItem[];
  policy: string[];
  checklist: string[];
};

export type AdminMessengerSafetyPolicyDeploymentPackage = AdminMessengerSafetyPolicyDeploymentSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};

export type AdminMessengerSafetyPolicyTrainingStatus = "required" | "assigned" | "acknowledged" | "completed" | "waived" | "overdue" | string;
export type AdminMessengerSafetyPolicyTrainingRole = "root_owner" | "security" | "compliance" | "admin" | "developer" | string;

export type AdminMessengerSafetyPolicyTrainingAcknowledgementItem = {
  id: string;
  policyId: string;
  versionKey: string;
  policyArea: AdminMessengerSafetyPolicyRegistryArea;
  sourceDeploymentId: string;
  deploymentTarget: AdminMessengerSafetyPolicyDeploymentTarget;
  requiredRole: AdminMessengerSafetyPolicyTrainingRole;
  assignedToAdminId?: string;
  dueAt?: string;
  status: AdminMessengerSafetyPolicyTrainingStatus;
  acknowledgementRequired: true;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  acknowledgementNote?: string;
  completedBy?: string;
  completedAt?: string;
  waivedBy?: string;
  waivedAt?: string;
  waiverReason?: string;
  checklist: Record<string, boolean>;
  timeline: Array<{ at: string; by: string; action: string; status: string; note?: string }>;
  sourcePolicyHash: string;
  deploymentHash: string;
  trainingHash: string;
  previousTrainingHash: string | null;
  traceHash: string;
  rawContentIncluded: false;
  userNotNotified: true;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerSafetyPolicyTrainingSnapshot = {
  ok: true;
  trainingVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    totalTrainingTasks: number;
    requiredTasks: number;
    assignedTasks: number;
    acknowledgedTasks: number;
    completedTasks: number;
    waivedTasks: number;
    overdueTasks: number;
    dueSoonTasks: number;
    unassignedTasks: number;
    linkedDeployments: number;
    trainingHash: string;
    auditAnchorHash: string | null;
    rawContentIncluded: false;
  };
  tasks: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[];
  requiredQueue: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[];
  assignedQueue: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[];
  acknowledgedQueue: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[];
  completedQueue: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[];
  overdueQueue: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[];
  policy: string[];
  checklist: string[];
};

export type AdminMessengerSafetyPolicyTrainingPackage = AdminMessengerSafetyPolicyTrainingSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
};

export type AdminMessengerSafetyComplianceReportSnapshot = {
  ok: true;
  builderVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    templates: number;
    readySections: number;
    warningSections: number;
    missingSections: number;
    totalReports: number;
    totalCases: number;
    totalEvidence: number;
    sealedEvidence: number;
    totalRestrictions: number;
    activeRestrictions: number;
    totalAuthorityRequests: number;
    pendingAuthorityRequests: number;
    openEscalations: number;
    overdueEscalations: number;
    criticalIntegrityFindings: number;
    rawContentIncluded: false;
  };
  templates: AdminMessengerSafetyComplianceReportTemplate[];
  sections: AdminMessengerSafetyComplianceReportSection[];
  samplePackageHash: string;
  policy: string[];
};

export type AdminMessengerSafetyComplianceReportPackage = {
  ok: true;
  reportBuilderVersion: string;
  packageId: string;
  generatedAt: string;
  generatedBy: string;
  scope: AdminMessengerSafetyComplianceReportScope;
  scopeId?: string;
  title: string;
  classification: string;
  rawContentIncluded: false;
  userNotNotified: true;
  summary: Record<string, number>;
  sections: AdminMessengerSafetyComplianceReportSection[];
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedAiSignalIds: string[];
  linkedEvidenceIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEscalationIds: string[];
  reportHash: string;
  auditAnchorHash: string | null;
  policy: string[];
};


export type AdminMessengerSafetyPostLaunchMonitorStatus = "healthy" | "watch" | "critical" | string;
export type AdminMessengerSafetyPostLaunchWatchItemStatus = "clear" | "watch" | "critical" | string;

export type AdminMessengerSafetyPostLaunchWatchItem = {
  key: string;
  title: string;
  source: string;
  status: AdminMessengerSafetyPostLaunchWatchItemStatus;
  priority: string;
  requiresOwnerAttention: boolean;
  requiresComplianceReview: boolean;
  reason: string;
  linkedReportIds: string[];
  linkedCaseIds: string[];
  linkedRestrictionIds: string[];
  linkedAuthorityRequestIds: string[];
  linkedEvidenceIds: string[];
  linkedGuardEventIds: string[];
  rawContentIncluded: false;
};

export type AdminMessengerSafetyPostLaunchMonitorSnapshot = {
  ok: true;
  postLaunchMonitorVersion: string;
  generatedAt: string;
  generatedBy: string;
  summary: {
    monitorStatus: AdminMessengerSafetyPostLaunchMonitorStatus;
    launchCommandStatus: AdminMessengerSafetyLaunchCommandStatus;
    canLaunch: boolean;
    watchItems: number;
    criticalItems: number;
    ownerAttentionItems: number;
    complianceReviewItems: number;
    newCriticalReports: number;
    guardDenyEvents: number;
    guardHoldEvents: number;
    guardRawContentHeld: number;
    activeRestrictions: number;
    pendingRestrictions: number;
    authorityDueItems: number;
    integrityStatus: string;
    failedExportVerifications: number;
    overdueOperations: number;
    blockedExports: number;
    auditAnchorHash: string | null;
    commandHash: string;
    postLaunchHash: string;
    rawContentIncluded: false;
  };
  watchItems: AdminMessengerSafetyPostLaunchWatchItem[];
  criticalItems: AdminMessengerSafetyPostLaunchWatchItem[];
  ownerAttentionQueue: AdminMessengerSafetyPostLaunchWatchItem[];
  first72hChecklist: string[];
  policy: string[];
};

export type AdminMessengerSafetyPostLaunchMonitorPackage = AdminMessengerSafetyPostLaunchMonitorSnapshot & {
  packageId: string;
  packageHash: string;
  classification: string;
  exportedAt: string;
  exportedBy: string;
  rawContentIncluded: false;
  userNotNotified: true;
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
    pendingAuthorityRequests?: number;
    approvedAuthorityRequests?: number;
    completedAuthorityRequests?: number;
    rejectedAuthorityRequests?: number;
    authorityDisclosurePackages?: number;
    dueAuthorityRequests?: number;
    aiSignalsReceived: number;
    aiSignalsPending: number;
    aiSignalsConverted: number;
    vaultEvidenceItems: number;
    sealedVaultEvidenceItems: number;
    legalHoldVaultEvidenceItems: number;
    openReviewCases?: number;
    ownerPendingReviewCases?: number;
    activeRestrictionCases?: number;
    safetyRestrictions?: number;
    activeSafetyRestrictions?: number;
    pendingSafetyRestrictions?: number;
    releasedSafetyRestrictions?: number;
    expiredSafetyRestrictions?: number;
    activeEnforcementRules?: number;
    enforcementDenyRules?: number;
    enforcementHoldRules?: number;
    runtimeBridgeGuardedActions?: number;
    runtimeBridgeEnabledActions?: number;
    clientSafetyGuards?: number;
    mobileClientSafetyGuards?: number;
    socketGatewaySafetyGuards?: number;
    guardEventLogEntries?: number;
    guardEventDenyDecisions?: number;
    guardEventHoldDecisions?: number;
    guardEventRawContentHeld?: number;
    integrityCriticalFindings?: number;
    integrityWarningFindings?: number;
    integrityMissingEvidenceLinks?: number;
    integrityUnsealedLegalHoldEvidence?: number;
    safetyEscalations?: number;
    openSafetyEscalations?: number;
    overdueSafetyEscalations?: number;
    criticalSafetyEscalations?: number;
    ownerReviewSafetyEscalations?: number;
    complianceReportTemplates?: number;
    complianceReportSections?: number;
    retentionLegalHolds?: number;
    retentionExpiredCandidates?: number;
    retentionPurgeEligibleRecords?: number;
    exportVerificationChecks?: number;
    exportVerificationFailed?: number;
    exportVerificationWarnings?: number;
    accessControlRules?: number;
    accessControlOwnerOnlyRules?: number;
    accessControlDeniedChecks?: number;
    accessControlOwnerRequiredChecks?: number;
    safetyStaffAssignments?: number;
    openSafetyStaffAssignments?: number;
    overdueSafetyStaffAssignments?: number;
    ownerRequiredSafetyStaffAssignments?: number;
    supervisorAttentionItems?: number;
    supervisorCriticalItems?: number;
    supervisorBlockedExports?: number;
    dailyOperationsQueueItems?: number;
    dailyOperationsOverdueItems?: number;
    prelaunchGateStatus?: string;
    prelaunchGateBlocked?: number;
    prelaunchGateWarnings?: number;
    launchCommandStatus?: string;
    launchCommandBlocked?: number;
    launchCommandOwnerRequired?: number;
    postLaunchMonitorStatus?: string;
    postLaunchCriticalItems?: number;
    postLaunchWatchItems?: number;
    postLaunchOwnerAttentionItems?: number;
    incidentResponseOpenItems?: number;
    incidentResponseCriticalItems?: number;
    incidentResponseContainmentItems?: number;
    policyFeedbackOpenItems?: number;
    policyFeedbackOwnerReviewItems?: number;
    policyFeedbackTrainingItems?: number;
    policyRegistryActiveItems?: number;
    policyRegistryOwnerReviewItems?: number;
    policyRegistryRuntimeGuardItems?: number;
    policyDeploymentPendingItems?: number;
    policyDeploymentSyncItems?: number;
    policyDeploymentFailedItems?: number;
    policyTrainingRequiredItems?: number;
    policyTrainingAssignedItems?: number;
    policyTrainingAcknowledgedItems?: number;
    policyTrainingCompletedItems?: number;
    policyTrainingOverdueItems?: number;
  };
  categories: Array<{ key: AdminMessengerSafetyCategory; severity: "high" | "critical" | string; enabled: boolean; description: string }>;
  settings: AdminMessengerSafetySettings;
  recentReports: AdminMessengerSafetyReport[];
  caseReviewCenter?: AdminMessengerSafetyCaseReview[];
  authorityRequests: AdminMessengerAuthorityRequest[];
  aiSignals: AdminMessengerAiSafetySignal[];
  evidenceVault: AdminMessengerEvidenceVaultItem[];
  restrictionCenter?: AdminMessengerSafetyRestriction[];
  activeEnforcementRules?: AdminMessengerSafetyEnforcementRule[];
  evidenceVaultIntegrity: AdminMessengerEvidenceVaultIntegrity;
  vaultPolicy: string[];
  caseReviewPolicy?: string[];
  restrictionPolicy?: string[];
  enforcementPolicy?: string[];
  runtimeBridgePolicy?: string[];
  clientGuardPolicy?: string[];
  guardEventLog?: AdminMessengerSafetyGuardEvent[];
  guardEventLogIntegrity?: AdminMessengerSafetyGuardEventSnapshot["integrity"];
  guardEventLogPolicy?: string[];
  integrityMonitor?: AdminMessengerSafetyIntegrityMonitorSnapshot;
  integrityMonitorPolicy?: string[];
  escalationCenter?: AdminMessengerSafetyEscalationItem[];
  escalationCenterPolicy?: string[];
  complianceReportBuilderPolicy?: string[];
  retentionPolicy?: string[];
  exportVerificationPolicy?: string[];
  accessControlMatrix?: AdminMessengerSafetyAccessControlRule[];
  accessControlChecks?: AdminMessengerSafetyAccessControlDecision[];
  accessControlPolicy?: string[];
  staffAssignments?: AdminMessengerSafetyStaffAssignment[];
  staffAssignmentPolicy?: string[];
  supervisorDashboard?: AdminMessengerSafetySupervisorDashboardSnapshot;
  supervisorDashboardPolicy?: string[];
  dailyOperationsPolicy?: string[];
  prelaunchReadinessGatePolicy?: string[];
  launchCommandPolicy?: string[];
  postLaunchMonitorPolicy?: string[];
  incidentResponsePolicy?: string[];
  incidentResponses?: AdminMessengerSafetyIncidentResponse[];
  emergencyActions?: AdminMessengerSafetyEmergencyAction[];
  recoveryReviews?: AdminMessengerSafetyRecoveryReview[];
  policyFeedbackCenter?: AdminMessengerSafetyPolicyFeedbackItem[];
  policyFeedbackPolicy?: string[];
  policyRegistryCenter?: AdminMessengerSafetyPolicyRegistryItem[];
  policyRegistryPolicy?: string[];
  policyDeploymentCenter?: AdminMessengerSafetyPolicyDeploymentItem[];
  policyDeploymentPolicy?: string[];
  policyTrainingCenter?: AdminMessengerSafetyPolicyTrainingAcknowledgementItem[];
  policyTrainingPolicy?: string[];
  emergencyActionPolicy?: string[];
  authorityDeskPolicy?: string[];
  cooperationRules: string[];
};

export type AdminMessengerControlState = {
  featureFlags: Array<{ key: string; enabled: boolean; updatedBy: string; updatedAt: string; note?: string }>;
  launchBlockers: AdminMessengerLaunchBlocker[];
  updatedAt: string;
};



export type AdminMessengerProMonitoringDashboard = {
  ok: true;
  dashboardVersion: string;
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  summary: {
    totalUsers: number;
    onlineUsers: number;
    onlineRatePct: number;
    active24hUsers: number;
    active24hRatePct: number;
    newUsersToday: number;
    newUsers7Days: number;
    newUsers14Days: number;
    growthRatePct: number;
    chats: number;
    messages: number;
    groups: number;
    channels: number;
    bots: number;
    openModerationReports: number;
    criticalModerationReports: number;
    openSafetyReports: number;
    criticalSafetyReports: number;
    trainingRequiredTasks: number;
    trainingOverdueTasks: number;
    readinessStatus: AdminMessengerStatus;
    readinessScorePct: number;
    launchBlockers: number;
    warnings: number;
    safetyLoad: number;
  };
  charts: {
    userGrowth14d: Array<{ date: string; value: number }>;
    onlineScale: Array<{ label: string; value: number; percent: number }>;
    messengerObjects: Array<{ label: string; value: number }>;
    safetyLoad: Array<{ label: string; value: number }>;
  };
  healthLanes: Array<{ key: string; title: string; status: string; value: number; target: number; progressPct: number; severity: string; description: string }>;
  moduleDashboards: Array<{ key: string; title: string; status: string; required: boolean; route: string; metrics: Record<string, unknown> }>;
  rules: string[];
};



export type AdminMessengerGrowthPromotionStatus = "draft" | "pending_approval" | "approved" | "active" | "paused" | "completed" | "rejected";
export type AdminMessengerGreetingStatus = "draft" | "queued" | "pending_approval" | "approved" | "sent" | "cancelled" | "failed";
export type AdminMessengerGreetingOccasion = "birthday" | "holiday" | "custom";
export type AdminMessengerGreetingMode = "automatic" | "manual";
export type AdminMessengerGrowthPromotionTargetKind = "channel" | "group" | "bot";
export type AdminMessengerGrowthPromotionPlacement = "featured_top" | "directory_boost" | "search_boost" | "home_card" | "recommended";

export type AdminMessengerGrowthPromotionSettings = {
  promotionApprovalRequired: boolean;
  greetingsAutoEnabled: boolean;
  birthdayGreetingsEnabled: boolean;
  holidayGreetingsEnabled: boolean;
  manualGreetingsEnabled: boolean;
  aiGreetingDraftsAllowed: boolean;
  holidayCalendarEnabled: boolean;
  automaticGreetingApprovalRequired: boolean;
  contactOptOutRespected: boolean;
  maxAutoGreetingsPerDay: number;
  cooldownDaysPerContact: number;
  rawPrivateContentAllowed: false;
  profileBirthdaySource: "verified_profile_only";
  promotionTargets: AdminMessengerGrowthPromotionTargetKind[];
};

export type AdminMessengerGrowthPromotionCampaign = {
  id: string;
  targetKind: AdminMessengerGrowthPromotionTargetKind;
  targetId: string;
  title: string;
  placement: AdminMessengerGrowthPromotionPlacement;
  status: AdminMessengerGrowthPromotionStatus;
  priority: number;
  audience: "all" | "local" | "new_users" | "active_users" | "manual_segment";
  startsAt?: string;
  endsAt?: string;
  ownerAdminId?: string;
  approvedBy?: string;
  approvedAt?: string;
  pausedBy?: string;
  pausedAt?: string;
  completedBy?: string;
  completedAt?: string;
  rejectionReason?: string;
  metrics: { impressions: number; opens: number; joins: number; botStarts: number; conversionPct: number };
  traceHash: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  note?: string;
};

export type AdminMessengerGreetingTemplate = {
  id: string;
  occasion: AdminMessengerGreetingOccasion;
  language: string;
  title: string;
  messagePreview: string;
  status: "draft" | "active" | "disabled";
  autoSendAllowed: boolean;
  manualSendAllowed: boolean;
  approvalRequired: boolean;
  holidayKey?: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  traceHash: string;
};

export type AdminMessengerGreetingHoliday = {
  id: string;
  holidayKey: string;
  title: string;
  dateMonthDay: string;
  countryCode?: string;
  locale?: string;
  status: "draft" | "active" | "disabled" | string;
  autoQueueAllowed: boolean;
  manualSendAllowed: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  traceHash: string;
};

export type AdminMessengerGreetingAutomationRun = {
  id: string;
  occasion: AdminMessengerGreetingOccasion;
  mode: "automatic" | string;
  source: "verified_profile_birthdays" | "holiday_calendar" | "manual_seed_list" | string;
  status: "dry_run" | "completed" | "blocked" | string;
  holidayKey?: string;
  templateId?: string;
  scheduledAt: string;
  language?: string;
  targetUserCount: number;
  createdTaskCount: number;
  skippedDuplicate: number;
  skippedByCooldown: number;
  skippedByDailyLimit: number;
  skippedMissingTemplate: number;
  rawPrivateContentIncluded: false;
  createdBy: string;
  createdAt: string;
  traceHash: string;
  note?: string;
};

export type AdminMessengerGreetingTask = {
  id: string;
  occasion: AdminMessengerGreetingOccasion;
  mode: AdminMessengerGreetingMode;
  status: AdminMessengerGreetingStatus;
  templateId?: string;
  targetUserId: string;
  contactUserId?: string;
  scheduledAt: string;
  holidayKey?: string;
  language?: string;
  dedupeKey: string;
  approvedBy?: string;
  approvedAt?: string;
  sentBy?: string;
  sentAt?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  failureReason?: string;
  rawPrivateContentIncluded: false;
  traceHash: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  note?: string;
};

export type AdminMessengerGrowthPromotionGreetingSnapshot = {
  ok: true;
  centerVersion: string;
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  summary: {
    totalUsers: number;
    onlineUsers: number;
    active24hUsers: number;
    publicGroups: number;
    publicChannels: number;
    publicBots: number;
    totalPromotions: number;
    activePromotions: number;
    pendingPromotions: number;
    promotionImpressions: number;
    promotionConversions: number;
    promotionConversionPct: number;
    greetingTemplates: number;
    activeGreetingTemplates: number;
    greetingTasks: number;
    queuedGreetings: number;
    sentGreetings: number;
    birthdayGreetingTasks: number;
    holidayGreetingTasks: number;
    automaticGreetingsEnabled: boolean;
    manualGreetingsEnabled: boolean;
    readinessScorePct: number;
    status: string;
    holidayDefinitions: number;
    activeHolidayDefinitions: number;
    automationRuns: number;
    automationRunsToday: number;
    automaticGreetingTasks: number;
    pendingGreetingApprovals: number;
  };
  settings: AdminMessengerGrowthPromotionSettings;
  promotions: AdminMessengerGrowthPromotionCampaign[];
  greetingTemplates: AdminMessengerGreetingTemplate[];
  greetingTasks: AdminMessengerGreetingTask[];
  greetingHolidays: AdminMessengerGreetingHoliday[];
  greetingAutomationRuns: AdminMessengerGreetingAutomationRun[];
  charts: {
    promotionByKind: Array<{ label: string; value: number; active: number }>;
    greetingByOccasion: Array<{ label: string; value: number; sent: number }>;
    onlineGrowth: Array<{ date: string; value: number }>;
    funnel: Array<{ label: string; value: number }>;
    automationQueue: Array<{ label: string; value: number }>;
  };
  today: string;
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: { directoryDatabaseConnected: boolean; userRowsSampled: number; runtimeOnlineAvailable: boolean; noRawMessages: boolean; noPrivateMedia: boolean };
};


export type AdminMessengerGrowthAnalyticsSnapshot = {
  ok: true;
  centerVersion: string;
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  summary: {
    totalUsers: number;
    onlineUsers: number;
    active24hUsers: number;
    retentionProxyPct: number;
    newUsers7Days: number;
    previousNewUsers7Days: number;
    newUsers30Days: number;
    userGrowthDeltaPct: number;
    chats: number;
    newChats7Days: number;
    chatGrowthDeltaPct: number;
    messages: number;
    newMessages7Days: number;
    messageGrowthDeltaPct: number;
    publicDirectoryObjects: number;
    activePublicDirectoryObjects: number;
    featuredObjects: number;
    boostedObjects: number;
    promotedObjects: number;
    activePromotions: number;
    promotionImpressions: number;
    promotionConversions: number;
    promotionConversionPct: number;
    groupJoins: number;
    channelJoins: number;
    botStarts: number;
    greetingTasks: number;
    sentGreetings: number;
    dataConfidencePct: number;
    growthHealth: string;
    promotionHealth: string;
    retentionHealth: string;
  };
  charts: {
    userGrowth30d: Array<{ date: string; value: number }>;
    messageGrowth30d: Array<{ date: string; value: number }>;
    chatGrowth30d: Array<{ date: string; value: number }>;
    acquisitionFunnel: Array<{ label: string; value: number }>;
    retentionScale: Array<{ label: string; value: number; percent: number }>;
    directoryMix: Array<{ label: string; value: number; active: number }>;
    userSegments: Array<{ label: string; value: number }>;
  };
  healthCards: Array<{ key: string; status: string; title: string; value: number; target: number; progressPct: number; detail: string }>;
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: { usersSampled: number; messagesSampled: number; chatsSampled: number; directoryEntries: number; presenceSource: string; runtimeOnlineAvailable: boolean; rawContentIncluded: false };
  traceHash: string;
};


export type AdminMessengerContentQualitySettings = {
  centerEnabled: boolean;
  publicContentQualityRequired: boolean;
  antiSpamEnabled: boolean;
  rateLimitEnabled: boolean;
  duplicateContentGuardEnabled: boolean;
  linkSpamGuardEnabled: boolean;
  botAbuseGuardEnabled: boolean;
  groupRaidGuardEnabled: boolean;
  channelFloodGuardEnabled: boolean;
  promotionAbuseGuardEnabled: boolean;
  quarantineEnabled: boolean;
  manualReviewRequiredForHighRisk: boolean;
  ownerApprovalRequiredForMassAction: boolean;
  rawPrivateContentStorageAllowed: false;
  maxMessagesPerMinute: number;
  maxForwardsPerHour: number;
  duplicateWindowMinutes: number;
  publicQualityMinimumScore: number;
  promotionQualityMinimumScore: number;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerContentQualitySignal = {
  id: string;
  kind: string;
  targetKind: string;
  targetId: string;
  status: string;
  severity: string;
  reason: string;
  source: string;
  score: number;
  metadataOnly: true;
  rawContentIncluded: false;
  evidenceHash: string;
  traceHash: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  quarantinedBy?: string;
  quarantinedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  releasedBy?: string;
  releasedAt?: string;
  note?: string;
};

export type AdminMessengerContentQualitySnapshot = {
  ok: true;
  centerVersion: string;
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  settings: AdminMessengerContentQualitySettings;
  summary: {
    totalSignals: number;
    openSignals: number;
    acknowledgedSignals: number;
    quarantinedSignals: number;
    resolvedSignals: number;
    highRiskSignals: number;
    moderationPending: number;
    promotionQualityWarnings: number;
    reviewBacklog: number;
    spamGuardCoveragePct: number;
    qualityScore: number;
    messages7d: number;
    chatsSampled: number;
    usersSampled: number;
    healthStatus: string;
  };
  charts: {
    signalMix: Array<{ label: string; value: number }>;
    severityMix: Array<{ label: string; value: number }>;
    guardCoverage: Array<{ label: string; enabled: boolean }>;
    publicQualityWarnings: Array<{ id: string; kind: string; title: string; qualityScore: number; promotionScore: number; safetyScore: number }>;
    growthContext: Array<{ label: string; value: number }>;
  };
  signals: AdminMessengerContentQualitySignal[];
  quarantineQueue: AdminMessengerContentQualitySignal[];
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: { messagesSampled: number; chatsSampled: number; usersSampled: number; moderationConnected: boolean; directoryPromotionConnected: boolean; growthAnalyticsConnected: boolean; rawContentIncluded: false };
  traceHash: string;
};



export type AdminMessengerApprovalVisibilitySettings = AdminMessengerDirectoryPromotionSettings & {
  profileCreationSource: "profile_only" | string;
  adminGovernanceSource: "admin_visibility_control" | string;
  messengerRuntimeBehavior: "search_view_join_subscribe_start_only" | string;
  ownerApprovalRequiredForFeatured: boolean;
  rawPrivateMessagesAllowed: false;
};

export type AdminMessengerApprovalVisibilityEntry = AdminMessengerDirectoryPromotionEntry & {
  approvalLane: string;
  visibilityStatus: string;
  needsOwnerReview: boolean;
  needsSafetyReview: boolean;
  governanceReasons: string[];
};

export type AdminMessengerApprovalVisibilitySnapshot = {
  ok: true;
  centerVersion: string;
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  settings: AdminMessengerApprovalVisibilitySettings;
  summary: {
    totalEntries: number;
    pendingApproval: number;
    approvedEntries: number;
    publicEntries: number;
    hiddenEntries: number;
    restrictedEntries: number;
    rejectedEntries: number;
    featuredEntries: number;
    boostedEntries: number;
    recommendedEntries: number;
    qualityReviewEntries: number;
    ownerReviewRequired: number;
    safetyReviewRequired: number;
    governanceScore: number;
    healthStatus: string;
  };
  entries: AdminMessengerApprovalVisibilityEntry[];
  queues: {
    pendingApproval: AdminMessengerApprovalVisibilityEntry[];
    ownerReview: AdminMessengerApprovalVisibilityEntry[];
    safetyReview: AdminMessengerApprovalVisibilityEntry[];
    hiddenRestricted: AdminMessengerApprovalVisibilityEntry[];
    promotedVisible: AdminMessengerApprovalVisibilityEntry[];
  };
  charts: {
    approvalFunnel: Array<{ label: string; value: number }>;
    visibilityMix: Array<{ label: string; value: number }>;
    governanceLanes: Array<{ label: string; value: number; status: string }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: { directoryPromotionConnected: boolean; contentQualityConnected: boolean; rawContentIncluded: false; profileManagementOnly: boolean; walletTouched: false };
  traceHash: string;
};

export type AdminMessengerPresenceSessionStatus = "active_now" | "online" | "active_recently" | "idle" | "offline" | "stale" | "unknown" | string;
export type AdminMessengerPresenceAnomalyStatus = "open" | "acknowledged" | "resolved" | string;

export type AdminMessengerPresenceSettings = {
  messengerPresenceOnly: boolean;
  realtimePresenceRequired: boolean;
  lastSeenEnabled: boolean;
  suspiciousPresenceAlertsEnabled: boolean;
  activeNowWindowSeconds: number;
  onlineWindowMinutes: number;
  activeRecentlyWindowMinutes: number;
  staleOnlineMinutes: number;
  maxSessionsPerUser: number;
  rawMessageContentAllowed: false;
  primaryIdentity: "unified_user_id" | string;
};

export type AdminMessengerPresenceSession = {
  id: string;
  userId?: string;
  displayName?: string;
  status: AdminMessengerPresenceSessionStatus;
  rawStatus?: string;
  appArea?: string;
  platform?: string;
  deviceId?: string;
  sessionId?: string;
  socketId?: string;
  connectionId?: string;
  startedAt?: string;
  lastSeenAt?: string;
  lastHeartbeatAt?: string;
  minutesSinceSeen: number | null;
  sessionCountForUser: number;
  source: "database" | "runtime" | "not_configured" | string;
  traceHash: string;
};

export type AdminMessengerPresenceAnomaly = {
  id: string;
  kind: string;
  severity: "low" | "medium" | "high" | "critical" | string;
  status: AdminMessengerPresenceAnomalyStatus;
  userId?: string;
  sessionId?: string;
  title: string;
  detail: string;
  traceHash: string;
  detectedAt: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  note?: string;
  rawContentIncluded: false;
};

export type AdminMessengerPresenceOperationsSnapshot = {
  ok: true;
  centerVersion: string;
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  source: "database" | "runtime" | "not_configured" | string;
  settings: AdminMessengerPresenceSettings;
  summary: {
    totalSessions: number;
    uniqueUsers: number;
    activeNow: number;
    onlineUsers: number;
    activeRecently: number;
    idleUsers: number;
    offlineUsers: number;
    staleSessions: number;
    suspiciousStates: number;
    acknowledgedAnomalies: number;
    resolvedAnomalies: number;
    realtimeHealth: "ready" | "warning" | "blocked" | "not_configured" | string;
    presenceReadinessPct: number;
  };
  sessions: AdminMessengerPresenceSession[];
  anomalies: AdminMessengerPresenceAnomaly[];
  charts: {
    onlineScale: Array<{ label: string; value: number; percent: number }>;
    sessionByPlatform: Array<{ label: string; value: number }>;
    anomalyByKind: Array<{ label: string; value: number }>;
    sessionLoadByUser: Array<{ label: string; value: number }>;
  };
  operations: Array<{ key: string; status: string; title: string; detail: string }>;
  rules: string[];
};



export type AdminMessengerNotificationsMonitorSettings = {
  monitorEnabled: boolean;
  pushDeliveryMonitorEnabled: boolean;
  unreadMessagesMonitorEnabled: boolean;
  missedCallsMonitorEnabled: boolean;
  missedMessagesMonitorEnabled: boolean;
  realtimeQueueMonitorEnabled: boolean;
  readReceiptsMonitorEnabled: boolean;
  requireMessengerRealtimeBridge: boolean;
  rawPrivateContentStorageAllowed: false;
  primaryIdentity: "unified_user_id" | string;
  maxUnreadPerUserWarning: number;
  maxDeliveryLagMinutes: number;
  maxQueueDepthWarning: number;
  missedCallAlertWindowHours: number;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerNotificationDeliveryItem = {
  id: string;
  kind: string;
  targetUserId?: string;
  chatId?: string;
  messageId?: string;
  callId?: string;
  channel: string;
  status: string;
  createdAt?: string;
  deliveredAt?: string;
  readAt?: string;
  lagMinutes: number | null;
  source: string;
  traceHash: string;
  rawContentIncluded: false;
};

export type AdminMessengerNotificationsMonitorIssue = {
  id: string;
  kind: string;
  severity: string;
  status: string;
  title: string;
  detail: string;
  targetType: string;
  targetId: string;
  count: number;
  traceHash: string;
  detectedAt: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  note?: string;
  rawContentIncluded: false;
};

export type AdminMessengerNotificationsMonitorSnapshot = {
  ok: true;
  centerVersion: string;
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  source: string;
  settings: AdminMessengerNotificationsMonitorSettings;
  summary: {
    totalDeliveryEvents: number;
    queuedNotifications: number;
    deliveredNotifications: number;
    failedNotifications: number;
    unreadMessages: number;
    unreadUsers: number;
    missedMessages: number;
    missedCalls: number;
    readReceipts: number;
    realtimeQueueDepth: number;
    pushProviderReady: boolean;
    realtimeBridgeReady: boolean;
    issueBacklog: number;
    acknowledgedIssues: number;
    resolvedIssues: number;
    deliveryHealthPct: number;
    notificationReadinessPct: number;
    healthStatus: string;
  };
  deliveryEvents: AdminMessengerNotificationDeliveryItem[];
  issues: AdminMessengerNotificationsMonitorIssue[];
  charts: {
    deliveryFunnel: Array<{ label: string; value: number; percent: number }>;
    issueMix: Array<{ label: string; value: number }>;
    unreadTopUsers: Array<{ label: string; value: number }>;
    missedCallTrend: Array<{ label: string; value: number }>;
    healthLanes: Array<{ key: string; status: string; title: string; detail: string; value: number; target: number; progressPct: number }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: { notificationRows: number; messageRows: number; callRows: number; readReceiptRows: number; runtimeCountersAvailable: boolean; rawContentIncluded: false; walletTouched: false };
  traceHash: string;
};




export type AdminMessengerMaxPrelaunchGateManualStatus = "pending" | "verified" | "blocked" | "waived";
export type AdminMessengerMaxPrelaunchStatus = "ready" | "warning" | "blocked" | "not_configured";

export type AdminMessengerMaxPrelaunchSettings = {
  requireOwnerGoLiveApproval: boolean;
  requireNoBlockedFinalReadiness: boolean;
  requireTwoDeviceRealtimeProof: boolean;
  requirePublicDirectoryReady: boolean;
  requireGrowthPromotionReady: boolean;
  requireGreetingsSafeMode: boolean;
  requireNotificationsReady: boolean;
  requirePresenceReady: boolean;
  requireSafetyGateReady: boolean;
  requireMobileBackendVerificationPlan: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerMaxPrelaunchGate = {
  key: string;
  categoryKey: string;
  titleKey: string;
  detailKey: string;
  status: AdminMessengerMaxPrelaunchStatus;
  manualStatus: AdminMessengerMaxPrelaunchGateManualStatus;
  required: boolean;
  ownerRequired: boolean;
  scorePct: number;
  blockers: number;
  warnings: number;
  sourceKey: string;
  lastVerifiedBy?: string;
  lastVerifiedAt?: string;
  note?: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerMaxPrelaunchSnapshot = {
  ok: true;
  centerVersion: "messenger-max-prelaunch-control-v1";
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  settings: AdminMessengerMaxPrelaunchSettings;
  summary: {
    totalGates: number;
    requiredGates: number;
    readyGates: number;
    warningGates: number;
    blockedGates: number;
    notConfiguredGates: number;
    manuallyVerifiedGates: number;
    manuallyBlockedGates: number;
    waivedGates: number;
    maxReadinessPct: number;
    goLiveAllowed: boolean;
    ownerGoLiveApprovalRequired: boolean;
    healthStatus: AdminMessengerMaxPrelaunchStatus;
    walletTouched: false;
  };
  gates: AdminMessengerMaxPrelaunchGate[];
  blockers: AdminMessengerMaxPrelaunchGate[];
  warnings: AdminMessengerMaxPrelaunchGate[];
  categories: Array<{ key: string; total: number; ready: number; blocked: number; warning: number; notConfigured: number; progressPct: number }>;
  charts: {
    readinessLanes: Array<{ key: string; status: AdminMessengerMaxPrelaunchStatus; scorePct: number; blockers: number; warnings: number }>;
    categoryProgress: Array<{ label: string; value: number; ready: number; blocked: number; warning: number; notConfigured: number; progressPct: number }>;
    operationalFocus: Array<{ label: string; value: number; status: AdminMessengerMaxPrelaunchStatus }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: {
    finalReadinessConnected: boolean;
    dashboardConnected: boolean;
    presenceConnected: boolean;
    notificationsConnected: boolean;
    directoryConnected: boolean;
    growthConnected: boolean;
    contentQualityConnected: boolean;
    safetyGateConnected: boolean;
    rawContentIncluded: false;
    walletTouched: false;
  };
  traceHash: string;
};


export type AdminMessengerRuntimeVerificationManualStatus = "pending" | "verified" | "blocked" | "waived";
export type AdminMessengerRuntimeVerificationStatus = "ready" | "warning" | "blocked" | "not_configured";
export type AdminMessengerRuntimeVerificationSessionStatus = "draft" | "running" | "passed" | "failed" | "cancelled";

export type AdminMessengerRuntimeVerificationSettings = {
  requireTwoPhysicalDevices: boolean;
  requireUnifiedUserIdProof: boolean;
  requireRealtimePresenceProof: boolean;
  requireChatSendReceiveProof: boolean;
  requireMediaPipelineProof: boolean;
  requireCallsProof: boolean;
  requireNotificationsProof: boolean;
  requirePublicDirectoryProof: boolean;
  requireSafetyAndAntiSpamProof: boolean;
  requireOwnerFinalRuntimeApproval: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerRuntimeVerificationItem = {
  key: string;
  categoryKey: string;
  titleKey: string;
  detailKey: string;
  status: AdminMessengerRuntimeVerificationStatus;
  manualStatus: AdminMessengerRuntimeVerificationManualStatus;
  required: boolean;
  ownerRequired: boolean;
  scorePct: number;
  blockers: number;
  warnings: number;
  sourceKey: string;
  proofRef?: string;
  note?: string;
  lastVerifiedBy?: string;
  lastVerifiedAt?: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerRuntimeVerificationSession = {
  id: string;
  title: string;
  status: AdminMessengerRuntimeVerificationSessionStatus;
  deviceAUserId: string;
  deviceBUserId: string;
  deviceALabel?: string;
  deviceBLabel?: string;
  connectionMode: "lan" | "tunnel" | "production" | "local";
  startedAt: string;
  finishedAt?: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
  note?: string;
  proofHash: string;
  traceHash: string;
};

export type AdminMessengerRuntimeVerificationSnapshot = {
  ok: true;
  centerVersion: "messenger-runtime-two-device-verification-v1";
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  settings: AdminMessengerRuntimeVerificationSettings;
  summary: {
    totalItems: number;
    requiredItems: number;
    readyItems: number;
    warningItems: number;
    blockedItems: number;
    notConfiguredItems: number;
    manuallyVerifiedItems: number;
    manuallyBlockedItems: number;
    waivedItems: number;
    activeSessions: number;
    passedSessions: number;
    failedSessions: number;
    runtimeReadinessPct: number;
    runtimeVerificationAllowed: boolean;
    ownerRuntimeApprovalRequired: boolean;
    healthStatus: AdminMessengerRuntimeVerificationStatus;
    walletTouched: false;
  };
  items: AdminMessengerRuntimeVerificationItem[];
  sessions: AdminMessengerRuntimeVerificationSession[];
  blockers: AdminMessengerRuntimeVerificationItem[];
  warnings: AdminMessengerRuntimeVerificationItem[];
  categories: Array<{ key: string; total: number; ready: number; blocked: number; warning: number; notConfigured: number; progressPct: number }>;
  charts: {
    verificationLanes: Array<{ key: string; status: AdminMessengerRuntimeVerificationStatus; scorePct: number; blockers: number; warnings: number }>;
    categoryProgress: Array<{ label: string; value: number; ready: number; blocked: number; warning: number; notConfigured: number; progressPct: number }>;
    sessionStatus: Array<{ label: string; value: number }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: {
    maxPrelaunchConnected: boolean;
    finalReadinessConnected: boolean;
    presenceConnected: boolean;
    notificationsConnected: boolean;
    directoryConnected: boolean;
    contentQualityConnected: boolean;
    manualSessionProofAvailable: boolean;
    rawContentIncluded: false;
    walletTouched: false;
  };
  traceHash: string;
};


export type AdminMessengerFixControlStatus = "ready" | "warning" | "blocked" | "not_configured";
export type AdminMessengerFixControlTicketStatus = "open" | "in_progress" | "fixed" | "verified" | "blocked" | "waived";
export type AdminMessengerFixControlSeverity = "low" | "medium" | "high" | "critical";
export type AdminMessengerFixControlCategory = "identity_profile" | "realtime_presence" | "chat_messages" | "media_pipeline" | "calls" | "notifications" | "groups_channels_bots" | "promotion_greetings" | "safety_compliance" | "mobile_ui" | "backend_api";

export type AdminMessengerFixControlSettings = {
  requireOwnerVerificationForCriticalFixes: boolean;
  requireTwoDeviceRetestAfterFix: boolean;
  requireNoRawPrivateContent: boolean;
  requireNoWalletTouch: boolean;
  requireRegressionProof: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerFixControlTicket = {
  id: string;
  title: string;
  category: AdminMessengerFixControlCategory;
  severity: AdminMessengerFixControlSeverity;
  status: AdminMessengerFixControlTicketStatus;
  targetArea: string;
  deviceAUserId?: string;
  deviceBUserId?: string;
  description?: string;
  fixNote?: string;
  proofRef?: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  fixedAt?: string;
  fixedBy?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  blockedAt?: string;
  blockedBy?: string;
  waivedAt?: string;
  waivedBy?: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerFixControlLane = {
  key: AdminMessengerFixControlCategory;
  titleKey: string;
  detailKey: string;
  status: AdminMessengerFixControlStatus;
  scorePct: number;
  openTickets: number;
  criticalTickets: number;
  verifiedTickets: number;
  runtimeBlockers: number;
  traceHash: string;
};

export type AdminMessengerFixControlSnapshot = {
  ok: true;
  centerVersion: "messenger-mobile-backend-fix-control-v1";
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  walletTouched: false;
  settings: AdminMessengerFixControlSettings;
  summary: {
    totalTickets: number;
    openTickets: number;
    inProgressTickets: number;
    fixedTickets: number;
    verifiedTickets: number;
    blockedTickets: number;
    waivedTickets: number;
    criticalTickets: number;
    criticalOpenTickets: number;
    runtimeBlockers: number;
    runtimeWarnings: number;
    fixReadinessPct: number;
    mobileBackendReady: boolean;
    ownerVerificationRequired: boolean;
    healthStatus: AdminMessengerFixControlStatus;
    walletTouched: false;
  };
  tickets: AdminMessengerFixControlTicket[];
  lanes: AdminMessengerFixControlLane[];
  blockers: AdminMessengerFixControlTicket[];
  charts: {
    ticketStatus: Array<{ label: AdminMessengerFixControlTicketStatus; value: number }>;
    severityMix: Array<{ label: AdminMessengerFixControlSeverity; value: number }>;
    categoryProgress: Array<{ label: AdminMessengerFixControlCategory; value: number; verified: number; open: number; critical: number; progressPct: number }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: {
    runtimeVerificationConnected: boolean;
    maxPrelaunchConnected: boolean;
    finalReadinessConnected: boolean;
    noRawPrivateContent: true;
    walletTouched: false;
  };
  traceHash: string;
};

export type AdminMessengerFinalReadinessManualStatus = "pending" | "verified" | "blocked" | "waived";
export type AdminMessengerFinalReadinessStatus = "ready" | "warning" | "blocked" | "not_configured";

export type AdminMessengerFinalReadinessSettings = {
  requireOwnerFinalApproval: boolean;
  requireTwoDeviceRealtimeVerification: boolean;
  requireNoCriticalSafetyBacklog: boolean;
  requireDirectoryPromotionReady: boolean;
  requireGreetingsSafeMode: boolean;
  requireNotificationsReady: boolean;
  requirePresenceReady: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerFinalReadinessItem = {
  key: string;
  category: string;
  title: string;
  detail: string;
  severity: "info" | "warning" | "critical";
  status: AdminMessengerFinalReadinessStatus;
  source: string;
  required: boolean;
  manualStatus: AdminMessengerFinalReadinessManualStatus;
  ownerRequired: boolean;
  lastVerifiedBy?: string;
  lastVerifiedAt?: string;
  note?: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerFinalReadinessSnapshot = {
  ok: true;
  centerVersion: string;
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  settings: AdminMessengerFinalReadinessSettings;
  summary: {
    totalItems: number;
    requiredItems: number;
    readyItems: number;
    warningItems: number;
    blockedItems: number;
    notConfiguredItems: number;
    manuallyVerifiedItems: number;
    manuallyBlockedItems: number;
    waivedItems: number;
    launchReady: boolean;
    readinessScorePct: number;
    ownerFinalApprovalRequired: boolean;
    healthStatus: AdminMessengerFinalReadinessStatus;
  };
  items: AdminMessengerFinalReadinessItem[];
  categories: Array<{ key: string; title: string; total: number; ready: number; blocked: number; warning: number; notConfigured: number; progressPct: number }>;
  blockers: AdminMessengerFinalReadinessItem[];
  warnings: AdminMessengerFinalReadinessItem[];
  charts: {
    readinessByCategory: Array<{ label: string; value: number; ready: number; blocked: number; warning: number; notConfigured: number; progressPct: number }>;
    sourceCoverage: Array<{ label: string; value: number; ready: number; blocked: number }>;
    finalGateLanes: Array<{ key: string; status: string; title: string; detail: string; progressPct: number }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: { dashboardConnected: boolean; safetyConnected: boolean; presenceConnected: boolean; notificationsConnected: boolean; directoryConnected: boolean; growthConnected: boolean; contentQualityConnected: boolean; rawContentIncluded: false; walletTouched: false };
  traceHash: string;
};




export type AdminMessengerMobileTransitionStatus = "ready" | "warning" | "blocked" | "not_configured";
export type AdminMessengerMobileTransitionManualStatus = "pending" | "verified" | "blocked" | "waived";
export type AdminMessengerMobileTransitionItemKey = "admin_gate_closed" | "release_candidate_reviewed" | "owner_handoff_confirmed" | "regression_recheck_passed" | "two_device_plan_ready" | "mobile_backend_scope_locked" | "mobile_project_required" | "backend_project_required" | "no_wallet_or_other_modules" | "no_raw_private_content_policy";

export type AdminMessengerMobileTransitionSettings = {
  requireAdminGateClosed: boolean;
  requireReleaseCandidateReviewed: boolean;
  requireOwnerHandoffConfirmed: boolean;
  requireRegressionRecheckPassed: boolean;
  requireTwoDevicePlanReady: boolean;
  requireMobileBackendScopeLocked: boolean;
  requireNoWalletOrOtherModules: boolean;
  requireNoRawPrivateContentPolicy: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerMobileTransitionItem = {
  key: AdminMessengerMobileTransitionItemKey;
  titleKey: string;
  detailKey: string;
  categoryKey: string;
  required: boolean;
  systemStatus: AdminMessengerMobileTransitionStatus;
  manualStatus: AdminMessengerMobileTransitionManualStatus;
  scorePct: number;
  blockers: number;
  warnings: number;
  note?: string;
  proofRef?: string;
  updatedBy: string;
  updatedAt: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerMobileTransitionLinkedCenter = {
  key: string;
  titleKey: string;
  detailKey: string;
  status: AdminMessengerMobileTransitionStatus;
  readinessPct: number;
  blockers: number;
  warnings: number;
  traceHash: string;
};

export type AdminMessengerMobileTransitionSnapshot = {
  ok: true;
  centerVersion: "messenger-mobile-backend-transition-v1";
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  walletTouched: false;
  settings: AdminMessengerMobileTransitionSettings;
  summary: {
    totalItems: number;
    requiredItems: number;
    verifiedItems: number;
    blockedItems: number;
    waivedItems: number;
    pendingItems: number;
    linkedBlockers: number;
    linkedWarnings: number;
    transitionReadinessPct: number;
    mobileBackendTransitionAllowed: boolean;
    nextWorkScope: "messenger_mobile_backend_only";
    healthStatus: AdminMessengerMobileTransitionStatus;
    rawContentIncluded: false;
    walletTouched: false;
  };
  items: AdminMessengerMobileTransitionItem[];
  linkedCenters: AdminMessengerMobileTransitionLinkedCenter[];
  blockers: AdminMessengerMobileTransitionItem[];
  warnings: AdminMessengerMobileTransitionItem[];
  charts: {
    manualStatus: Array<{ label: AdminMessengerMobileTransitionManualStatus; value: number }>;
    linkedReadiness: Array<{ label: string; value: number; blockers: number; warnings: number; status: AdminMessengerMobileTransitionStatus }>;
    itemReadiness: Array<{ label: AdminMessengerMobileTransitionItemKey; value: number; systemStatus: AdminMessengerMobileTransitionStatus; manualStatus: AdminMessengerMobileTransitionManualStatus }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: {
    releaseCandidateConnected: boolean;
    ownerHandoffConnected: boolean;
    regressionConnected: boolean;
    accessTextGateConnected: boolean;
    mobileProjectRequired: true;
    backendProjectRequired: true;
    noRawPrivateContent: true;
    walletTouched: false;
  };
  traceHash: string;
};

export type AdminMessengerUiTextCleanlinessStatus = "ready" | "warning" | "blocked" | "not_configured";
export type AdminMessengerUiTextCleanlinessManualStatus = "pending" | "verified" | "blocked" | "waived";
export type AdminMessengerUiTextCleanlinessItemKey = "admin_messenger_navigation_clean" | "admin_messenger_cards_clean" | "status_values_translated" | "backend_enum_hidden" | "no_helper_musor_text" | "groups_channels_bots_text_clean" | "promotion_text_clean" | "greetings_text_clean" | "safety_text_clean" | "mobile_messenger_i18n_ready" | "no_raw_private_content_visible";

export type AdminMessengerUiTextCleanlinessSettings = {
  requireNoVisibleEnglishInRussianUi: boolean;
  requireNoRawTechnicalKeys: boolean;
  requireStatusTranslationMap: boolean;
  requireMobileMessengerI18nReview: boolean;
  requireOwnerManualProof: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerUiTextCleanlinessItem = {
  key: AdminMessengerUiTextCleanlinessItemKey;
  titleKey: string;
  detailKey: string;
  categoryKey: string;
  required: boolean;
  systemStatus: AdminMessengerUiTextCleanlinessStatus;
  manualStatus: AdminMessengerUiTextCleanlinessManualStatus;
  scorePct: number;
  blockers: number;
  warnings: number;
  note?: string;
  proofRef?: string;
  updatedBy: string;
  updatedAt: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerUiTextCleanlinessSnapshot = {
  ok: true;
  centerVersion: "messenger-ui-text-cleanliness-v1";
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  walletTouched: false;
  settings: AdminMessengerUiTextCleanlinessSettings;
  summary: {
    totalItems: number;
    requiredItems: number;
    verifiedItems: number;
    blockedItems: number;
    waivedItems: number;
    pendingItems: number;
    systemReadyItems: number;
    systemWarningItems: number;
    textCleanlinessPct: number;
    ownerProofRequired: boolean;
    readyForMessengerFinalAcceptance: boolean;
    healthStatus: AdminMessengerUiTextCleanlinessStatus;
    rawContentIncluded: false;
    walletTouched: false;
  };
  items: AdminMessengerUiTextCleanlinessItem[];
  blockers: AdminMessengerUiTextCleanlinessItem[];
  warnings: AdminMessengerUiTextCleanlinessItem[];
  categories: Array<{ key: string; titleKey: string; total: number; verified: number; blocked: number; pending: number; progressPct: number }>;
  charts: {
    manualStatus: Array<{ label: AdminMessengerUiTextCleanlinessManualStatus; value: number }>;
    categoryReadiness: Array<{ label: string; value: number; verified: number; blocked: number; pending: number }>;
    itemReadiness: Array<{ label: AdminMessengerUiTextCleanlinessItemKey; value: number; systemStatus: AdminMessengerUiTextCleanlinessStatus; manualStatus: AdminMessengerUiTextCleanlinessManualStatus }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: { adminUiConnected: boolean; mobileUiReviewRequired: boolean; noRawPrivateContent: true; walletTouched: false };
  traceHash: string;
};

export type AdminMessengerCenterState = {
  generatedAt: string;
  readiness: {
    status: AdminMessengerStatus;
    ready: boolean;
    blockers: number;
    warnings: number;
    checks: number;
    passed: number;
  };
  sections: Array<{ key: string; status: AdminMessengerStatus; title: string; ownerControl: boolean }>;
  diagnostics: AdminMessengerDiagnosticCheck[];
  featureFlags: AdminMessengerFeatureFlag[];
  control?: AdminMessengerControlState;
  launchBlockers: AdminMessengerLaunchBlocker[];
  adminRules: string[];
};



export type AdminMessengerRegressionStatus = "ready" | "warning" | "blocked" | "not_configured";
export type AdminMessengerRegressionManualStatus = "pending" | "verified" | "blocked" | "waived";
export type AdminMessengerRegressionItemKey = "two_device_retest" | "identity_profile_recheck" | "chat_send_receive_recheck" | "media_documents_voice_recheck" | "audio_video_calls_recheck" | "notifications_missed_recheck" | "groups_channels_bots_recheck" | "promotion_greetings_recheck" | "safety_antispam_recheck" | "ui_text_cleanliness_recheck" | "owner_final_recheck";

export type AdminMessengerRegressionSettings = {
  requireTwoDeviceRetestForCriticalFixes: boolean;
  requireCleanUiTextBeforeAcceptance: boolean;
  requireOwnerProofForFinalPass: boolean;
  requireNoRawPrivateContent: boolean;
  requireMessengerOnlyScope: boolean;
  requireFixControlClosed: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerRegressionItem = {
  key: AdminMessengerRegressionItemKey;
  titleKey: string;
  detailKey: string;
  categoryKey: string;
  required: boolean;
  sourceKey: string;
  systemStatus: AdminMessengerRegressionStatus;
  manualStatus: AdminMessengerRegressionManualStatus;
  scorePct: number;
  blockers: number;
  warnings: number;
  note?: string;
  proofRef?: string;
  updatedBy: string;
  updatedAt: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerRegressionSnapshot = {
  ok: true;
  centerVersion: "messenger-regression-recheck-v1";
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  walletTouched: false;
  settings: AdminMessengerRegressionSettings;
  summary: {
    totalItems: number;
    requiredItems: number;
    verifiedItems: number;
    blockedItems: number;
    waivedItems: number;
    pendingItems: number;
    systemReadyItems: number;
    systemBlockedItems: number;
    linkedBlockers: number;
    linkedWarnings: number;
    regressionReadinessPct: number;
    messengerRegressionPassed: boolean;
    ownerProofRequired: boolean;
    healthStatus: AdminMessengerRegressionStatus;
    rawContentIncluded: false;
    walletTouched: false;
  };
  items: AdminMessengerRegressionItem[];
  blockers: AdminMessengerRegressionItem[];
  warnings: AdminMessengerRegressionItem[];
  charts: {
    manualStatus: Array<{ label: AdminMessengerRegressionManualStatus; value: number }>;
    categoryReadiness: Array<{ label: string; value: number; blockers: number; warnings: number }>;
    itemReadiness: Array<{ label: AdminMessengerRegressionItemKey; value: number; systemStatus: AdminMessengerRegressionStatus; manualStatus: AdminMessengerRegressionManualStatus }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: {
    runtimeVerificationConnected: boolean;
    fixControlConnected: boolean;
    releaseCandidateConnected: boolean;
    uiTextCleanlinessConnected: boolean;
    noRawPrivateContent: true;
    walletTouched: false;
  };
  traceHash: string;
};



export type AdminMessengerAccessTextGateStatus = "ready" | "warning" | "blocked" | "not_configured";
export type AdminMessengerAccessTextGateManualStatus = "pending" | "verified" | "blocked" | "waived";
export type AdminMessengerAccessTextGateItemKey = "root_owner_access_confirmed" | "messenger_admin_write_scope_confirmed" | "security_compliance_roles_confirmed" | "audit_export_owner_only" | "staff_training_access_confirmed" | "text_cleanliness_gate_passed" | "no_raw_private_content" | "wallet_and_other_modules_locked" | "owner_handoff_passed" | "mobile_backend_handoff_allowed";

export type AdminMessengerAccessTextGateSettings = {
  requireRootOwnerOnlyFinalActions: boolean;
  requireMessengerWriteForOperations: boolean;
  requireSecurityComplianceSeparation: boolean;
  requireAuditExportOwnerOnly: boolean;
  requireNoTechnicalTextInUi: boolean;
  requireMessengerOnlyScope: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerAccessTextGateItem = {
  key: AdminMessengerAccessTextGateItemKey;
  titleKey: string;
  detailKey: string;
  categoryKey: string;
  required: boolean;
  sourceKey: string;
  systemStatus: AdminMessengerAccessTextGateStatus;
  manualStatus: AdminMessengerAccessTextGateManualStatus;
  scorePct: number;
  blockers: number;
  warnings: number;
  note?: string;
  proofRef?: string;
  updatedBy: string;
  updatedAt: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerAccessTextGateSnapshot = {
  ok: true;
  centerVersion: "messenger-access-text-gate-v1";
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  walletTouched: false;
  settings: AdminMessengerAccessTextGateSettings;
  summary: {
    totalItems: number;
    requiredItems: number;
    verifiedItems: number;
    blockedItems: number;
    waivedItems: number;
    pendingItems: number;
    systemReadyItems: number;
    systemBlockedItems: number;
    linkedBlockers: number;
    linkedWarnings: number;
    accessTextReadinessPct: number;
    messengerAccessTextGatePassed: boolean;
    ownerOnlyFinalActions: boolean;
    healthStatus: AdminMessengerAccessTextGateStatus;
    rawContentIncluded: false;
    walletTouched: false;
  };
  items: AdminMessengerAccessTextGateItem[];
  blockers: AdminMessengerAccessTextGateItem[];
  warnings: AdminMessengerAccessTextGateItem[];
  charts: {
    manualStatus: Array<{ label: AdminMessengerAccessTextGateManualStatus; value: number }>;
    accessReadiness: Array<{ label: AdminMessengerAccessTextGateItemKey; value: number; systemStatus: AdminMessengerAccessTextGateStatus; manualStatus: AdminMessengerAccessTextGateManualStatus }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: {
    roleMatrixConnected: boolean;
    ownerProtectionConnected: boolean;
    uiTextCleanlinessConnected: boolean;
    ownerHandoffConnected: boolean;
    noRawPrivateContent: true;
    walletTouched: false;
  };
  traceHash: string;
};

export type AdminMessengerOwnerHandoffStatus = "ready" | "warning" | "blocked" | "not_configured";
export type AdminMessengerOwnerHandoffManualStatus = "pending" | "verified" | "blocked" | "waived";
export type AdminMessengerOwnerHandoffItemKey = "messenger_freeze_window_confirmed" | "owner_handoff_package_ready" | "release_notes_ready" | "rollback_plan_ready" | "final_owner_briefing_done" | "regression_recheck_passed" | "release_gate_passed" | "ui_text_cleanliness_passed" | "two_device_runtime_proof_attached" | "mobile_backend_fix_queue_closed" | "no_raw_private_content" | "other_modules_locked";

export type AdminMessengerOwnerHandoffSettings = {
  requireOwnerHandoffPackage: boolean;
  requireFreezeWindow: boolean;
  requireReleaseNotes: boolean;
  requireRollbackPlan: boolean;
  requireNoOpenCriticalBlockers: boolean;
  requireMessengerOnlyScope: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerOwnerHandoffItem = {
  key: AdminMessengerOwnerHandoffItemKey;
  titleKey: string;
  detailKey: string;
  categoryKey: string;
  required: boolean;
  sourceKey: string;
  systemStatus: AdminMessengerOwnerHandoffStatus;
  manualStatus: AdminMessengerOwnerHandoffManualStatus;
  scorePct: number;
  blockers: number;
  warnings: number;
  note?: string;
  proofRef?: string;
  updatedBy: string;
  updatedAt: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerOwnerHandoffLinkedCenter = {
  key: string;
  titleKey: string;
  status: AdminMessengerOwnerHandoffStatus;
  scorePct: number;
  blockers: number;
  warnings: number;
  traceHash: string;
};

export type AdminMessengerOwnerHandoffSnapshot = {
  ok: true;
  centerVersion: "messenger-owner-handoff-v1";
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  walletTouched: false;
  settings: AdminMessengerOwnerHandoffSettings;
  summary: {
    totalItems: number;
    requiredItems: number;
    verifiedItems: number;
    blockedItems: number;
    waivedItems: number;
    pendingItems: number;
    systemReadyItems: number;
    systemBlockedItems: number;
    linkedBlockers: number;
    linkedWarnings: number;
    handoffReadinessPct: number;
    messengerOwnerHandoffAllowed: boolean;
    freezeWindowRequired: boolean;
    healthStatus: AdminMessengerOwnerHandoffStatus;
    rawContentIncluded: false;
    walletTouched: false;
  };
  items: AdminMessengerOwnerHandoffItem[];
  linkedCenters: AdminMessengerOwnerHandoffLinkedCenter[];
  blockers: AdminMessengerOwnerHandoffItem[];
  warnings: AdminMessengerOwnerHandoffItem[];
  charts: {
    manualStatus: Array<{ label: AdminMessengerOwnerHandoffManualStatus; value: number }>;
    linkedReadiness: Array<{ label: string; value: number; blockers: number; warnings: number; status: AdminMessengerOwnerHandoffStatus }>;
    handoffReadiness: Array<{ label: AdminMessengerOwnerHandoffItemKey; value: number; systemStatus: AdminMessengerOwnerHandoffStatus; manualStatus: AdminMessengerOwnerHandoffManualStatus }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: {
    regressionConnected: boolean;
    releaseGateConnected: boolean;
    uiTextCleanlinessConnected: boolean;
    runtimeVerificationConnected: boolean;
    fixControlConnected: boolean;
    noRawPrivateContent: true;
    walletTouched: false;
  };
  traceHash: string;
};

export type AdminMessengerReleaseCandidateStatus = "ready" | "warning" | "blocked" | "not_configured";
export type AdminMessengerReleaseCandidateManualStatus = "pending" | "verified" | "blocked" | "waived";
export type AdminMessengerReleaseCandidateGateKey = "owner_final_signoff" | "two_device_runtime_passed" | "mobile_backend_fixes_verified" | "critical_backlog_zero" | "presence_notifications_ready" | "groups_channels_bots_ready" | "promotion_greetings_safe" | "safety_compliance_ready" | "no_raw_private_content" | "wallet_locked" | "rollback_plan_ready" | "messenger_freeze_confirmed";

export type AdminMessengerReleaseCandidateSettings = {
  requireOwnerFinalSignoff: boolean;
  requireTwoDeviceRuntimePassed: boolean;
  requireFixControlVerified: boolean;
  requireNoCriticalBacklog: boolean;
  requireNoRawPrivateContent: boolean;
  requireWalletLocked: boolean;
  requireRollbackPlan: boolean;
  requireMessengerFreeze: boolean;
  rawPrivateContentStorageAllowed: false;
  walletTouched: false;
  updatedBy: string;
  updatedAt: string;
};

export type AdminMessengerReleaseCandidateGate = {
  key: AdminMessengerReleaseCandidateGateKey;
  titleKey: string;
  detailKey: string;
  required: boolean;
  sourceKey: string;
  systemStatus: AdminMessengerReleaseCandidateStatus;
  manualStatus: AdminMessengerReleaseCandidateManualStatus;
  scorePct: number;
  blockers: number;
  warnings: number;
  note?: string;
  proofRef?: string;
  updatedBy: string;
  updatedAt: string;
  evidenceHash: string;
  traceHash: string;
};

export type AdminMessengerReleaseCandidateLinkedLane = {
  key: string;
  titleKey: string;
  detailKey: string;
  status: AdminMessengerReleaseCandidateStatus;
  scorePct: number;
  blockers: number;
  warnings: number;
  traceHash: string;
};

export type AdminMessengerReleaseCandidateSnapshot = {
  ok: true;
  centerVersion: "messenger-release-candidate-control-v1";
  generatedAt: string;
  generatedBy: string;
  rawContentIncluded: false;
  walletTouched: false;
  settings: AdminMessengerReleaseCandidateSettings;
  summary: {
    totalGates: number;
    requiredGates: number;
    verifiedGates: number;
    blockedGates: number;
    waivedGates: number;
    pendingGates: number;
    systemReadyGates: number;
    systemBlockedGates: number;
    linkedBlockers: number;
    linkedWarnings: number;
    releaseReadinessPct: number;
    finalMessengerAcceptanceAllowed: boolean;
    ownerSignoffRequired: boolean;
    healthStatus: AdminMessengerReleaseCandidateStatus;
    rawContentIncluded: false;
    walletTouched: false;
  };
  gates: AdminMessengerReleaseCandidateGate[];
  linkedLanes: AdminMessengerReleaseCandidateLinkedLane[];
  blockers: AdminMessengerReleaseCandidateGate[];
  warnings: AdminMessengerReleaseCandidateGate[];
  charts: {
    manualStatus: Array<{ label: AdminMessengerReleaseCandidateManualStatus; value: number }>;
    linkedReadiness: Array<{ label: string; value: number; blockers: number; warnings: number; status: AdminMessengerReleaseCandidateStatus }>;
    gateReadiness: Array<{ label: AdminMessengerReleaseCandidateGateKey; value: number; systemStatus: AdminMessengerReleaseCandidateStatus; manualStatus: AdminMessengerReleaseCandidateManualStatus }>;
  };
  rules: string[];
  nextRequiredSteps: string[];
  sourceQuality: {
    finalReadinessConnected: boolean;
    maxPrelaunchConnected: boolean;
    runtimeVerificationConnected: boolean;
    fixControlConnected: boolean;
    noRawPrivateContent: true;
    walletTouched: false;
  };
  traceHash: string;
};


export type AdminWalletProviderHealth = {
  key: string;
  title: string;
  kind: string;
  status: string;
  configured: boolean;
  enabled: boolean;
  source: string;
  missingFields: string[];
  recommendedBeforeLaunch: boolean;
};


export type AdminWalletProviderCenterGroup = {
  key: string;
  title: string;
  description: string;
  status: "ok" | "warning" | "blocked";
  providerKeys: string[];
  providers: AdminWalletProviderHealth[];
  ready: number;
  total: number;
  required: number;
  blockers: number;
  rules: string[];
};

export type AdminWalletProviderCenter = {
  ok: true;
  generatedAt: string;
  liveLaunchReady: boolean;
  safeDisabled: boolean;
  summary: {
    total: number;
    ready: number;
    required: number;
    blockers: number;
    criticalBlockers: number;
    groups: number;
    readyGroups: number;
  };
  groups: AdminWalletProviderCenterGroup[];
  blockers: Array<{ key: string; title: string; status: string; detail: string }>;
  rules: string[];
};


export type AdminWalletMerchantCredentialKind = "api_key" | "webhook_secret" | string;
export type AdminWalletMerchantCredentialMode = "test" | "live" | string;
export type AdminWalletMerchantCredentialStatus = "active" | "rotated" | "revoked" | string;

export type AdminWalletMerchantCredential = {
  id: string;
  merchantId: string;
  kind: AdminWalletMerchantCredentialKind;
  mode: AdminWalletMerchantCredentialMode;
  label: string;
  prefix: string;
  masked: string;
  status: AdminWalletMerchantCredentialStatus;
  scopes: string[];
  callbackUrl?: string;
  ipAllowlist: string[];
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  rotatedBy?: string;
  rotatedAt?: string;
  revokedBy?: string;
  revokedAt?: string;
};

export type AdminWalletMerchantApiCenter = {
  ok: true;
  generatedAt: string;
  liveLaunchReady: boolean;
  writeEnabled: boolean;
  summary: {
    merchants: number;
    activeMerchants: number;
    apiKeys: number;
    activeApiKeys: number;
    webhookSecrets: number;
    activeWebhookSecrets: number;
    revokedCredentials: number;
    highRiskMerchants: number;
    kybApproved: number;
    qrPayEnabled: number;
  };
  credentials: AdminWalletMerchantCredential[];
  controls: Array<{ key: string; status: "ok" | "warning" | "blocked" | string; title: string; detail: string }>;
  rules: string[];
};

export type AdminWalletMerchantCredentialActionResult = {
  credential: AdminWalletMerchantCredential;
  secretOnce?: string;
  warning: string;
};


export type AdminWalletQrPayDashboard = {
  ok: true;
  generatedAt: string;
  liveReady: boolean;
  safeDisabled: boolean;
  summary: {
    qrPayments: number;
    walletQr: number;
    merchantQr: number;
    businessQr: number;
    coinQr: number;
    cryptoQr: number;
    premiumQr: number;
    giftQr: number;
    pendingPayments: number;
    completedPayments: number;
    failedPayments: number;
    riskSignals: number;
    manualReview: number;
    providerReady: number;
    providerRequired: number;
    providerBlockers: number;
  };
  amounts: {
    grossByCurrency: Record<string, number>;
    feeByCurrency: Record<string, number>;
    completedByCurrency: Record<string, number>;
    pendingByCurrency: Record<string, number>;
    failedByCurrency: Record<string, number>;
  };
  routes: Array<{ key: string; title: string; status: "ok" | "warning" | "blocked" | string; count: number; detail: string }>;
  controls: Array<{ key: string; status: "ok" | "warning" | "blocked" | string; title: string; detail: string }>;
  providers: AdminWalletProviderHealth[];
  recent: {
    qrPayments: unknown[];
    operations: unknown[];
    transactions: unknown[];
    ledgerEntries: unknown[];
  };
  rules: string[];
};


export type AdminWalletPremiumSubscriptionsDashboard = {
  ok: true;
  generatedAt: string;
  liveReady: boolean;
  safeDisabled: boolean;
  summary: {
    plans: number;
    subscriptions: number;
    activeSubscriptions: number;
    expiredSubscriptions: number;
    premiumEntitlements: number;
    entitlementActivations: number;
    entitlementFailures: number;
    payments: number;
    coinPayments: number;
    fiatPayments: number;
    qrPayments: number;
    pendingPayments: number;
    failedPayments: number;
    refunds: number;
    manualOverrides: number;
    providerReady: number;
    providerRequired: number;
    providerBlockers: number;
  };
  amounts: {
    paymentByCurrency: Record<string, number>;
    coinByCurrency: Record<string, number>;
    fiatByCurrency: Record<string, number>;
    refundByCurrency: Record<string, number>;
    pendingByCurrency: Record<string, number>;
    failedByCurrency: Record<string, number>;
  };
  controls: Array<{ key: string; status: "ok" | "warning" | "blocked" | string; title: string; detail: string }>;
  providers: AdminWalletProviderHealth[];
  recent: {
    plans: unknown[];
    subscriptions: unknown[];
    entitlements: unknown[];
    payments: unknown[];
    qrPayments: unknown[];
    ledgerEntries: unknown[];
  };
  rules: string[];
};

export type AdminWalletGiftPurchaseDashboard = {
  ok: true;
  generatedAt: string;
  liveReady: boolean;
  safeDisabled: boolean;
  summary: {
    giftCatalogItems: number;
    paidGiftPurchases: number;
    giftPayments: number;
    coinGiftPayments: number;
    fiatGiftPayments: number;
    qrGiftPayments: number;
    giftIncomeEntries: number;
    recipientCredits: number;
    platformFeeEntries: number;
    inventoryMovements: number;
    freeWonPromoGifts: number;
    blockedPromoIncome: number;
    pendingRelease: number;
    releasedIncome: number;
    failedPayments: number;
    refunds: number;
    providerReady: number;
    providerRequired: number;
    providerBlockers: number;
  };
  amounts: {
    paidByCurrency: Record<string, number>;
    coinByCurrency: Record<string, number>;
    fiatByCurrency: Record<string, number>;
    platformFeeByCurrency: Record<string, number>;
    recipientCreditByCurrency: Record<string, number>;
    pendingReleaseByCurrency: Record<string, number>;
    releasedByCurrency: Record<string, number>;
    refundsByCurrency: Record<string, number>;
  };
  controls: Array<{ key: string; status: "ok" | "warning" | "blocked" | string; title: string; detail: string }>;
  providers: AdminWalletProviderHealth[];
  recent: {
    gifts: unknown[];
    purchases: unknown[];
    payments: unknown[];
    qrPayments: unknown[];
    income: unknown[];
    inventory: unknown[];
    ledgerEntries: unknown[];
  };
  rules: string[];
};

export type AdminWalletCoinSecurityVaultDashboard = {
  ok: true;
  generatedAt: string;
  liveReady: boolean;
  safeDisabled: boolean;
  summary: {
    coinWallets: number;
    coinLedgerEntries: number;
    coinOperations: number;
    coinDeposits: number;
    coinCreditRequests: number;
    pendingApprovals: number;
    accountantRequired: number;
    aiRiskRequired: number;
    highRiskActions: number;
    lockedCoinEntries: number;
    emergencyHolds: number;
    unsignedLedgerEntries: number;
    hashChainGaps: number;
    providerReady: number;
    providerRequired: number;
    providerBlockers: number;
  };
  vaults: Array<{ key: string; title: string; status: "ok" | "warning" | "blocked" | string; detail: string; entries: number; amount: number }>;
  controls: Array<{ key: string; status: "ok" | "warning" | "blocked" | string; title: string; detail: string }>;
  compromiseProtection: Array<{ key: string; status: "ok" | "warning" | "blocked" | string; title: string; detail: string }>;
  providers: AdminWalletProviderHealth[];
  recent: {
    wallets: unknown[];
    ledgerEntries: unknown[];
    operations: unknown[];
    deposits: unknown[];
    creditRequests: unknown[];
  };
  rules: string[];
};

export type AdminWalletFiatDashboard = {
  ok: true;
  generatedAt: string;
  liveReady: boolean;
  safeDisabled: boolean;
  summary: {
    fiatWallets: number;
    lockedFiatWallets: number;
    balances: number;
    operations: number;
    pendingOperations: number;
    failedOperations: number;
    transactions: number;
    pendingTransactions: number;
    failedTransactions: number;
    ledgerEntries: number;
    providerReady: number;
    providerRequired: number;
    providerBlockers: number;
    riskHolds: number;
  };
  amounts: {
    balanceByCurrency: Record<string, number>;
    pendingByCurrency: Record<string, number>;
    failedByCurrency: Record<string, number>;
    feesByCurrency: Record<string, number>;
    transactionByCurrency: Record<string, number>;
  };
  providers: AdminWalletProviderHealth[];
  controls: Array<{ key: string; status: "ok" | "warning" | "blocked" | string; title: string; detail: string }>;
  recent: {
    wallets: unknown[];
    balances: unknown[];
    operations: unknown[];
    transactions: unknown[];
    ledgerEntries: unknown[];
  };
  rules: string[];
};

export type AdminWalletDashboard = {
  ok: true;
  generatedAt: string;
  launchReady: boolean;
  liveLaunchReady: boolean;
  safeDisabled: boolean;
  summary: {
    totalWallets: number;
    lockedWallets: number;
    mainWallets: number;
    coinWallets: number;
    cryptoWallets: number;
    businessWallets: number;
    merchantWallets: number;
    walletOperations: number;
    pendingOperations: number;
    failedOperations: number;
    transactions: number;
    pendingTransactions: number;
    failedTransactions: number;
    ledgerEntries: number;
    qrPayments: number;
    coinDeposits: number;
    coinCreditRequests: number;
    providerReady: number;
    providerRequired: number;
    providerBlockers: number;
    readinessScore: number;
  };
  amounts: {
    walletBalanceByCurrency: Record<string, number>;
    operationGrossByCurrency: Record<string, number>;
    operationFeesByCurrency: Record<string, number>;
    transactionGrossByCurrency: Record<string, number>;
    businessAvailableByCurrency: Record<string, number>;
    businessHoldByCurrency: Record<string, number>;
    merchantAvailableByCurrency: Record<string, number>;
    merchantHoldByCurrency: Record<string, number>;
    coinLockedPrincipal: number;
    coinAccruedInterest: number;
  };
  providers: AdminWalletProviderHealth[];
  blockers: Array<{ key: string; status: string; detail: string }>;
  checks: Array<{ key: string; status: "ok" | "warning" | "blocked"; title: string; detail: string }>;
  recent: {
    wallets: unknown[];
    operations: unknown[];
    transactions: unknown[];
    qrPayments: unknown[];
    coinDeposits: unknown[];
    coinCreditRequests: unknown[];
    businessWallets: unknown[];
    merchantWallets: unknown[];
  };
  rules: string[];
};

// PLAY-READY-41 REVIEWER EVIDENCE TYPES START
export type PlayReadyReviewerEvidenceHttpMethod = "GET";

export type PlayReadyReviewerEvidenceRouteId =
  | "summary"
  | "categories"
  | "manual_screenshots"
  | "permission_declarations"
  | "production_readiness_blockers"
  | "safety_status";

export type PlayReadyReviewerEvidenceEnvelope = {
  ok: boolean;
  module?: "play_ready_reviewer_evidence_center";
  version?: string;
  routeId?: string;
  generatedAt?: string;
  requiresAdminAuth?: true;
  readOnly?: true;
  runtimeDbWritePerformed?: false;
  providerExecutionPerformed?: false;
  walletStateChangePerformed?: false;
  moneyMovementPerformed?: false;
  fakeSuccessPerformed?: false;
  sourceEvidenceOnly?: true;
  [key: string]: unknown;
};

export type PlayReadyReviewerEvidenceClientResult = {
  ok: boolean;
  status: number;
  routeId: PlayReadyReviewerEvidenceRouteId;
  method: PlayReadyReviewerEvidenceHttpMethod;
  readOnly: true;
  json: PlayReadyReviewerEvidenceEnvelope | null;
  error?: string;
};
// PLAY-READY-41 REVIEWER EVIDENCE TYPES END


/**
 * BACKEND-STREAM-FOUNDATION-149C
 * Stream live/admin readiness is read-only and safe-disabled.
 * These types must not be used to enable provider runtime, credentials, DB writes, Wallet mutation, or money movement.
 */
export type StreamLiveAdminProviderStatus = "provider_not_configured" | "configured_disabled" | "runtime_disabled" | string;

export type StreamLiveAdminMountedRoute = {
  fullPath: string;
  mountedUnder?: string;
  routePath?: string;
  readOnly: boolean;
  protectedOrSafeDisabled?: boolean;
  unauthStatusCode?: number;
  healthOk?: boolean;
};

export type StreamLiveAdminProviderBoundary = {
  providerStatus: StreamLiveAdminProviderStatus;
  runtimeEnabled: false;
  providerCallPerformed?: false;
  providerCallAllowedNow?: false;
  providerBindingPerformed?: false;
  providerBindingAllowedNow?: false;
  providerCredentialReadPerformed?: false;
  providerCredentialReadAllowedNow?: false;
  providerTokenIssued?: false;
  providerTokenIssueAllowedNow?: false;
  mediaRoomCreated?: false;
  mediaRoomCreateAllowedNow?: false;
  dbReadWritePerformed?: false;
  dbWriteAllowedNow?: false;
  walletMutationPerformed?: false;
  walletMutationAllowedNow?: false;
  moneyMovementPerformed?: false;
  moneyMovementAllowedNow?: false;
  fakeSuccessAllowed?: false;
  fakeSuccessAllowedNow?: false;
};

export type StreamLiveAdminReadinessSnapshot = {
  status?: string;
  readOnly: true;
  mountedRoute?: StreamLiveAdminMountedRoute;
  providerBoundary?: StreamLiveAdminProviderBoundary;
  providerStatus?: StreamLiveAdminProviderStatus;
  runtimeEnabled?: false;
  healthOk?: boolean;
  routeProtectedOrSafeDisabled?: boolean;
  generatedAt?: string;
  checks?: Array<{
    key: string;
    status: "pass" | "warn" | "blocked" | string;
    label?: string;
    value?: string | number | boolean | null;
  }>;
};

export type StreamLiveAdminReadinessApiResponse = StreamLiveAdminReadinessSnapshot & {
  ok?: true;
};


// BACKEND-STREAM-FOUNDATION-156C STREAM REALTIME MEDIA LIFECYCLE ADMIN UI TYPES START
export type StreamRealtimeMediaLifecycleAdminReadinessSnapshot156C = {
  version?: string;
  status?: string;
  providerStatus?: "provider_not_configured" | string;
  runtimeEnabled?: false | boolean;
  providerCallAllowedNow?: false | boolean;
  providerBindingAllowedNow?: false | boolean;
  databaseWriteAllowedNow?: false | boolean;
  walletMutationAllowedNow?: false | boolean;
  moneyMovementAllowedNow?: false | boolean;
  fakeSuccessAllowedNow?: false | boolean;
  [key: string]: unknown;
};

export type StreamRealtimeMediaLifecycleAdminReadinessClientResult156C = {
  ok: boolean;
  status: number;
  readOnly: true;
  endpoint: "/api/admin/stream/realtime-media-lifecycle/readiness";
  json: StreamRealtimeMediaLifecycleAdminReadinessSnapshot156C | null;
  providerStatus: "provider_not_configured" | string;
  runtimeEnabled: false | boolean;
  providerCallAllowedNow: false | boolean;
  databaseWriteAllowedNow: false | boolean;
  walletMutationAllowedNow: false | boolean;
  moneyMovementAllowedNow: false | boolean;
  fakeSuccessAllowedNow: false | boolean;
  error?: string;
};
// BACKEND-STREAM-FOUNDATION-156C STREAM REALTIME MEDIA LIFECYCLE ADMIN UI TYPES END
