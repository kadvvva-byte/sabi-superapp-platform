import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import {
  findSabiQrFunction,
  SABI_QR_FUNCTION_CATALOG,
  SabiQrFunctionCode,
  SabiQrFunctionDefinition,
} from "../domain/constants/qr-function-catalog";

export const SABI_QR_VERSION = "QR-100" as const;

type QrTokenRequest = {
  functionCode: SabiQrFunctionCode;
  actorUserId: string;
  amount?: string | null;
  currency?: string | null;
  reference?: string | null;
  counterpartyId?: string | null;
  organizationId?: string | null;
  verifiedIdentity?: QrVerifiedIdentity | null;
  metadata?: Record<string, unknown>;
};

export type QrVerifiedIdentity = {
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  username?: string | null;
  sabiDisplayId?: string | null;
  verificationStatus?: string | null;
  profileCompleted?: boolean;
  source?: string | null;
};

export type QrTokenRecord = {
  version: typeof SABI_QR_VERSION;
  tokenId: string;
  qrValue: string;
  shortValue: string;
  functionCode: SabiQrFunctionCode;
  surface: SabiQrFunctionDefinition["surface"];
  domain: string;
  rail: string;
  mode: SabiQrFunctionDefinition["mode"];
  executionPolicy: string;
  trustState: "server_signed" | "server_validated" | "expired" | "rejected" | "provider_not_configured";
  actorUserId: string;
  amount?: string | null;
  currency?: string | null;
  reference?: string | null;
  counterpartyId?: string | null;
  organizationId?: string | null;
  verifiedIdentity?: QrVerifiedIdentity | null;
  metadata?: Record<string, string | number | boolean | null>;
  issuedAt: string;
  expiresAt: string;
  signaturePreview: string;
  signature: string;
  adminRequired: boolean;
  providerRequired: boolean;
};

const tokenStore = new Map<string, QrTokenRecord>();

function getSigningSecret(): string | null {
  const configured = process.env.QR_SIGNING_SECRET?.trim();
  if (configured) return configured;

  if (process.env.NODE_ENV !== "production") {
    return process.env.DEV_QR_SIGNING_SECRET?.trim() || "sabi-dev-qr-signing-secret-change-before-publication";
  }

  return null;
}

function normalizeText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeAmount(value: unknown): string | null {
  const text = normalizeText(value);
  if (!text) return null;
  const amount = Number(text.replace(/,/g, "."));
  if (!Number.isFinite(amount) || amount < 0) return null;
  return amount.toFixed(2);
}


function normalizeBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function normalizeVerifiedIdentity(value: unknown, actorUserId: string): QrVerifiedIdentity {
  const raw = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const identityUserId = normalizeText(raw.userId) || actorUserId;

  return {
    userId: identityUserId,
    firstName: normalizeText(raw.firstName),
    lastName: normalizeText(raw.lastName),
    displayName: normalizeText(raw.displayName),
    username: normalizeText(raw.username)?.replace(/^@+/, "") ?? null,
    sabiDisplayId: normalizeText(raw.sabiDisplayId),
    verificationStatus: normalizeText(raw.verificationStatus),
    profileCompleted: normalizeBoolean(raw.profileCompleted) ?? false,
    source: normalizeText(raw.source) ?? "verified_auth_profile",
  };
}

function sanitizeMetadata(value: unknown): Record<string, string | number | boolean | null> {
  if (!value || typeof value !== "object") return {};
  const result: Record<string, string | number | boolean | null> = {};

  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (!/^[a-zA-Z0-9_.-]{1,64}$/.test(key)) continue;
    if (typeof item === "string") result[key] = item.slice(0, 256);
    else if (typeof item === "number" && Number.isFinite(item)) result[key] = item;
    else if (typeof item === "boolean") result[key] = item;
    else if (item === null) result[key] = null;
  }

  return result;
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function validateInput(definition: SabiQrFunctionDefinition, request: QrTokenRequest): string | null {
  if (definition.requiresAmount && !normalizeAmount(request.amount)) {
    return "amount_required";
  }

  if (definition.requiresReference && !normalizeText(request.reference)) {
    return "reference_required";
  }

  if (definition.requiresCounterparty && !normalizeText(request.counterpartyId)) {
    return "counterparty_required";
  }

  if (!normalizeText(request.actorUserId)) {
    return "actor_user_id_required";
  }

  return null;
}

