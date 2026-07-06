import crypto from "crypto";
import type { AdminPermission, AdminRole } from "./admin.types";
import { getAdminRolePermissions } from "./admin.roles";

export function getAdminPanelToken(): string | null {
  const candidates = [
    process.env.ADMIN_PANEL_TOKEN,
    process.env.SABI_ADMIN_API_TOKEN,
    process.env.WALLET_PROVIDER_ADMIN_TOKEN,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (value) return value;
  }

  return null;
}

export function getAdminRole(): AdminRole {
  const value = process.env.ADMIN_PANEL_ROLE?.trim().toLowerCase();

  if (
    value === "owner" ||
    value === "root_owner" ||
    value === "manager" ||
    value === "managing_director" ||
    value === "developer" ||
    value === "programmer" ||
    value === "accountant" ||
    value === "security" ||
    value === "compliance" ||
    value === "merchant_admin" ||
    value === "business_admin" ||
    value === "admin" ||
    value === "risk" ||
    value === "support" ||
    value === "viewer"
  ) {
    if (value === "root_owner") return "owner";
    if (value === "managing_director") return "manager";
    if (value === "programmer") return "developer";
    if (value === "compliance") return "security";
    return value;
  }

  return "owner";
}

export function getAdminPermissions(role = getAdminRole()): AdminPermission[] {
  return getAdminRolePermissions(role);
}

export function getAdminStatePath(): string {
  return process.env.ADMIN_STATE_FILE?.trim() || ".data/admin/admin-state.json";
}

export function getAdminProviderConfigPath(): string {
  return process.env.ADMIN_PROVIDER_CONFIG_FILE?.trim() || ".data/admin/provider-configs.json";
}

export function isAdminWriteEnabled(): boolean {
  return process.env.ADMIN_PANEL_WRITE_ENABLED?.trim().toLowerCase() !== "false";
}

export function isProviderLiveExecutionEnabled(): boolean {
  return process.env.LIVE_PROVIDER_EXECUTION_ENABLED?.trim().toLowerCase() === "true";
}

export type AdminProviderSecretSource = "explicit_env" | "derived_admin_token" | "missing";

export function getAdminProviderSecretSource(): AdminProviderSecretSource {
  const explicit = process.env.ADMIN_PROVIDER_SECRET_KEY?.trim();
  if (explicit) return "explicit_env";

  const adminToken = getAdminPanelToken();
  if (adminToken) return "derived_admin_token";

  return "missing";
}

export function getAdminProviderSecret(): string | null {
  const explicit = process.env.ADMIN_PROVIDER_SECRET_KEY?.trim();
  if (explicit) return explicit;

  const adminToken = getAdminPanelToken();
  if (adminToken) return `derived-admin-provider-secret:${adminToken}`;

  return null;
}

export function getAdminProviderSecretFingerprint(): string | null {
  const secret = getAdminProviderSecret();
  if (!secret) return null;
  return crypto.createHash("sha256").update(secret).digest("hex").slice(0, 16);
}
