import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getAdminProviderConfigPath, getAdminProviderSecret, getAdminProviderSecretFingerprint, getAdminProviderSecretSource } from "./admin.config";
import type {
  AdminProviderPersistedConfig,
  AdminProviderPublicConfig,
  AdminProviderState,
  AdminProviderTestResult,
  AdminSecretMigrationResult,
  AdminSecretSecurityState,
} from "./admin.types";

const DEFAULT_STATE: AdminProviderState = {
  providers: [],
};

const SECRET_PREFIX = "enc:v1:";

function isEncryptedSecretValue(value: string): boolean {
  return value.startsWith(SECRET_PREFIX);
}

function createCipherKey(): Buffer {
  const secret = getAdminProviderSecret();
  if (!secret) {
    throw new Error("admin_provider_secret_not_configured");
  }

  return crypto.createHash("sha256").update(secret).digest();
}

function encryptValue(value: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", createCipherKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${SECRET_PREFIX}${Buffer.concat([iv, tag, encrypted]).toString("base64")}`;
}

function decryptValue(value: string): string {
  if (!value.startsWith(SECRET_PREFIX)) return value;
  const payload = Buffer.from(value.slice(SECRET_PREFIX.length), "base64");
  const iv = payload.subarray(0, 12);
  const tag = payload.subarray(12, 28);
  const encrypted = payload.subarray(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", createCipherKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

function maskSecret(value: string | undefined): string {
  if (!value) return "";

  try {
    const plain = decryptValue(value);
    if (plain.length <= 6) return "******";
    return `${plain.slice(0, 2)}${"*".repeat(Math.min(plain.length - 4, 12))}${plain.slice(-2)}`;
  } catch {
    return "********";
  }
}

function normalizeFields(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};
  const output: Record<string, string> = {};

  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (typeof item === "string") output[key] = item;
    else if (item !== null && item !== undefined) output[key] = String(item);
  }

  return output;
}

function isKeepSecretPlaceholder(value: string): boolean {
  const normalized = value.trim();
  return normalized === "" || normalized === "********" || normalized.includes("***");
}

export class AdminProviderConfigStore {
  private readonly filePath: string;

  constructor(filePath = getAdminProviderConfigPath()) {
    this.filePath = path.resolve(process.cwd(), filePath);
  }

  read(): AdminProviderState {
    try {
      if (!fs.existsSync(this.filePath)) return { ...DEFAULT_STATE, providers: [] };
      const raw = fs.readFileSync(this.filePath, "utf8");
      const parsed = JSON.parse(raw) as Partial<AdminProviderState>;
      return { providers: Array.isArray(parsed.providers) ? parsed.providers : [] };
    } catch {
      return { ...DEFAULT_STATE, providers: [] };
    }
  }

