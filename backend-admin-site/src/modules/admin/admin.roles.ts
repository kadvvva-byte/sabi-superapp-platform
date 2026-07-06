import type {
  AdminClientPortalDefinition,
  AdminPermission,
  AdminPermissionDefinition,
  AdminRole,
  AdminRoleCategory,
  AdminRoleDefinition,
  AdminRoleMatrix,
} from "./admin.types";

export const ADMIN_PERMISSION_DEFINITIONS: AdminPermissionDefinition[] = [
  { key: "admin:read", group: "admin", riskLevel: "low" },
  { key: "admin:write", group: "admin", riskLevel: "critical" },
  { key: "roles:read", group: "admin", riskLevel: "low" },
  { key: "roles:write", group: "admin", riskLevel: "critical" },
  { key: "users:read", group: "users", riskLevel: "medium" },
  { key: "users:write", group: "users", riskLevel: "high" },
  { key: "users:restrict", group: "users", riskLevel: "high" },
  { key: "users:delete", group: "users", riskLevel: "critical" },
  { key: "wallet:read", group: "wallet", riskLevel: "high" },
  { key: "wallet:write", group: "wallet", riskLevel: "critical" },
  { key: "finance:read", group: "finance", riskLevel: "high" },
  { key: "finance:export", group: "finance", riskLevel: "high" },
  { key: "settlements:read", group: "finance", riskLevel: "high" },
  { key: "settlements:write", group: "finance", riskLevel: "critical" },
  { key: "risk:read", group: "risk", riskLevel: "medium" },
  { key: "risk:write", group: "risk", riskLevel: "high" },
  { key: "risk:restrict", group: "risk", riskLevel: "critical" },
  { key: "providers:read", group: "providers", riskLevel: "medium" },
  { key: "providers:write", group: "providers", riskLevel: "critical" },
  { key: "providers:test", group: "providers", riskLevel: "medium" },
  { key: "audit:read", group: "audit", riskLevel: "medium" },
  { key: "audit:export", group: "audit", riskLevel: "high" },
  { key: "security:read", group: "security", riskLevel: "high" },
  { key: "security:write", group: "security", riskLevel: "critical" },
  { key: "system:read", group: "system", riskLevel: "medium" },
  { key: "system:write", group: "system", riskLevel: "critical" },
  { key: "messenger:read", group: "messenger", riskLevel: "medium" },
  { key: "messenger:write", group: "messenger", riskLevel: "high" },
  { key: "developer:read", group: "developer", riskLevel: "medium" },
  { key: "developer:write", group: "developer", riskLevel: "high" },
  { key: "merchant:read", group: "merchant", riskLevel: "medium" },
  { key: "merchant:write", group: "merchant", riskLevel: "high" },
  { key: "merchant:settle", group: "merchant", riskLevel: "critical" },
  { key: "business:read", group: "business", riskLevel: "medium" },
  { key: "business:write", group: "business", riskLevel: "high" },
  { key: "business:settle", group: "business", riskLevel: "critical" },
];

const ALL_PERMISSIONS = ADMIN_PERMISSION_DEFINITIONS.map((item) => item.key);

function permissions(...items: AdminPermission[][]): AdminPermission[] {
  return Array.from(new Set(items.flat()));
}

const READ_BASE: AdminPermission[] = ["admin:read", "roles:read", "audit:read"];
const USER_READ: AdminPermission[] = ["users:read"];
const PROVIDER_READ: AdminPermission[] = ["providers:read", "providers:test"];
const RISK_BASE: AdminPermission[] = ["risk:read", "risk:write", "risk:restrict", "users:read", "users:restrict", "wallet:read", "security:read", "security:write", "audit:read"];
const FINANCE_BASE: AdminPermission[] = ["finance:read", "finance:export", "settlements:read", "wallet:read", "users:read", "audit:read"];

function role(input: {
  key: AdminRole;
  category: AdminRoleCategory;
  level: number;
  permissions: AdminPermission[];
  deniedPermissions?: AdminPermission[];
  ownerOnly?: boolean;
  clientFacing?: boolean;
  canManageRoles?: boolean;
  allowedPanels: string[];
  securityRules: string[];
}): AdminRoleDefinition {
  return {
    deniedPermissions: [],
    ownerOnly: false,
    clientFacing: false,
    canManageRoles: false,
    ...input,
    permissions: permissions(input.permissions),
  };
}

