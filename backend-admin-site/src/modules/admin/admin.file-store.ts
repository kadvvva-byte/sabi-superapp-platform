import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getAdminStatePath } from "./admin.config";
import { getAdminRoleDefinition, getAdminRolePermissions } from "./admin.roles";
import type {
  AdminAuditEntry,
  AdminAuditExportBundle,
  AdminAuditIntegrityReport,
  AdminAuditSecurityState,
  AdminRiskCase,
  AdminRiskConsoleState,
  AdminRiskDashboard,
  AdminRiskSignal,
  AdminRiskSignalSeverity,
  AdminRiskSignalSource,
  AdminRiskSignalStatus,
  AdminRiskSignalTargetType,
  AdminBusinessAccount,
  AdminBusinessDashboard,
  AdminBusinessKybStatus,
  AdminBusinessRiskLevel,
  AdminBusinessSettlement,
  AdminBusinessSettlementStatus,
  AdminBusinessStatus,
  AdminFinanceDashboard,
  AdminFinanceExportBundle,
  AdminFinanceReport,
  AdminFinanceReportKind,
  AdminFinanceReportStatus,
  AdminEmergencyDashboard,
  AdminEmergencyLock,
  AdminEmergencyLockScope,
  AdminOwnerCriticalConfirmation,
  AdminOwnerCriticalConfirmationKind,
  AdminOwnerCriticalConfirmationStatus,
  AdminOwnerSecurityCenterState,
  AdminMerchantAccount,
  AdminMerchantDashboard,
  AdminMerchantKybStatus,
  AdminMerchantRiskLevel,
  AdminMerchantSettlement,
  AdminMerchantSettlementStatus,
  AdminMerchantStatus,
  AdminRole,
  AdminStaffAccessUser,
  AdminStaffPublicAccessUser,
  AdminStaffSessionVerifyResult,
  AdminState,
  AdminRestrictionState,
} from "./admin.types";

const DEFAULT_STATE: AdminState = {
  audit: [],
  restrictions: [],
  riskCases: [],
  riskSignals: [],
  staffUsers: [],
  staffSessions: [],
  merchants: [],
  merchantSettlements: [],
  businesses: [],
  businessSettlements: [],
  financeReports: [],
  ownerConfirmations: [],
  emergencyLocks: [],
};

function createId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

function normalizeText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeRole(value: unknown): AdminRole {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "viewer";
  if (raw === "owner" || raw === "root_owner") return "viewer";
  const roleDefinition = getAdminRoleDefinition(raw);
  return roleDefinition?.key ?? "viewer";
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && Boolean(item.trim())).map((item) => item.trim());
}

function toPublicStaffUser(staff: AdminStaffAccessUser): AdminStaffPublicAccessUser {
  const { passwordHash: _passwordHash, twoFactorSecret: _twoFactorSecret, ...publicStaff } = staff;
  return publicStaff;
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function isExpired(iso: string): boolean {
  return new Date(iso).getTime() <= Date.now();
}


function normalizeMerchantStatus(value: unknown, fallback: AdminMerchantStatus = "pending_review"): AdminMerchantStatus {
  return value === "active" || value === "restricted" || value === "suspended" || value === "closed" || value === "pending_review" ? value : fallback;
}

function normalizeMerchantKybStatus(value: unknown, fallback: AdminMerchantKybStatus = "not_started"): AdminMerchantKybStatus {
  return value === "pending" || value === "approved" || value === "rejected" || value === "not_started" ? value : fallback;
}

function normalizeMerchantRiskLevel(value: unknown, fallback: AdminMerchantRiskLevel = "medium"): AdminMerchantRiskLevel {
  return value === "low" || value === "medium" || value === "high" || value === "critical" ? value : fallback;
}

function normalizeSettlementStatus(value: unknown, fallback: AdminMerchantSettlementStatus = "pending"): AdminMerchantSettlementStatus {
  return value === "pending" || value === "approved" || value === "paid" || value === "held" || value === "cancelled" ? value : fallback;
}

function normalizeBusinessStatus(value: unknown, fallback: AdminBusinessStatus = "pending_review"): AdminBusinessStatus {
  return value === "active" || value === "restricted" || value === "suspended" || value === "closed" || value === "pending_review" ? value : fallback;
}

function normalizeBusinessKybStatus(value: unknown, fallback: AdminBusinessKybStatus = "not_started"): AdminBusinessKybStatus {
  return value === "pending" || value === "approved" || value === "rejected" || value === "not_started" ? value : fallback;
}

function normalizeBusinessRiskLevel(value: unknown, fallback: AdminBusinessRiskLevel = "medium"): AdminBusinessRiskLevel {
  return value === "low" || value === "medium" || value === "high" || value === "critical" ? value : fallback;
}

function normalizeBusinessSettlementStatus(value: unknown, fallback: AdminBusinessSettlementStatus = "pending"): AdminBusinessSettlementStatus {
  return value === "pending" || value === "approved" || value === "paid" || value === "held" || value === "cancelled" ? value : fallback;
}

function normalizeFinanceReportKind(value: unknown, fallback: AdminFinanceReportKind = "custom"): AdminFinanceReportKind {
  return value === "daily" || value === "weekly" || value === "monthly" || value === "custom" ? value : fallback;
}

function normalizeFinanceReportStatus(value: unknown, fallback: AdminFinanceReportStatus = "ready"): AdminFinanceReportStatus {
  return value === "draft" || value === "ready" || value === "exported" || value === "locked" ? value : fallback;
}



function normalizeOwnerConfirmationStatus(value: unknown, fallback: AdminOwnerCriticalConfirmationStatus = "pending"): AdminOwnerCriticalConfirmationStatus {
  return value === "pending" || value === "approved" || value === "rejected" || value === "expired" ? value : fallback;
}

function normalizeOwnerConfirmationKind(value: unknown, fallback: AdminOwnerCriticalConfirmationKind = "custom"): AdminOwnerCriticalConfirmationKind {
  return value === "provider_secret_change" || value === "provider_disable" || value === "provider_enable" || value === "staff_role_change" || value === "staff_revoke" || value === "settlement_release" || value === "wallet_route_change" || value === "security_policy_change" || value === "emergency_lock" || value === "system_maintenance" || value === "custom" ? value : fallback;
}

function normalizeOwnerRiskLevel(value: unknown, fallback: "high" | "critical" = "critical"): "high" | "critical" {
  return value === "high" || value === "critical" ? value : fallback;
}

function normalizeRiskSignalSource(value: unknown, fallback: AdminRiskSignalSource = "admin"): AdminRiskSignalSource {
  return value === "ai" || value === "wallet" || value === "merchant" || value === "business" || value === "messenger" || value === "qr" || value === "admin" || value === "system" ? value : fallback;
}

function normalizeRiskSignalSeverity(value: unknown, fallback: AdminRiskSignalSeverity = "medium"): AdminRiskSignalSeverity {
  return value === "low" || value === "medium" || value === "high" || value === "critical" ? value : fallback;
}

function normalizeRiskSignalStatus(value: unknown, fallback: AdminRiskSignalStatus = "new"): AdminRiskSignalStatus {
  return value === "new" || value === "acknowledged" || value === "under_review" || value === "restricted" || value === "resolved" || value === "rejected" ? value : fallback;
}

function normalizeRiskSignalTargetType(value: unknown): AdminRiskSignalTargetType | undefined {
  return value === "user" || value === "merchant" || value === "business" || value === "wallet" || value === "provider" || value === "system" ? value : undefined;
}


function normalizeNumber(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(numeric) ? numeric : fallback;
}


function normalizeEmergencyLockScope(value: unknown, fallback: AdminEmergencyLockScope = "system"): AdminEmergencyLockScope {
  return value === "all" || value === "providers" || value === "wallet" || value === "merchant" || value === "business" || value === "settlements" || value === "staff" || value === "qr" || value === "ai" || value === "system" ? value : fallback;
}


function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value;
  const record = value as Record<string, unknown>;
  const sorted: Record<string, unknown> = {};
  for (const key of Object.keys(record).sort()) sorted[key] = stableValue(record[key]);
  return sorted;
}

