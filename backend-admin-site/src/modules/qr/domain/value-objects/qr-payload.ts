import type { QrDomain, QrPayloadType, QrRail } from "../constants/qr-types";

export type QrPayload = {
  version?: string;
  rail: QrRail;
  domain: QrDomain;
  payloadType: QrPayloadType;
  destinationId: string;
  amount?: string;
  currency?: string;
  reference?: string;
  issuer?: string;
  createdAt?: string;
  expiresAt?: string | Date;
  signature?: string;
  metadata?: Record<string, unknown>;
};

export function normalizeQrPayload(input: Partial<QrPayload>): QrPayload {
  return {
    version: input.version ?? "1.0",
    rail: input.rail === "coin_wallet" ? "coin_wallet" : "sabi_wallet",
    domain: input.domain ?? "payment",
    payloadType: (input.payloadType ?? "merchant_payment") as QrPayloadType,
    destinationId: input.destinationId ?? "",
    amount: input.amount,
    currency: input.currency ?? "USD",
    reference: input.reference,
    issuer: input.issuer ?? "sabi",
    createdAt: input.createdAt ?? new Date().toISOString(),
    expiresAt: input.expiresAt,
    signature: input.signature,
    metadata: input.metadata,
  };
}

export function buildQrSignatureBase(payload: QrPayload): string {
  const expiresAt =
    payload.expiresAt instanceof Date
      ? payload.expiresAt.toISOString()
      : payload.expiresAt ?? "";

  return [
    payload.version ?? "1.0",
    payload.rail,
    payload.domain,
    payload.payloadType,
    payload.destinationId,
    payload.amount ?? "",
    payload.currency ?? "",
    payload.reference ?? "",
    payload.issuer ?? "",
    payload.createdAt ?? "",
    expiresAt,
  ].join("|");
}