export function createQrToken(request: QrTokenRequest): { token?: QrTokenRecord; error?: string; status?: number; adminAction?: string } {
  const secret = getSigningSecret();
  if (!secret) {
    return {
      error: "qr_signing_secret_not_configured",
      status: 503,
      adminAction: "Set QR_SIGNING_SECRET on backend or enable ALLOW_DEV_QR_SIGNING=true for local development only.",
    };
  }

  const definition = findSabiQrFunction(request.functionCode);
  if (!definition) {
    return { error: "unknown_qr_function", status: 400 };
  }

  const inputError = validateInput(definition, request);
  if (inputError) {
    return { error: inputError, status: 400 };
  }

  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + definition.tokenTtlSeconds * 1000);
  const tokenId = `${definition.code.split("_").map((part) => part[0]?.toUpperCase() ?? "").join("")}-${randomBytes(7).toString("base64url")}`;
  const compactValue = `https://sabi.app/q/${tokenId}`;
  const signBase = [
    SABI_QR_VERSION,
    tokenId,
    definition.code,
    definition.surface,
    definition.rail,
    request.actorUserId,
    normalizeAmount(request.amount) ?? "",
    normalizeText(request.currency) ?? "",
    normalizeText(request.reference) ?? "",
    normalizeText(request.counterpartyId) ?? "",
    expiresAt.toISOString(),
  ].join("|");
  const signature = sign(signBase, secret);
  const actorUserId = normalizeText(request.actorUserId) as string;
  const verifiedIdentity = normalizeVerifiedIdentity(request.verifiedIdentity, actorUserId);
  const metadata = sanitizeMetadata({
    ...(request.metadata ?? {}),
    actorUserId,
    verifiedIdentityUserId: verifiedIdentity.userId,
    autoFilledIdentity: true,
  });

  const token: QrTokenRecord = {
    version: SABI_QR_VERSION,
    tokenId,
    qrValue: compactValue,
    shortValue: compactValue,
    functionCode: definition.code,
    surface: definition.surface,
    domain: definition.domain,
    rail: definition.rail,
    mode: definition.mode,
    executionPolicy: definition.executionPolicy,
    trustState: "server_signed",
    actorUserId,
    amount: normalizeAmount(request.amount),
    currency: normalizeText(request.currency) ?? null,
    reference: normalizeText(request.reference),
    counterpartyId: normalizeText(request.counterpartyId),
    organizationId: normalizeText(request.organizationId),
    verifiedIdentity,
    metadata,
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    signature,
    signaturePreview: signature.slice(0, 12),
    adminRequired: definition.requiresAdminProviderConfig || definition.riskLevel === "high" || definition.riskLevel === "critical",
    providerRequired: definition.requiresProvider,
  };

  tokenStore.set(tokenId, token);
  return { token };
}

export function extractQrTokenId(rawValue: unknown): string | null {
  const value = normalizeText(rawValue);
  if (!value) return null;

  const direct = value.match(/^SABIQR1:([^:]+):/i);
  if (direct?.[1]) return direct[1];

  const url = value.match(/\/q\/([^/?#]+)/i);
  if (url?.[1]) return decodeURIComponent(url[1]);

  if (/^[A-Z0-9-]{8,}$/i.test(value)) return value;
  return null;
}

export function resolveQrToken(rawValue: unknown): { token?: QrTokenRecord; definition?: SabiQrFunctionDefinition; error?: string; status?: number } {
  const tokenId = extractQrTokenId(rawValue);
  if (!tokenId) return { error: "invalid_qr_value", status: 400 };

  const token = tokenStore.get(tokenId);
  if (!token) return { error: "qr_token_not_found_or_expired_runtime", status: 404 };

  const definition = findSabiQrFunction(token.functionCode);
  if (!definition) return { error: "unknown_qr_function", status: 400 };

  return { token, definition };
}

export function validateQrToken(rawValue: unknown): { valid: boolean; token?: QrTokenRecord; definition?: SabiQrFunctionDefinition; reason?: string } {
  const resolved = resolveQrToken(rawValue);
  if (!resolved.token || !resolved.definition) {
    return { valid: false, reason: resolved.error ?? "qr_not_found" };
  }

  const secret = getSigningSecret();
  if (!secret) return { valid: false, token: resolved.token, definition: resolved.definition, reason: "qr_signing_secret_not_configured" };

  const token = resolved.token;
  if (new Date(token.expiresAt).getTime() < Date.now()) {
    return { valid: false, token: { ...token, trustState: "expired" }, definition: resolved.definition, reason: "qr_expired" };
  }

  const signBase = [
    token.version,
    token.tokenId,
    token.functionCode,
    token.surface,
    token.rail,
    token.actorUserId,
    token.amount ?? "",
    token.currency ?? "",
    token.reference ?? "",
    token.counterpartyId ?? "",
    token.expiresAt,
  ].join("|");
  const expected = sign(signBase, secret);

  if (!safeEqual(token.signature, expected)) {
    return { valid: false, token: { ...token, trustState: "rejected" }, definition: resolved.definition, reason: "qr_signature_invalid" };
  }

  return { valid: true, token: { ...token, trustState: "server_validated" }, definition: resolved.definition };
}

export function listQrTokensForActor(actorUserId: string, limit = 30): QrTokenRecord[] {
  const normalizedActor = normalizeText(actorUserId);
  if (!normalizedActor) return [];

  return Array.from(tokenStore.values())
    .filter((token) => token.actorUserId === normalizedActor || token.verifiedIdentity?.userId === normalizedActor)
    .sort((left, right) => new Date(right.issuedAt).getTime() - new Date(left.issuedAt).getTime())
    .slice(0, Math.max(1, Math.min(limit, 100)));
}

export function listQrFunctions() {
  return SABI_QR_FUNCTION_CATALOG;
}