function stableJson(value: unknown): string {
  return JSON.stringify(stableValue(value));
}

function hashAuditPayload(value: unknown): string {
  return crypto.createHash("sha256").update(stableJson(value)).digest("hex");
}

function auditHashPayload(entry: AdminAuditEntry): Record<string, unknown> {
  return {
    id: entry.id,
    sequence: entry.sequence,
    prevHash: entry.prevHash ?? null,
    action: entry.action,
    adminId: entry.adminId,
    role: entry.role,
    targetType: entry.targetType ?? null,
    targetId: entry.targetId ?? null,
    ip: entry.ip ?? null,
    userAgent: entry.userAgent ?? null,
    metadata: entry.metadata ?? null,
    createdAt: entry.createdAt,
    integrityVersion: entry.integrityVersion ?? "sha256-v1",
  };
}

function signAuditEntry(entry: AdminAuditEntry): AdminAuditEntry {
  const prepared: AdminAuditEntry = {
    ...entry,
    integrityVersion: "sha256-v1",
  };
  return {
    ...prepared,
    hash: hashAuditPayload(auditHashPayload(prepared)),
  };
}

function protectedAuditEntries(entries: AdminAuditEntry[]): AdminAuditEntry[] {
  return entries
    .filter((entry) => typeof entry.sequence === "number" && entry.integrityVersion === "sha256-v1" && typeof entry.hash === "string")
    .sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
}

function cloneState(state: AdminState): AdminState {
  return {
    audit: [...state.audit],
    restrictions: [...state.restrictions],
    riskCases: [...state.riskCases],
    riskSignals: [...(state.riskSignals ?? [])],
    staffUsers: [...state.staffUsers],
    staffSessions: [...(state.staffSessions ?? [])],
    merchants: [...state.merchants],
    merchantSettlements: [...state.merchantSettlements],
    businesses: [...state.businesses],
    businessSettlements: [...state.businessSettlements],
    financeReports: [...(state.financeReports ?? [])],
    ownerConfirmations: [...(state.ownerConfirmations ?? [])],
    emergencyLocks: [...(state.emergencyLocks ?? [])],
  };
}

export class AdminFileStore {
  private readonly filePath: string;

  constructor(filePath = getAdminStatePath()) {
    this.filePath = path.resolve(process.cwd(), filePath);
  }

  read(): AdminState {
    try {
      if (!fs.existsSync(this.filePath)) {
        return cloneState(DEFAULT_STATE);
      }

      const raw = fs.readFileSync(this.filePath, "utf8");
      const parsed = JSON.parse(raw) as Partial<AdminState>;

      return {
        audit: Array.isArray(parsed.audit) ? parsed.audit : [],
        restrictions: Array.isArray(parsed.restrictions) ? parsed.restrictions : [],
        riskCases: Array.isArray(parsed.riskCases) ? parsed.riskCases : [],
        riskSignals: Array.isArray(parsed.riskSignals) ? parsed.riskSignals : [],
        staffUsers: Array.isArray(parsed.staffUsers) ? parsed.staffUsers : [],
        staffSessions: Array.isArray(parsed.staffSessions) ? parsed.staffSessions : [],
        merchants: Array.isArray(parsed.merchants) ? parsed.merchants : [],
        merchantSettlements: Array.isArray(parsed.merchantSettlements) ? parsed.merchantSettlements : [],
        businesses: Array.isArray(parsed.businesses) ? parsed.businesses : [],
        businessSettlements: Array.isArray(parsed.businessSettlements) ? parsed.businessSettlements : [],
        financeReports: Array.isArray(parsed.financeReports) ? parsed.financeReports : [],
        ownerConfirmations: Array.isArray(parsed.ownerConfirmations) ? parsed.ownerConfirmations : [],
        emergencyLocks: Array.isArray(parsed.emergencyLocks) ? parsed.emergencyLocks : [],
      };
    } catch {
      return cloneState(DEFAULT_STATE);
    }
  }