export const ADMIN_ROLE_MATRIX: AdminRoleDefinition[] = [
  role({
    key: "owner",
    category: "root",
    level: 100,
    permissions: ALL_PERMISSIONS,
    ownerOnly: true,
    canManageRoles: true,
    allowedPanels: ["dashboard", "messenger", "wallet", "providers", "users", "risk", "audit", "roles", "security", "finance", "developer", "merchant", "business"],
    securityRules: ["root_owner_only", "never_share_token", "critical_actions_owner_confirmation", "cannot_be_deleted", "secrets_masked_by_default"],
  }),
  role({
    key: "manager",
    category: "internal",
    level: 80,
    permissions: permissions(READ_BASE, USER_READ, PROVIDER_READ, ["wallet:read", "finance:read", "settlements:read", "risk:read", "risk:write", "users:restrict", "security:read", "system:read", "messenger:read", "messenger:write"]),
    deniedPermissions: ["roles:write", "providers:write", "wallet:write", "users:delete", "security:write", "system:write"],
    allowedPanels: ["dashboard", "messenger", "wallet", "providers", "users", "risk", "audit", "roles", "finance"],
    securityRules: ["cannot_view_provider_secrets", "cannot_change_owner", "cannot_delete_audit", "cannot_disable_security"],
  }),
  role({
    key: "developer",
    category: "internal",
    level: 60,
    permissions: permissions(READ_BASE, PROVIDER_READ, ["system:read", "developer:read", "developer:write", "messenger:read", "messenger:write"]),
    deniedPermissions: ["providers:write", "finance:read", "wallet:write", "roles:write", "users:delete", "settlements:write"],
    allowedPanels: ["dashboard", "messenger", "providers", "audit", "roles", "developer"],
    securityRules: ["no_real_secret_access", "logs_are_redacted", "sandbox_tests_only", "no_money_movement"],
  }),
  role({
    key: "accountant",
    category: "internal",
    level: 55,
    permissions: permissions(READ_BASE, USER_READ, FINANCE_BASE, ["settlements:write"]),
    deniedPermissions: ["providers:write", "roles:write", "risk:restrict", "security:write", "system:write", "users:delete"],
    allowedPanels: ["dashboard", "wallet", "users", "audit", "roles", "finance", "merchant", "business"],
    securityRules: ["financial_read_export_only", "no_provider_keys", "no_security_controls", "settlement_actions_audited"],
  }),
  role({
    key: "security",
    category: "internal",
    level: 65,
    permissions: permissions(READ_BASE, RISK_BASE),
    deniedPermissions: ["providers:write", "roles:write", "finance:export", "settlements:write", "system:write", "users:delete"],
    allowedPanels: ["dashboard", "messenger", "wallet", "users", "risk", "audit", "roles", "security"],
    securityRules: ["can_restrict_not_confiscate", "human_review_required", "no_provider_keys", "all_actions_audited"],
  }),
  role({
    key: "merchant_admin",
    category: "client",
    level: 30,
    permissions: ["merchant:read", "merchant:write", "merchant:settle", "finance:read", "audit:read"],
    clientFacing: true,
    deniedPermissions: ["admin:write", "roles:write", "providers:write", "users:restrict", "security:write", "business:write"],
    allowedPanels: ["merchant", "finance"],
    securityRules: ["own_merchant_only", "no_super_admin_access", "settlement_limits_required", "kyb_required"],
  }),
  role({
    key: "business_admin",
    category: "client",
    level: 30,
    permissions: ["business:read", "business:write", "business:settle", "finance:read", "audit:read"],
    clientFacing: true,
    deniedPermissions: ["admin:write", "roles:write", "providers:write", "users:restrict", "security:write", "merchant:write"],
    allowedPanels: ["business", "finance"],
    securityRules: ["own_business_only", "no_super_admin_access", "employee_permissions_required", "kyb_required"],
  }),
  role({
    key: "support",
    category: "legacy",
    level: 20,
    permissions: ["admin:read", "users:read", "risk:read"],
    deniedPermissions: ["providers:write", "roles:write", "wallet:write", "finance:export", "users:restrict", "users:delete"],
    allowedPanels: ["dashboard", "users", "risk"],
    securityRules: ["read_mostly", "no_money_movement", "no_secret_access"],
  }),
  role({
    key: "viewer",
    category: "legacy",
    level: 10,
    permissions: ["admin:read", "users:read", "wallet:read", "risk:read", "providers:read", "audit:read", "roles:read", "messenger:read"],
    deniedPermissions: ["admin:write", "roles:write", "providers:write", "wallet:write", "users:restrict", "users:delete", "security:write"],
    allowedPanels: ["dashboard", "messenger", "wallet", "providers", "users", "risk", "audit", "roles"],
    securityRules: ["read_only", "no_secret_access", "no_write_actions"],
  }),
  role({
    key: "admin",
    category: "legacy",
    level: 70,
    permissions: permissions(READ_BASE, USER_READ, PROVIDER_READ, ["users:restrict", "wallet:read", "risk:read", "risk:write", "finance:read", "system:read", "messenger:read"]),
    deniedPermissions: ["roles:write", "providers:write", "wallet:write", "users:delete", "security:write"],
    allowedPanels: ["dashboard", "messenger", "wallet", "providers", "users", "risk", "audit", "roles"],
    securityRules: ["legacy_internal_admin", "no_owner_functions", "no_provider_secret_access"],
  }),
  role({
    key: "risk",
    category: "legacy",
    level: 60,
    permissions: permissions(READ_BASE, RISK_BASE),
    deniedPermissions: ["providers:write", "roles:write", "settlements:write", "system:write", "users:delete"],
    allowedPanels: ["dashboard", "wallet", "users", "risk", "audit", "roles"],
    securityRules: ["legacy_risk_role", "can_restrict_not_confiscate", "all_actions_audited"],
  }),
];

