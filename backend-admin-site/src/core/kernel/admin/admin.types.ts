export type AuditSeverity = "info" | "warning" | "critical";

export type AuditLogEntry = {
  id: string;
  actorUserId: string;
  action: string;
  scope: string;
  severity: AuditSeverity;
  createdAt: string;
  details?: Record<string, unknown>;
};

export type FeatureFlagDefinition = {
  key: string;
  enabled: boolean;
  description: string;
};

export type ModerationQueueItem = {
  id: string;
  targetType: string;
  targetId: string;
  reason: string;
  status: "pending" | "in_review" | "resolved";
  createdAt: string;
};

export type FraudReviewItem = {
  id: string;
  entityType: string;
  entityId: string;
  signal: string;
  severity: AuditSeverity;
  status: "pending" | "in_review" | "resolved";
  createdAt: string;
  details?: Record<string, unknown>;
};

export type ComplianceQueueKind = "kyc" | "kyb";

export type ComplianceQueueItem = {
  id: string;
  kind: ComplianceQueueKind;
  subjectUserId: string;
  subjectType: "user" | "business" | "merchant";
  reason: string;
  status: "pending" | "in_review" | "approved" | "rejected";
  createdAt: string;
  details?: Record<string, unknown>;
};

export type WalletWatchAlert = {
  id: string;
  walletOwnerUserId: string;
  walletType: "personal" | "business" | "merchant" | "coin" | "crypto";
  reason: string;
  status: "open" | "acknowledged" | "closed";
  createdAt: string;
  details?: Record<string, unknown>;
};

export type SystemOperationEntry = {
  id: string;
  operation: string;
  requestedBy: string;
  status: "queued" | "running" | "completed" | "failed";
  createdAt: string;
  details?: Record<string, unknown>;
};