  write(state: AdminProviderState): void {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify(state, null, 2), "utf8");
  }

  list(): AdminProviderPersistedConfig[] {
    return this.read().providers;
  }

  get(key: string): AdminProviderPersistedConfig | null {
    return this.read().providers.find((provider) => provider.key === key) ?? null;
  }

  getPublic(key: string): AdminProviderPublicConfig | null {
    const config = this.get(key);
    return config ? this.toPublic(config) : null;
  }

  toPublic(config: AdminProviderPersistedConfig): AdminProviderPublicConfig {
    const maskedSecrets: Record<string, string> = {};

    for (const [key, value] of Object.entries(config.secretFields)) {
      maskedSecrets[key] = maskSecret(value);
    }

    return {
      ...config,
      fields: { ...config.fields },
      secretFields: maskedSecrets,
    };
  }

  upsert(input: {
    key: string;
    enabled?: boolean;
    fields?: Record<string, unknown>;
    secretFields?: Record<string, unknown>;
    notes?: string;
    adminId: string;
  }): AdminProviderPersistedConfig {
    const state = this.read();
    const now = new Date().toISOString();
    const index = state.providers.findIndex((provider) => provider.key === input.key);
    const previous = index >= 0 ? state.providers[index] : null;
    const nextSecretFields: Record<string, string> = { ...(previous?.secretFields ?? {}) };

    for (const [key, rawValue] of Object.entries(normalizeFields(input.secretFields))) {
      if (isKeepSecretPlaceholder(rawValue)) continue;
      nextSecretFields[key] = encryptValue(rawValue);
    }

    const next: AdminProviderPersistedConfig = {
      key: input.key,
      enabled: typeof input.enabled === "boolean" ? input.enabled : previous?.enabled ?? false,
      fields: {
        ...(previous?.fields ?? {}),
        ...normalizeFields(input.fields),
      },
      secretFields: nextSecretFields,
      notes: typeof input.notes === "string" ? input.notes : previous?.notes,
      createdBy: previous?.createdBy ?? input.adminId,
      updatedBy: input.adminId,
      createdAt: previous?.createdAt ?? now,
      updatedAt: now,
      lastTest: previous?.lastTest,
    };

    if (index >= 0) state.providers[index] = next;
    else state.providers = [next, ...state.providers];

    this.write(state);
    return next;
  }

  setEnabled(key: string, enabled: boolean, adminId: string): AdminProviderPersistedConfig {
    const existing = this.get(key);
    return this.upsert({
      key,
      enabled,
      fields: existing?.fields ?? {},
      secretFields: {},
      notes: existing?.notes,
      adminId,
    });
  }

  setLastTest(key: string, result: AdminProviderTestResult, adminId: string): AdminProviderPersistedConfig {
    const state = this.read();
    const index = state.providers.findIndex((provider) => provider.key === key);
    const now = new Date().toISOString();

    const next: AdminProviderPersistedConfig =
      index >= 0
        ? { ...state.providers[index], lastTest: result, updatedAt: now, updatedBy: adminId }
        : {
            key,
            enabled: false,
            fields: {},
            secretFields: {},
            createdBy: adminId,
            updatedBy: adminId,
            createdAt: now,
            updatedAt: now,
            lastTest: result,
          };

    if (index >= 0) state.providers[index] = next;
    else state.providers = [next, ...state.providers];

    this.write(state);
    return next;
  }

  delete(key: string): boolean {
    const state = this.read();
    const nextProviders = state.providers.filter((provider) => provider.key !== key);
    const deleted = nextProviders.length !== state.providers.length;
    state.providers = nextProviders;
    this.write(state);
    return deleted;
  }

  getSecretSecurityState(): AdminSecretSecurityState {
    const providers = this.list();
    let providersWithSecrets = 0;
    let totalSecretFields = 0;
    let encryptedSecretFields = 0;
    let legacyPlainSecretFields = 0;
    let unreadableSecretFields = 0;

    for (const provider of providers) {
      const entries = Object.entries(provider.secretFields ?? {}).filter(([, value]) => Boolean(value));
      if (entries.length > 0) providersWithSecrets += 1;
      totalSecretFields += entries.length;

      for (const [, value] of entries) {
        if (isEncryptedSecretValue(value)) {
          encryptedSecretFields += 1;
          try {
            decryptValue(value);
          } catch {
            unreadableSecretFields += 1;
          }
        } else {
          legacyPlainSecretFields += 1;
        }
      }
    }

    const secretKeySource = getAdminProviderSecretSource();
    const secretKeyConfigured = secretKeySource !== "missing";
    const explicitKey = secretKeySource === "explicit_env";
    const liveSafe = secretKeyConfigured && explicitKey && unreadableSecretFields === 0 && legacyPlainSecretFields === 0;

    return {
      encryptedAtRest: true,
      algorithm: "aes-256-gcm",
      secretKeyConfigured,
      secretKeySource,
      secretFingerprint: getAdminProviderSecretFingerprint(),
      publicRevealSupported: false,
      liveSafe,
      totalProviders: providers.length,
      providersWithSecrets,
      totalSecretFields,
      encryptedSecretFields,
      legacyPlainSecretFields,
      unreadableSecretFields,
      rules: [
        {
          key: "provider_secrets_never_return_plaintext",
          severity: "info",
          ok: true,
        },
        {
          key: "provider_secrets_encrypted_at_rest",
          severity: legacyPlainSecretFields > 0 ? "critical" : "info",
          ok: legacyPlainSecretFields === 0,
        },
        {
          key: "explicit_admin_provider_secret_required_before_live",
          severity: explicitKey ? "info" : "warning",
          ok: explicitKey,
        },
        {
          key: "encrypted_secrets_must_be_decryptable",
          severity: unreadableSecretFields > 0 ? "critical" : "info",
          ok: unreadableSecretFields === 0,
        },
        {
          key: "staff_never_sees_provider_secret_values",
          severity: "info",
          ok: true,
        },
      ],
      generatedAt: new Date().toISOString(),
    };
  }

  migrateLegacyPlainSecrets(adminId: string): AdminSecretMigrationResult {
    const state = this.read();
    let migratedProviders = 0;
    let migratedSecretFields = 0;
    let skippedEncryptedSecretFields = 0;
    let unreadableSecretFields = 0;
    const now = new Date().toISOString();

    state.providers = state.providers.map((provider) => {
      let changed = false;
      const nextSecretFields: Record<string, string> = {};

      for (const [field, value] of Object.entries(provider.secretFields ?? {})) {
        if (!value) continue;

        if (isEncryptedSecretValue(value)) {
          skippedEncryptedSecretFields += 1;
          try {
            decryptValue(value);
          } catch {
            unreadableSecretFields += 1;
          }
          nextSecretFields[field] = value;
          continue;
        }

        nextSecretFields[field] = encryptValue(value);
        migratedSecretFields += 1;
        changed = true;
      }

      if (!changed) return provider;
      migratedProviders += 1;
      return {
        ...provider,
        secretFields: nextSecretFields,
        updatedBy: adminId,
        updatedAt: now,
      };
    });

    if (migratedSecretFields > 0) this.write(state);

    return {
      migratedProviders,
      migratedSecretFields,
      skippedEncryptedSecretFields,
      unreadableSecretFields,
      generatedAt: now,
    };
  }

  rotateSecretFields(input: { key: string; secretFields: Record<string, unknown>; adminId: string }): AdminProviderPersistedConfig | null {
    const normalized = normalizeFields(input.secretFields);
    if (Object.keys(normalized).length === 0) return this.get(input.key);

    const existing = this.get(input.key);
    if (!existing) return null;

    return this.upsert({
      key: input.key,
      enabled: existing.enabled,
      fields: existing.fields,
      secretFields: normalized,
      notes: existing.notes,
      adminId: input.adminId,
    });
  }

  clearSecretFields(key: string, fields: string[], adminId: string): AdminProviderPersistedConfig | null {
    const state = this.read();
    const index = state.providers.findIndex((provider) => provider.key === key);
    if (index < 0) return null;

    const provider = state.providers[index];
    const nextSecretFields = { ...(provider.secretFields ?? {}) };
    const fieldsToRemove = fields.length > 0 ? fields : Object.keys(nextSecretFields);
    for (const field of fieldsToRemove) delete nextSecretFields[field];

    const next: AdminProviderPersistedConfig = {
      ...provider,
      secretFields: nextSecretFields,
      updatedBy: adminId,
      updatedAt: new Date().toISOString(),
    };
    state.providers[index] = next;
    this.write(state);
    return next;
  }

  resolvePlainFields(key: string): { fields: Record<string, string>; secretFields: Record<string, string> } | null {
    const config = this.get(key);
    if (!config) return null;

    const secretFields: Record<string, string> = {};
    for (const [field, value] of Object.entries(config.secretFields)) {
      secretFields[field] = decryptValue(value);
    }

    return {
      fields: { ...config.fields },
      secretFields,
    };
  }
}