export const ADMIN_SEPARATION_RULES = [
  "owner_is_only_root",
  "developer_cannot_view_real_provider_secrets",
  "accountant_cannot_change_security_or_provider_keys",
  "security_cannot_change_provider_keys_or_settlements",
  "manager_cannot_change_owner_or_root_settings",
  "client_admins_cannot_access_super_admin",
  "audit_logs_are_append_only",
  "critical_actions_require_owner_confirmation",
];

export const ADMIN_CLIENT_PORTALS: AdminClientPortalDefinition[] = [
  {
    key: "merchant_admin",
    ownerRole: "merchant_admin" as AdminRole,
    panels: ["merchant profile", "merchant QR/pay", "payments", "refunds", "settlements", "cashiers", "disputes"],
    securityRules: ["own_merchant_only", "kyb_required", "no_super_admin_access", "settlement_limits_required"],
  },
  {
    key: "business_admin",
    ownerRole: "business_admin" as AdminRole,
    panels: ["business wallet", "employees", "business payments", "invoices", "accounting", "kyb", "settlements"],
    securityRules: ["own_business_only", "kyb_required", "employee_permissions_required", "no_super_admin_access"],
  },
];

export function getAdminRoleDefinition(roleKey: AdminRole | string): AdminRoleDefinition | null {
  return ADMIN_ROLE_MATRIX.find((roleItem) => roleItem.key === roleKey) ?? null;
}

export function getAdminRolePermissions(roleKey: AdminRole | string): AdminPermission[] {
  return getAdminRoleDefinition(roleKey)?.permissions ?? getAdminRoleDefinition("viewer")?.permissions ?? ["admin:read"];
}

export function getAdminRoleMatrix(): AdminRoleMatrix {
  return {
    rootOwnerRole: "owner",
    roles: ADMIN_ROLE_MATRIX,
    permissions: ADMIN_PERMISSION_DEFINITIONS,
    separationRules: ADMIN_SEPARATION_RULES,
    criticalActionRules: [
      "provider_secret_change_requires_owner",
      "role_change_requires_owner",
      "wallet_route_change_requires_owner",
      "settlement_release_requires_audit",
      "security_disable_forbidden_without_owner",
    ],
    clientPortals: ADMIN_CLIENT_PORTALS,
  };
}