  write(state: AdminState): void {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify(state, null, 2), "utf8");
  }

  appendAudit(entry: Omit<AdminAuditEntry, "id" | "createdAt" | "sequence" | "prevHash" | "hash" | "integrityVersion">): AdminAuditEntry {
    const state = this.read();
    const protectedEntries = protectedAuditEntries(state.audit);
    const previous = protectedEntries[protectedEntries.length - 1] ?? null;
    const created = signAuditEntry({
      ...entry,
      id: createId("audit"),
      sequence: previous?.sequence ? previous.sequence + 1 : 1,
      prevHash: previous?.hash ?? null,
      createdAt: new Date().toISOString(),
      integrityVersion: "sha256-v1",
    });

    state.audit = [created, ...state.audit].slice(0, 1000);
    this.write(state);
    return created;
  }

  listAudit(limit = 100): AdminAuditEntry[] {
    return this.read().audit.slice(0, limit);
  }

  verifyAuditIntegrity(): AdminAuditIntegrityReport {
    const entries = this.read().audit;
    const protectedEntries = protectedAuditEntries(entries);
    const legacyEntries = entries.length - protectedEntries.length;
    let previousHash: string | null = null;
    let verifiedEntries = 0;

    for (const entry of protectedEntries) {
      const expectedPrevHash = previousHash;
      const actualPrevHash = entry.prevHash ?? null;
      if (actualPrevHash !== expectedPrevHash) {
        return {
          ok: false,
          algorithm: "sha256",
          integrityVersion: "sha256-v1",
          totalEntries: entries.length,
          protectedEntries: protectedEntries.length,
          legacyEntries,
          verifiedEntries,
          anchorHash: protectedEntries[protectedEntries.length - 1]?.hash ?? null,
          brokenAtId: entry.id,
          brokenAtSequence: entry.sequence,
          reason: "previous_hash_mismatch",
          expectedPrevHash,
          actualPrevHash,
          generatedAt: new Date().toISOString(),
        };
      }

      const expectedHash = hashAuditPayload(auditHashPayload(entry));
      if (entry.hash !== expectedHash) {
        return {
          ok: false,
          algorithm: "sha256",
          integrityVersion: "sha256-v1",
          totalEntries: entries.length,
          protectedEntries: protectedEntries.length,
          legacyEntries,
          verifiedEntries,
          anchorHash: protectedEntries[protectedEntries.length - 1]?.hash ?? null,
          brokenAtId: entry.id,
          brokenAtSequence: entry.sequence,
          reason: "entry_hash_mismatch",
          expectedHash,
          actualHash: entry.hash,
          generatedAt: new Date().toISOString(),
        };
      }

      previousHash = entry.hash ?? null;
      verifiedEntries += 1;
    }

    return {
      ok: true,
      algorithm: "sha256",
      integrityVersion: "sha256-v1",
      totalEntries: entries.length,
      protectedEntries: protectedEntries.length,
      legacyEntries,
      verifiedEntries,
      anchorHash: protectedEntries[protectedEntries.length - 1]?.hash ?? null,
      generatedAt: new Date().toISOString(),
    };
  }

  getAuditSecurityState(retentionLimit = 1000): AdminAuditSecurityState {
    const integrity = this.verifyAuditIntegrity();
    return {
      appendOnly: true,
      hashChained: true,
      deleteSupported: false,
      exportSupported: true,
      retentionLimit,
      protectedEntries: integrity.protectedEntries,
      legacyEntries: integrity.legacyEntries,
      anchorHash: integrity.anchorHash,
      rules: [
        "audit_entries_are_never_deleted_by_admin_api",
        "every_new_entry_is_hash_chained",
        "old_legacy_entries_are_read_only_and_marked_as_legacy",
        "exports_include_integrity_report_and_anchor_hash",
        "manual_file_tampering_is_detected_by_integrity_check",
      ],
    };
  }

  exportAuditBundle(limit = 1000, exportedBy = "env-admin"): AdminAuditExportBundle {
    return {
      ok: true,
      exportedAt: new Date().toISOString(),
      exportedBy,
      integrity: this.verifyAuditIntegrity(),
      entries: this.listAudit(limit),
    };
  }

  restrictUser(input: Omit<AdminRestrictionState, "id" | "createdAt" | "status">): AdminRestrictionState {
    const state = this.read();
    const active = state.restrictions.find(
      (item) => item.userId === input.userId && item.scope === input.scope && item.status === "active",
    );

    if (active) return active;

    const created: AdminRestrictionState = {
      ...input,
      id: createId("restriction"),
      status: "active",
      createdAt: new Date().toISOString(),
    };

    state.restrictions = [created, ...state.restrictions];
    this.write(state);
    return created;
  }

  releaseUserRestriction(userId: string, scope: string, adminId: string): AdminRestrictionState | null {
    const state = this.read();
    const index = state.restrictions.findIndex(
      (item) => item.userId === userId && item.scope === scope && item.status === "active",
    );

    if (index < 0) return null;

    const updated: AdminRestrictionState = {
      ...state.restrictions[index],
      status: "released",
      releasedBy: adminId,
      releasedAt: new Date().toISOString(),
    };

    state.restrictions[index] = updated;
    this.write(state);
    return updated;
  }

  listRestrictions(userId?: string): AdminRestrictionState[] {
    const restrictions = this.read().restrictions;
    return userId ? restrictions.filter((item) => item.userId === userId) : restrictions;
  }

  listRiskCases(limit = 100): AdminRiskCase[] {
    return this.read().riskCases.slice(0, limit);
  }

  createRiskCase(input: Omit<AdminRiskCase, "id" | "createdAt" | "updatedAt" | "status"> & { status?: AdminRiskCase["status"] }): AdminRiskCase {
    const state = this.read();
    const now = new Date().toISOString();
    const created: AdminRiskCase = {
      ...input,
      id: createId("risk"),
      status: input.status ?? "open",
      createdAt: now,
      updatedAt: now,
    };

    state.riskCases = [created, ...state.riskCases];
    this.write(state);
    return created;
  }


  listRiskSignals(limit = 100): AdminRiskSignal[] {
    return (this.read().riskSignals ?? []).slice(0, limit);
  }

  createRiskSignal(input: {
    source?: unknown;
    category?: unknown;
    severity?: unknown;
    status?: unknown;
    targetType?: unknown;
    targetId?: unknown;
    title?: unknown;
    description?: unknown;
    recommendedAction?: unknown;
    assignedTo?: unknown;
    createdBy: string;
    metadata?: Record<string, unknown>;
  }): AdminRiskSignal {
    const state = this.read();
    const now = new Date().toISOString();
    const created: AdminRiskSignal = {
      id: createId("risk_signal"),
      source: normalizeRiskSignalSource(input.source),
      category: normalizeText(input.category) ?? "manual_review",
      severity: normalizeRiskSignalSeverity(input.severity),
      status: normalizeRiskSignalStatus(input.status),
      targetType: normalizeRiskSignalTargetType(input.targetType),
      targetId: normalizeText(input.targetId),
      title: normalizeText(input.title) ?? "Risk signal",
      description: normalizeText(input.description),
      recommendedAction: normalizeText(input.recommendedAction),
      assignedTo: normalizeText(input.assignedTo),
      createdBy: input.createdBy,
      createdAt: now,
      updatedAt: now,
      metadata: input.metadata,
    };

    state.riskSignals = [created, ...(state.riskSignals ?? [])].slice(0, 1000);
    this.write(state);
    return created;
  }

  acknowledgeRiskSignal(signalId: string, adminId: string): AdminRiskSignal | null {
    const state = this.read();
    const index = (state.riskSignals ?? []).findIndex((item) => item.id === signalId);
    if (index < 0) return null;
    const now = new Date().toISOString();
    const updated: AdminRiskSignal = {
      ...state.riskSignals[index],
      status: state.riskSignals[index].status === "new" ? "acknowledged" : state.riskSignals[index].status,
      acknowledgedBy: adminId,
      acknowledgedAt: now,
      updatedAt: now,
    };
    state.riskSignals[index] = updated;
    this.write(state);
    return updated;
  }

  resolveRiskSignal(signalId: string, status: unknown, adminId: string): AdminRiskSignal | null {
    const state = this.read();
    const index = (state.riskSignals ?? []).findIndex((item) => item.id === signalId);
    if (index < 0) return null;
    const now = new Date().toISOString();
    const nextStatus = normalizeRiskSignalStatus(status, "resolved");
    const updated: AdminRiskSignal = {
      ...state.riskSignals[index],
      status: nextStatus,
      resolvedBy: nextStatus === "resolved" || nextStatus === "rejected" ? adminId : state.riskSignals[index].resolvedBy,
      resolvedAt: nextStatus === "resolved" || nextStatus === "rejected" ? now : state.riskSignals[index].resolvedAt,
      updatedAt: now,
    };
    state.riskSignals[index] = updated;
    this.write(state);
    return updated;
  }

  getRiskDashboard(): AdminRiskDashboard {
    const state = this.read();
    const openCases = state.riskCases.filter((item) => item.status === "open" || item.status === "reviewing");
    const activeRestrictions = state.restrictions.filter((item) => item.status === "active");
    const signals = state.riskSignals ?? [];
    return {
      openCases: openCases.length,
      criticalCases: openCases.filter((item) => item.severity === "critical").length,
      highCases: openCases.filter((item) => item.severity === "high").length,
      activeRestrictions: activeRestrictions.length + state.merchants.filter((item) => item.status === "restricted" || item.status === "suspended").length + state.businesses.filter((item) => item.status === "restricted" || item.status === "suspended").length,
      activeUserRestrictions: activeRestrictions.length,
      restrictedMerchants: state.merchants.filter((item) => item.status === "restricted" || item.status === "suspended").length,
      restrictedBusinesses: state.businesses.filter((item) => item.status === "restricted" || item.status === "suspended").length,
      newSignals: signals.filter((item) => item.status === "new").length,
      signalsUnderReview: signals.filter((item) => item.status === "acknowledged" || item.status === "under_review" || item.status === "restricted").length,
      criticalSignals: signals.filter((item) => item.severity === "critical" && item.status !== "resolved" && item.status !== "rejected").length,
      generatedAt: new Date().toISOString(),
    };
  }

  getRiskConsole(limit = 200): AdminRiskConsoleState {
    return {
      dashboard: this.getRiskDashboard(),
      riskCases: this.listRiskCases(limit),
      riskSignals: this.listRiskSignals(limit),
      restrictions: this.listRestrictions(),
      rules: [
        "ai_risk_signals_are_not_final_guilt_decisions",
        "critical_physical_harm_requires_immediate_escalation",
        "aml_kyc_fraud_signals_use_safe_hold_and_admin_review",
        "provider_secrets_are_never_visible_in_risk_console",
        "every_risk_action_is_recorded_in_immutable_audit",
      ],
    };
  }

  listStaffUsers(): AdminStaffPublicAccessUser[] {
    return this.read().staffUsers.map(toPublicStaffUser);
  }

  createStaffUser(input: {
    displayName?: string;
    email?: string;
    phone?: string;
    role?: string;
    notes?: string;
    allowedIpCidrs?: string[];
    deviceBinding?: "optional" | "required";
    clientScope?: { merchantId?: string; businessId?: string };
    createdBy: string;
  }): AdminStaffPublicAccessUser {
    const state = this.read();
    const now = new Date().toISOString();
    const role = normalizeRole(input.role);
    const roleDefinition = getAdminRoleDefinition(role);
    const created: AdminStaffAccessUser = {
      id: createId("staff"),
      displayName: normalizeText(input.displayName) ?? normalizeText(input.email) ?? normalizeText(input.phone) ?? role,
      email: normalizeText(input.email),
      phone: normalizeText(input.phone),
      role,
      permissions: roleDefinition?.permissions ?? getAdminRolePermissions(role),
      status: "active",
      requireTwoFactor: true,
      allowedIpCidrs: normalizeStringArray(input.allowedIpCidrs),
      deviceBinding: input.deviceBinding === "required" ? "required" : "optional",
      clientScope: input.clientScope,
      notes: normalizeText(input.notes),
      createdBy: input.createdBy,
      updatedBy: input.createdBy,
      createdAt: now,
      updatedAt: now,
    };

    state.staffUsers = [created, ...state.staffUsers];
    this.write(state);
    return toPublicStaffUser(created);
  }

  updateStaffUser(staffId: string, input: {
    displayName?: string;
    email?: string;
    phone?: string;
    role?: string;
    status?: AdminStaffAccessUser["status"];
    notes?: string;
    allowedIpCidrs?: string[];
    deviceBinding?: "optional" | "required";
    clientScope?: { merchantId?: string; businessId?: string };
    updatedBy: string;
  }): AdminStaffPublicAccessUser | null {
    const state = this.read();
    const index = state.staffUsers.findIndex((item) => item.id === staffId);
    if (index < 0) return null;

    const current = state.staffUsers[index];
    const role = input.role ? normalizeRole(input.role) : current.role;
    const status = input.status === "disabled" || input.status === "revoked" || input.status === "active" ? input.status : current.status;
    const updated: AdminStaffAccessUser = {
      ...current,
      displayName: normalizeText(input.displayName) ?? current.displayName,
      email: input.email === undefined ? current.email : normalizeText(input.email),
      phone: input.phone === undefined ? current.phone : normalizeText(input.phone),
      role,
      permissions: getAdminRolePermissions(role),
      status,
      notes: input.notes === undefined ? current.notes : normalizeText(input.notes),
      allowedIpCidrs: input.allowedIpCidrs === undefined ? current.allowedIpCidrs : normalizeStringArray(input.allowedIpCidrs),
      deviceBinding: input.deviceBinding === "required" || input.deviceBinding === "optional" ? input.deviceBinding : current.deviceBinding,
      clientScope: input.clientScope === undefined ? current.clientScope : input.clientScope,
      updatedBy: input.updatedBy,
      updatedAt: new Date().toISOString(),
    };

    state.staffUsers[index] = updated;
    this.write(state);
    return toPublicStaffUser(updated);
  }

  revokeStaffUser(staffId: string, adminId: string): AdminStaffPublicAccessUser | null {
    const state = this.read();
    const index = state.staffUsers.findIndex((item) => item.id === staffId);
    if (index < 0) return null;
    const now = new Date().toISOString();
    const updated: AdminStaffAccessUser = {
      ...state.staffUsers[index],
      status: "revoked",
      revokedBy: adminId,
      revokedAt: now,
      updatedBy: adminId,
      updatedAt: now,
    };
    state.staffUsers[index] = updated;
    this.write(state);
    return toPublicStaffUser(updated);
  }

  verifyStaffSession(token: string): AdminStaffSessionVerifyResult | null {
    const state = this.read();
    const tokenHash = hashToken(token);
    const sessions = state.staffSessions ?? [];
    const sessionIndex = sessions.findIndex((item) => item.tokenHash === tokenHash);
    if (sessionIndex < 0) return null;

    const session = sessions[sessionIndex];
    if (session.status !== "active" || isExpired(session.expiresAt)) {
      sessions[sessionIndex] = { ...session, status: session.status === "active" ? "expired" : session.status };
      state.staffSessions = sessions;
      this.write(state);
      return null;
    }

    const staff = state.staffUsers.find((item) => item.id === session.staffId && item.status === "active" && item.loginEnabled);
    if (!staff) return null;

    sessions[sessionIndex] = { ...session, lastSeenAt: new Date().toISOString() };
    state.staffSessions = sessions;
    this.write(state);

    const admin = this.toPrincipal(staff, session.id);
    return { ok: true, admin, staff: toPublicStaffUser(staff), expiresAt: session.expiresAt };
  }

  private toPrincipal(staff: AdminStaffAccessUser, sessionId: string) {
    return {
      id: staff.loginUsername ?? staff.id,
      staffId: staff.id,
      sessionId,
      role: staff.role,
      permissions: staff.permissions,
      tokenSource: "staff-session" as const,
      rootOwner: false,
    };
  }

  getMerchantDashboard(): AdminMerchantDashboard {
    const state = this.read();
    const merchants = state.merchants;
    const pendingSettlements = state.merchantSettlements.filter((item) => item.status === "pending" || item.status === "approved").length;
    return {
      total: merchants.length,
      active: merchants.filter((item) => item.status === "active").length,
      restricted: merchants.filter((item) => item.status === "restricted" || item.status === "suspended").length,
      pendingReview: merchants.filter((item) => item.status === "pending_review").length,
      kybPending: merchants.filter((item) => item.kybStatus === "pending" || item.kybStatus === "not_started").length,
      settlementsPending: pendingSettlements,
      riskHighOrCritical: merchants.filter((item) => item.riskLevel === "high" || item.riskLevel === "critical").length,
      generatedAt: new Date().toISOString(),
    };
  }

  listMerchants(query?: string): AdminMerchantAccount[] {
    const merchants = this.read().merchants;
    const q = normalizeText(query)?.toLowerCase();
    if (!q) return merchants;
    return merchants.filter((item) => [
      item.id,
      item.ownerUserId,
      item.legalName,
      item.tradeName,
      item.username,
      item.category,
      item.country,
      item.city,
      item.phone,
      item.email,
      item.status,
      item.kybStatus,
      item.riskLevel,
    ].filter(Boolean).join(" ").toLowerCase().includes(q));
  }

  getMerchant(merchantId: string): AdminMerchantAccount | null {
    return this.read().merchants.find((item) => item.id === merchantId) ?? null;
  }

  createMerchant(input: {
    ownerUserId?: string;
    legalName?: string;
    tradeName?: string;
    username?: string;
    category?: string;
    country?: string;
    city?: string;
    phone?: string;
    email?: string;
    status?: string;
    kybStatus?: string;
    riskLevel?: string;
    settlementStatus?: "not_configured" | "ready" | "hold";
    walletRoute?: "merchant_wallet" | "business_wallet_pending" | "provider_not_configured";
    allowQrPay?: boolean;
    commissionPercent?: number;
    notes?: string;
    createdBy: string;
  }): AdminMerchantAccount {
    const state = this.read();
    const now = new Date().toISOString();
    const legalName = normalizeText(input.legalName) ?? normalizeText(input.tradeName) ?? "Merchant";
    const tradeName = normalizeText(input.tradeName) ?? legalName;
    const created: AdminMerchantAccount = {
      id: createId("merchant"),
      ownerUserId: normalizeText(input.ownerUserId),
      legalName,
      tradeName,
      username: normalizeText(input.username),
      category: normalizeText(input.category),
      country: normalizeText(input.country),
      city: normalizeText(input.city),
      phone: normalizeText(input.phone),
      email: normalizeText(input.email),
      status: normalizeMerchantStatus(input.status),
      kybStatus: normalizeMerchantKybStatus(input.kybStatus),
      riskLevel: normalizeMerchantRiskLevel(input.riskLevel),
      settlementStatus: input.settlementStatus === "ready" || input.settlementStatus === "hold" ? input.settlementStatus : "not_configured",
      walletRoute: input.walletRoute === "merchant_wallet" || input.walletRoute === "business_wallet_pending" ? input.walletRoute : "provider_not_configured",
      allowQrPay: typeof input.allowQrPay === "boolean" ? input.allowQrPay : false,
      commissionPercent: Math.max(0, normalizeNumber(input.commissionPercent, 0)),
      notes: normalizeText(input.notes),
      createdBy: input.createdBy,
      updatedBy: input.createdBy,
      createdAt: now,
      updatedAt: now,
    };
    state.merchants = [created, ...state.merchants];
    this.write(state);
    return created;
  }

  updateMerchant(merchantId: string, input: Partial<AdminMerchantAccount> & { updatedBy: string }): AdminMerchantAccount | null {
    const state = this.read();
    const index = state.merchants.findIndex((item) => item.id === merchantId);
    if (index < 0) return null;
    const current = state.merchants[index];
    const updated: AdminMerchantAccount = {
      ...current,
      ownerUserId: input.ownerUserId === undefined ? current.ownerUserId : normalizeText(input.ownerUserId),
      legalName: normalizeText(input.legalName) ?? current.legalName,
      tradeName: normalizeText(input.tradeName) ?? current.tradeName,
      username: input.username === undefined ? current.username : normalizeText(input.username),
      category: input.category === undefined ? current.category : normalizeText(input.category),
      country: input.country === undefined ? current.country : normalizeText(input.country),
      city: input.city === undefined ? current.city : normalizeText(input.city),
      phone: input.phone === undefined ? current.phone : normalizeText(input.phone),
      email: input.email === undefined ? current.email : normalizeText(input.email),
      status: input.status === undefined ? current.status : normalizeMerchantStatus(input.status, current.status),
      kybStatus: input.kybStatus === undefined ? current.kybStatus : normalizeMerchantKybStatus(input.kybStatus, current.kybStatus),
      riskLevel: input.riskLevel === undefined ? current.riskLevel : normalizeMerchantRiskLevel(input.riskLevel, current.riskLevel),
      settlementStatus: input.settlementStatus === "ready" || input.settlementStatus === "hold" || input.settlementStatus === "not_configured" ? input.settlementStatus : current.settlementStatus,
      walletRoute: input.walletRoute === "merchant_wallet" || input.walletRoute === "business_wallet_pending" || input.walletRoute === "provider_not_configured" ? input.walletRoute : current.walletRoute,
      allowQrPay: typeof input.allowQrPay === "boolean" ? input.allowQrPay : current.allowQrPay,
      commissionPercent: input.commissionPercent === undefined ? current.commissionPercent : Math.max(0, normalizeNumber(input.commissionPercent, current.commissionPercent)),
      notes: input.notes === undefined ? current.notes : normalizeText(input.notes),
      restrictedBy: Object.prototype.hasOwnProperty.call(input, "restrictedBy") ? normalizeText(input.restrictedBy) : current.restrictedBy,
      restrictedAt: Object.prototype.hasOwnProperty.call(input, "restrictedAt") ? normalizeText(input.restrictedAt) : current.restrictedAt,
      restrictionReason: Object.prototype.hasOwnProperty.call(input, "restrictionReason") ? normalizeText(input.restrictionReason) : current.restrictionReason,
      updatedBy: input.updatedBy,
      updatedAt: new Date().toISOString(),
    };
    state.merchants[index] = updated;
    this.write(state);
    return updated;
  }

  restrictMerchant(merchantId: string, reason: string, adminId: string): AdminMerchantAccount | null {
    return this.updateMerchant(merchantId, {
      status: "restricted",
      settlementStatus: "hold",
      allowQrPay: false,
      restrictionReason: normalizeText(reason) ?? "admin_review",
      restrictedBy: adminId,
      restrictedAt: new Date().toISOString(),
      updatedBy: adminId,
    });
  }

  releaseMerchantRestriction(merchantId: string, adminId: string): AdminMerchantAccount | null {
    return this.updateMerchant(merchantId, {
      status: "active",
      restrictionReason: undefined,
      restrictedBy: undefined,
      restrictedAt: undefined,
      updatedBy: adminId,
    });
  }

  listMerchantSettlements(merchantId?: string): AdminMerchantSettlement[] {
    const settlements = this.read().merchantSettlements;
    return merchantId ? settlements.filter((item) => item.merchantId === merchantId) : settlements;
  }

  createMerchantSettlement(input: {
    merchantId: string;
    amount?: number;
    currency?: string;
    status?: string;
    providerRef?: string;
    notes?: string;
    createdBy: string;
  }): AdminMerchantSettlement | null {
    const state = this.read();
    if (!state.merchants.some((item) => item.id === input.merchantId)) return null;
    const now = new Date().toISOString();
    const created: AdminMerchantSettlement = {
      id: createId("merchant_settlement"),
      merchantId: input.merchantId,
      amount: Math.max(0, normalizeNumber(input.amount, 0)),
      currency: normalizeText(input.currency) ?? "USD",
      status: normalizeSettlementStatus(input.status),
      providerRef: normalizeText(input.providerRef),
      notes: normalizeText(input.notes),
      createdBy: input.createdBy,
      updatedBy: input.createdBy,
      createdAt: now,
      updatedAt: now,
    };
    state.merchantSettlements = [created, ...state.merchantSettlements];
    this.write(state);
    return created;
  }


  getBusinessDashboard(): AdminBusinessDashboard {
    const state = this.read();
    const businesses = state.businesses;
    const pendingSettlements = state.businessSettlements.filter((item) => item.status === "pending" || item.status === "approved").length;
    return {
      total: businesses.length,
      active: businesses.filter((item) => item.status === "active").length,
      restricted: businesses.filter((item) => item.status === "restricted" || item.status === "suspended").length,
      pendingReview: businesses.filter((item) => item.status === "pending_review").length,
      kybPending: businesses.filter((item) => item.kybStatus === "pending" || item.kybStatus === "not_started").length,
      settlementsPending: pendingSettlements,
      riskHighOrCritical: businesses.filter((item) => item.riskLevel === "high" || item.riskLevel === "critical").length,
      generatedAt: new Date().toISOString(),
    };
  }

  listBusinesses(query?: string): AdminBusinessAccount[] {
    const businesses = this.read().businesses;
    const q = normalizeText(query)?.toLowerCase();
    if (!q) return businesses;
    return businesses.filter((item) => [
      item.id,
      item.ownerUserId,
      item.legalName,
      item.businessName,
      item.username,
      item.businessType,
      item.country,
      item.city,
      item.phone,
      item.email,
      item.status,
      item.kybStatus,
      item.riskLevel,
    ].filter(Boolean).join(" ").toLowerCase().includes(q));
  }

  getBusiness(businessId: string): AdminBusinessAccount | null {
    return this.read().businesses.find((item) => item.id === businessId) ?? null;
  }

  createBusiness(input: {
    ownerUserId?: string;
    legalName?: string;
    businessName?: string;
    username?: string;
    businessType?: string;
    country?: string;
    city?: string;
    phone?: string;
    email?: string;
    status?: string;
    kybStatus?: string;
    riskLevel?: string;
    settlementStatus?: "not_configured" | "ready" | "hold";
    walletRoute?: "business_wallet" | "provider_not_configured";
    allowBusinessPay?: boolean;
    allowInvoices?: boolean;
    allowEmployeeAccess?: boolean;
    commissionPercent?: number;
    notes?: string;
    createdBy: string;
  }): AdminBusinessAccount {
    const state = this.read();
    const now = new Date().toISOString();
    const legalName = normalizeText(input.legalName) ?? normalizeText(input.businessName) ?? "Business";
    const businessName = normalizeText(input.businessName) ?? legalName;
    const created: AdminBusinessAccount = {
      id: createId("business"),
      ownerUserId: normalizeText(input.ownerUserId),
      legalName,
      businessName,
      username: normalizeText(input.username),
      businessType: normalizeText(input.businessType),
      country: normalizeText(input.country),
      city: normalizeText(input.city),
      phone: normalizeText(input.phone),
      email: normalizeText(input.email),
      status: normalizeBusinessStatus(input.status),
      kybStatus: normalizeBusinessKybStatus(input.kybStatus),
      riskLevel: normalizeBusinessRiskLevel(input.riskLevel),
      settlementStatus: input.settlementStatus === "ready" || input.settlementStatus === "hold" ? input.settlementStatus : "not_configured",
      walletRoute: input.walletRoute === "business_wallet" ? input.walletRoute : "provider_not_configured",
      allowBusinessPay: typeof input.allowBusinessPay === "boolean" ? input.allowBusinessPay : false,
      allowInvoices: typeof input.allowInvoices === "boolean" ? input.allowInvoices : false,
      allowEmployeeAccess: typeof input.allowEmployeeAccess === "boolean" ? input.allowEmployeeAccess : false,
      commissionPercent: Math.max(0, normalizeNumber(input.commissionPercent, 0)),
      notes: normalizeText(input.notes),
      createdBy: input.createdBy,
      updatedBy: input.createdBy,
      createdAt: now,
      updatedAt: now,
    };
    state.businesses = [created, ...state.businesses];
    this.write(state);
    return created;
  }

  updateBusiness(businessId: string, input: Partial<AdminBusinessAccount> & { updatedBy: string }): AdminBusinessAccount | null {
    const state = this.read();
    const index = state.businesses.findIndex((item) => item.id === businessId);
    if (index < 0) return null;
    const current = state.businesses[index];
    const updated: AdminBusinessAccount = {
      ...current,
      ownerUserId: input.ownerUserId === undefined ? current.ownerUserId : normalizeText(input.ownerUserId),
      legalName: normalizeText(input.legalName) ?? current.legalName,
      businessName: normalizeText(input.businessName) ?? current.businessName,
      username: input.username === undefined ? current.username : normalizeText(input.username),
      businessType: input.businessType === undefined ? current.businessType : normalizeText(input.businessType),
      country: input.country === undefined ? current.country : normalizeText(input.country),
      city: input.city === undefined ? current.city : normalizeText(input.city),
      phone: input.phone === undefined ? current.phone : normalizeText(input.phone),
      email: input.email === undefined ? current.email : normalizeText(input.email),
      status: normalizeBusinessStatus(input.status, current.status),
      kybStatus: normalizeBusinessKybStatus(input.kybStatus, current.kybStatus),
      riskLevel: normalizeBusinessRiskLevel(input.riskLevel, current.riskLevel),
      settlementStatus: input.settlementStatus === "ready" || input.settlementStatus === "hold" || input.settlementStatus === "not_configured" ? input.settlementStatus : current.settlementStatus,
      walletRoute: input.walletRoute === "business_wallet" || input.walletRoute === "provider_not_configured" ? input.walletRoute : current.walletRoute,
      allowBusinessPay: typeof input.allowBusinessPay === "boolean" ? input.allowBusinessPay : current.allowBusinessPay,
      allowInvoices: typeof input.allowInvoices === "boolean" ? input.allowInvoices : current.allowInvoices,
      allowEmployeeAccess: typeof input.allowEmployeeAccess === "boolean" ? input.allowEmployeeAccess : current.allowEmployeeAccess,
      commissionPercent: input.commissionPercent === undefined ? current.commissionPercent : Math.max(0, normalizeNumber(input.commissionPercent, current.commissionPercent)),
      notes: input.notes === undefined ? current.notes : normalizeText(input.notes),
      restrictionReason: "restrictionReason" in input ? normalizeText(input.restrictionReason) : current.restrictionReason,
      restrictedBy: "restrictedBy" in input ? normalizeText(input.restrictedBy) : current.restrictedBy,
      restrictedAt: "restrictedAt" in input ? normalizeText(input.restrictedAt) : current.restrictedAt,
      updatedBy: input.updatedBy,
      updatedAt: new Date().toISOString(),
    };
    state.businesses[index] = updated;
    this.write(state);
    return updated;
  }

  restrictBusiness(businessId: string, reason: string, adminId: string): AdminBusinessAccount | null {
    return this.updateBusiness(businessId, {
      status: "restricted",
      restrictionReason: normalizeText(reason) ?? "admin_review",
      restrictedBy: adminId,
      restrictedAt: new Date().toISOString(),
      updatedBy: adminId,
    });
  }

  releaseBusinessRestriction(businessId: string, adminId: string): AdminBusinessAccount | null {
    return this.updateBusiness(businessId, {
      status: "active",
      restrictionReason: undefined,
      restrictedBy: undefined,
      restrictedAt: undefined,
      updatedBy: adminId,
    });
  }

  listBusinessSettlements(businessId?: string): AdminBusinessSettlement[] {
    const settlements = this.read().businessSettlements;
    return businessId ? settlements.filter((item) => item.businessId === businessId) : settlements;
  }

  createBusinessSettlement(input: {
    businessId: string;
    amount?: number;
    currency?: string;
    status?: string;
    providerRef?: string;
    notes?: string;
    createdBy: string;
  }): AdminBusinessSettlement | null {
    const state = this.read();
    if (!state.businesses.some((item) => item.id === input.businessId)) return null;
    const now = new Date().toISOString();
    const created: AdminBusinessSettlement = {
      id: createId("business_settlement"),
      businessId: input.businessId,
      amount: Math.max(0, normalizeNumber(input.amount, 0)),
      currency: normalizeText(input.currency) ?? "USD",
      status: normalizeBusinessSettlementStatus(input.status),
      providerRef: normalizeText(input.providerRef),
      notes: normalizeText(input.notes),
      createdBy: input.createdBy,
      updatedBy: input.createdBy,
      createdAt: now,
      updatedAt: now,
    };
    state.businessSettlements = [created, ...state.businessSettlements];
    this.write(state);
    return created;
  }




  listEmergencyLocks(limit = 200): AdminEmergencyLock[] {
    const state = this.read();
    return (state.emergencyLocks ?? [])
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  getEmergencyDashboard(): AdminEmergencyDashboard {
    const locks = this.listEmergencyLocks(500);
    const active = locks.filter((lock) => lock.status === "active");
    const hasScope = (scope: AdminEmergencyLockScope) => active.some((lock) => lock.scope === "all" || lock.scope === scope);
    const activeScopes = Array.from(new Set(active.map((lock) => lock.scope)));

    return {
      activeLocks: active.length,
      releasedLocks: locks.filter((lock) => lock.status === "released").length,
      totalLocks: locks.length,
      activeScopes,
      systemLocked: hasScope("system") || hasScope("all"),
      providersLocked: hasScope("providers"),
      walletLocked: hasScope("wallet"),
      settlementsLocked: hasScope("settlements"),
      staffLocked: hasScope("staff"),
      merchantLocked: hasScope("merchant"),
      businessLocked: hasScope("business"),
      qrLocked: hasScope("qr"),
      aiLocked: hasScope("ai"),
      locks: locks.slice(0, 100),
      rules: [
        "emergency_lock_root_owner_only",
        "emergency_lock_does_not_delete_data",
        "emergency_lock_is_append_audited",
        "release_requires_owner_and_reason",
        "active_locks_block_provider_staff_merchant_business_settlement_actions",
        "scope_all_blocks_every_guarded_action",
        "targeted_locks_only_block_matching_target_type_and_id"
      ],
      generatedAt: new Date().toISOString(),
    };
  }

  createEmergencyLock(input: {
    scope?: unknown;
    title?: string;
    reason?: string;
    targetType?: string;
    targetId?: string;
    createdBy: string;
    metadata?: Record<string, unknown>;
  }): AdminEmergencyLock {
    const state = this.read();
    const now = new Date().toISOString();
    const scope = normalizeEmergencyLockScope(input.scope);
    const created: AdminEmergencyLock = {
      id: createId("emergency_lock"),
      scope,
      status: "active",
      title: input.title?.trim() || `Emergency lock: ${scope}`,
      reason: input.reason?.trim() || "Root Owner emergency restriction",
      targetType: input.targetType?.trim() || undefined,
      targetId: input.targetId?.trim() || undefined,
      createdBy: input.createdBy,
      createdAt: now,
      metadata: input.metadata,
    };

    state.emergencyLocks = [created, ...(state.emergencyLocks ?? [])].slice(0, 1000);
    this.write(state);
    return created;
  }

  releaseEmergencyLock(lockId: string, releasedBy: string, reason?: string): AdminEmergencyLock | null {
    const state = this.read();
    const index = (state.emergencyLocks ?? []).findIndex((lock) => lock.id === lockId);
    if (index < 0) return null;
    const current = state.emergencyLocks?.[index];
    if (!current) return null;
    const updated: AdminEmergencyLock = {
      ...current,
      status: "released",
      releasedBy,
      releasedAt: new Date().toISOString(),
      releaseReason: reason?.trim() || undefined,
    };
    state.emergencyLocks = [...(state.emergencyLocks ?? [])];
    state.emergencyLocks[index] = updated;
    this.write(state);
    return updated;
  }

  listOwnerConfirmations(limit = 200): AdminOwnerCriticalConfirmation[] {
    const now = Date.now();
    const state = this.read();
    let changed = false;
    const confirmations = (state.ownerConfirmations ?? []).map((item) => {
      if (item.status === "pending" && item.expiresAt && Date.parse(item.expiresAt) < now) {
        changed = true;
        return { ...item, status: "expired" as const, updatedAt: new Date().toISOString() };
      }
      return item;
    });
    if (changed) {
      state.ownerConfirmations = confirmations;
      this.write(state);
    }
    return confirmations.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
  }

  createOwnerConfirmation(input: {
    kind?: unknown;
    title?: unknown;
    description?: unknown;
    requestedBy: string;
    requestedByRole: AdminRole;
    targetType?: unknown;
    targetId?: unknown;
    riskLevel?: unknown;
    expiresAt?: unknown;
    metadata?: Record<string, unknown>;
  }): AdminOwnerCriticalConfirmation {
    const state = this.read();
    const now = new Date().toISOString();
    const created: AdminOwnerCriticalConfirmation = {
      id: createId("owner_confirmation"),
      kind: normalizeOwnerConfirmationKind(input.kind),
      status: "pending",
      title: normalizeText(input.title) ?? "Owner confirmation required",
      description: normalizeText(input.description),
      requestedBy: input.requestedBy,
      requestedByRole: input.requestedByRole,
      targetType: normalizeText(input.targetType),
      targetId: normalizeText(input.targetId),
      riskLevel: normalizeOwnerRiskLevel(input.riskLevel),
      requiredOwner: true,
      expiresAt: normalizeText(input.expiresAt),
      metadata: input.metadata,
      createdAt: now,
      updatedAt: now,
    };
    state.ownerConfirmations = [created, ...(state.ownerConfirmations ?? [])].slice(0, 1000);
    this.write(state);
    return created;
  }

  resolveOwnerConfirmation(confirmationId: string, decision: "approved" | "rejected", adminId: string, reason?: string): AdminOwnerCriticalConfirmation | null {
    const state = this.read();
    const index = (state.ownerConfirmations ?? []).findIndex((item) => item.id === confirmationId);
    if (index < 0) return null;
    const current = state.ownerConfirmations[index];
    if (current.status !== "pending") return current;
    const now = new Date().toISOString();
    const updated: AdminOwnerCriticalConfirmation = decision === "approved"
      ? { ...current, status: "approved", approvedBy: adminId, approvedAt: now, updatedAt: now }
      : { ...current, status: "rejected", rejectedBy: adminId, rejectedAt: now, rejectionReason: normalizeText(reason), updatedAt: now };
    state.ownerConfirmations[index] = updated;
    this.write(state);
    return updated;
  }

  consumeOwnerConfirmation(input: {
    confirmationId: string;
    kind?: AdminOwnerCriticalConfirmationKind;
    targetType?: string;
    targetId?: string;
    usedBy: string;
    usedForAction: string;
  }): { ok: true; confirmation: AdminOwnerCriticalConfirmation } | { ok: false; error: string; confirmation?: AdminOwnerCriticalConfirmation } {
    const state = this.read();
    const index = (state.ownerConfirmations ?? []).findIndex((item) => item.id === input.confirmationId);
    if (index < 0) return { ok: false, error: "owner_confirmation_not_found" };

    const current = state.ownerConfirmations[index];
    if (current.status !== "approved") {
      return { ok: false, error: `owner_confirmation_${current.status}`, confirmation: current };
    }

    if (current.usedAt) {
      return { ok: false, error: "owner_confirmation_already_used", confirmation: current };
    }

    if (current.expiresAt && Date.parse(current.expiresAt) < Date.now()) {
      const expired: AdminOwnerCriticalConfirmation = { ...current, status: "expired", updatedAt: new Date().toISOString() };
      state.ownerConfirmations[index] = expired;
      this.write(state);
      return { ok: false, error: "owner_confirmation_expired", confirmation: expired };
    }

    if (input.kind && current.kind !== input.kind) {
      return { ok: false, error: "owner_confirmation_kind_mismatch", confirmation: current };
    }

    if (input.targetType && current.targetType && current.targetType !== input.targetType) {
      return { ok: false, error: "owner_confirmation_target_type_mismatch", confirmation: current };
    }

    if (input.targetId && current.targetId && current.targetId !== input.targetId) {
      return { ok: false, error: "owner_confirmation_target_id_mismatch", confirmation: current };
    }

    const updated: AdminOwnerCriticalConfirmation = {
      ...current,
      usedBy: input.usedBy,
      usedAt: new Date().toISOString(),
      usedForAction: input.usedForAction,
      updatedAt: new Date().toISOString(),
    };
    state.ownerConfirmations[index] = updated;
    this.write(state);
    return { ok: true, confirmation: updated };
  }

  getOwnerSecurityCenter(ownerTokenConfigured = false, rootOwnerId = "env-admin"): AdminOwnerSecurityCenterState {
    const confirmations = this.listOwnerConfirmations(500);
    const pending = confirmations.filter((item) => item.status === "pending");
    const emergency = this.getEmergencyDashboard();
    return {
      rootOwnerId,
      rootOwnerRole: "owner",
      ownerTokenConfigured,
      pendingConfirmations: pending.length,
      approvedConfirmations: confirmations.filter((item) => item.status === "approved").length,
      rejectedConfirmations: confirmations.filter((item) => item.status === "rejected").length,
      expiredConfirmations: confirmations.filter((item) => item.status === "expired").length,
      criticalQueue: pending.filter((item) => item.riskLevel === "critical"),
      recentConfirmations: confirmations.slice(0, 100),
      requiredConfirmationKinds: [
        "provider_secret_change",
        "provider_disable",
        "provider_enable",
        "staff_role_change",
        "staff_revoke",
        "settlement_release",
        "wallet_route_change",
        "security_policy_change",
        "emergency_lock",
        "system_maintenance",
      ],
      emergencyControls: {
        providerEmergencyLock: emergency.providersLocked || emergency.systemLocked,
        walletRouteEmergencyLock: emergency.walletLocked || emergency.systemLocked,
        staffAccessEmergencyLock: emergency.staffLocked || emergency.systemLocked,
        settlementEmergencyLock: emergency.settlementsLocked || emergency.systemLocked,
      },
      rules: [
        "root_owner_is_single_source_of_final_approval",
        "critical_provider_secret_changes_require_owner_confirmation",
        "staff_role_changes_require_owner_confirmation",
        "settlement_release_requires_owner_confirmation",
        "wallet_route_changes_require_owner_confirmation",
        "all_owner_decisions_are_written_to_immutable_audit",
      ],
      generatedAt: new Date().toISOString(),
    };
  }


  private calculateFinanceDashboardFromState(state: AdminState): AdminFinanceDashboard {
    const merchantSettlements = state.merchantSettlements ?? [];
    const businessSettlements = state.businessSettlements ?? [];
    const allSettlements = [...merchantSettlements, ...businessSettlements];
    const totalGrossAmount = allSettlements.reduce((sum, item) => sum + normalizeNumber(item.amount, 0), 0);
    const paidSettlementAmount = allSettlements.filter((item) => item.status === "paid").reduce((sum, item) => sum + normalizeNumber(item.amount, 0), 0);
    const heldSettlementAmount = allSettlements.filter((item) => item.status === "held").reduce((sum, item) => sum + normalizeNumber(item.amount, 0), 0);
    const pendingSettlementAmount = allSettlements.filter((item) => item.status === "pending" || item.status === "approved").reduce((sum, item) => sum + normalizeNumber(item.amount, 0), 0);
    const currencies = Array.from(new Set(allSettlements.map((item) => item.currency || "USD"))).sort();
    const averageFeeRate = 0;
    const totalFeeAmount = Number((totalGrossAmount * averageFeeRate).toFixed(2));
    const totalNetAmount = Number((totalGrossAmount - totalFeeAmount).toFixed(2));

    return {
      totalGrossAmount,
      totalFeeAmount,
      totalNetAmount,
      pendingSettlementAmount,
      heldSettlementAmount,
      paidSettlementAmount,
      merchantSettlementCount: merchantSettlements.length,
      businessSettlementCount: businessSettlements.length,
      reportCount: (state.financeReports ?? []).length,
      currencies: currencies.length ? currencies : ["USD"],
      generatedAt: new Date().toISOString(),
    };
  }

  getFinanceDashboard(): AdminFinanceDashboard {
    return this.calculateFinanceDashboardFromState(this.read());
  }

  listFinanceReports(): AdminFinanceReport[] {
    return [...(this.read().financeReports ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  createFinanceReport(input: {
    kind?: unknown;
    title?: unknown;
    periodStart?: unknown;
    periodEnd?: unknown;
    currency?: unknown;
    notes?: unknown;
    createdBy: string;
  }): AdminFinanceReport {
    const state = this.read();
    const now = new Date().toISOString();
    const dashboard = this.calculateFinanceDashboardFromState(state);
    const currency = normalizeText(input.currency) ?? dashboard.currencies[0] ?? "USD";
    const merchantSettlements = state.merchantSettlements.filter((item) => item.currency === currency || !item.currency);
    const businessSettlements = state.businessSettlements.filter((item) => item.currency === currency || !item.currency);
    const allSettlements = [...merchantSettlements, ...businessSettlements];
    const grossAmount = allSettlements.reduce((sum, item) => sum + normalizeNumber(item.amount, 0), 0);
    const feeAmount = 0;
    const netAmount = Number((grossAmount - feeAmount).toFixed(2));
    const pendingSettlementCount = allSettlements.filter((item) => item.status === "pending" || item.status === "approved").length;
    const heldSettlementCount = allSettlements.filter((item) => item.status === "held").length;
    const paidSettlementCount = allSettlements.filter((item) => item.status === "paid").length;
    const report: AdminFinanceReport = {
      id: createId("finance_report"),
      kind: normalizeFinanceReportKind(input.kind),
      title: normalizeText(input.title) ?? `Finance report ${now.slice(0, 10)}`,
      status: "ready",
      periodStart: normalizeText(input.periodStart) ?? now.slice(0, 10),
      periodEnd: normalizeText(input.periodEnd) ?? now.slice(0, 10),
      currency,
      grossAmount,
      feeAmount,
      netAmount,
      merchantSettlementCount: merchantSettlements.length,
      businessSettlementCount: businessSettlements.length,
      paidSettlementCount,
      heldSettlementCount,
      pendingSettlementCount,
      source: "admin_file_store",
      notes: normalizeText(input.notes),
      createdBy: input.createdBy,
      updatedBy: input.createdBy,
      createdAt: now,
      updatedAt: now,
    };
    state.financeReports = [report, ...(state.financeReports ?? [])].slice(0, 500);
    this.write(state);
    return report;
  }

  exportFinanceBundle(limit = 500, exportedBy = "env-admin"): AdminFinanceExportBundle {
    const state = this.read();
    return {
      ok: true,
      exportedAt: new Date().toISOString(),
      exportedBy,
      dashboard: this.calculateFinanceDashboardFromState(state),
      reports: [...(state.financeReports ?? [])].slice(0, limit),
      merchantSettlements: [...(state.merchantSettlements ?? [])],
      businessSettlements: [...(state.businessSettlements ?? [])],
      rules: [
        "accountant_read_export_only",
        "provider_secrets_never_exported",
        "wallet_manual_money_movement_not_supported_here",
        "settlement_actions_are_audited",
      ],
    };
  }

}
