export type ProviderWebhookStatus =
  | "TRADE_SUCCESS"
  | "TRADE_PENDING"
  | "TRADE_FAILED"
  | "TRADE_CANCELLED";

export type ProviderWebhookDto = {
  providerPaymentId: string;
  status: ProviderWebhookStatus;
  amount: string | number | bigint;
  raw?: unknown;
};

export function normalizeWebhookAmount(value: unknown): string {
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value).toString();
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  return "0";
}

export function parseRawWebhookPayload(payload: unknown): Record<string, unknown> {
  if (!payload) return {};

  if (Buffer.isBuffer(payload)) {
    const text = payload.toString("utf8").trim();
    if (!text) return {};

    try {
      return JSON.parse(text) as Record<string, unknown>;
    } catch {
      return Object.fromEntries(new URLSearchParams(text)) as Record<string, unknown>;
    }
  }

  if (typeof payload === "string") {
    const text = payload.trim();
    if (!text) return {};

    try {
      return JSON.parse(text) as Record<string, unknown>;
    } catch {
      return Object.fromEntries(new URLSearchParams(text)) as Record<string, unknown>;
    }
  }

  if (typeof payload === "object") {
    return payload as Record<string, unknown>;
  }

  return {};
}
