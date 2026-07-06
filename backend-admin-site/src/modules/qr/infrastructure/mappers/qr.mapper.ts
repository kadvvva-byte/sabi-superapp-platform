import { QrCode } from "../../domain/entities/qr-code";
import type { QrPayload } from "../../domain/value-objects/qr-payload";

type PrismaQrRecord = {
  id: string;
  type: "STATIC" | "DYNAMIC";
  payload: string;
  amount: unknown | null;
  currency: string | null;
  status: "ACTIVE" | "EXPIRED" | "DISABLED";
  usedCount: number;
  usageLimit: number | null;
  expiresAt: Date | null;
  createdAt: Date;
  rail?: string | null;
  domain?: string | null;
  payloadType?: string | null;
  reference?: string | null;
  issuer?: string | null;
  signature?: string | null;
  metadata?: unknown | null;
};

export class QrMapper {
  static toDomain(record: PrismaQrRecord): QrCode {
    const parsedPayload = JSON.parse(record.payload || "{}") as Partial<QrPayload>;

    const payload: QrPayload = {
      version: parsedPayload.version ?? "1.0",
      rail: parsedPayload.rail === "coin_wallet" ? "coin_wallet" : "sabi_wallet",
      domain: parsedPayload.domain ?? "payment",
      payloadType: (parsedPayload.payloadType ?? record.payloadType ?? "merchant_payment") as QrPayload["payloadType"],
      destinationId: parsedPayload.destinationId ?? "",
      amount: parsedPayload.amount ?? (record.amount != null ? String(record.amount) : undefined),
      currency: parsedPayload.currency ?? record.currency ?? "USD",
      reference: parsedPayload.reference ?? record.reference ?? undefined,
      issuer: parsedPayload.issuer ?? record.issuer ?? "sabi",
      createdAt: parsedPayload.createdAt ?? record.createdAt.toISOString(),
      expiresAt: parsedPayload.expiresAt ?? record.expiresAt ?? undefined,
      signature: parsedPayload.signature ?? record.signature ?? undefined,
      metadata: parsedPayload.metadata ?? (record.metadata as Record<string, unknown> | undefined),
    };

    return new QrCode(
      record.id,
      record.type,
      payload,
      record.createdAt,
      record.expiresAt ?? undefined,
      record.status,
      record.usedCount,
      record.usageLimit ?? undefined,
    );
  }

  static toCreateInput(qr: QrCode) {
    return {
      id: qr.id,
      type: qr.type,
      rail: qr.payload.rail,
      domain: qr.payload.domain,
      payloadType: qr.payload.payloadType,
      payload: JSON.stringify(qr.payload),
      amount: qr.amount ? Number(qr.amount) : undefined,
      currency: qr.currency,
      reference: qr.payload.reference,
      issuer: qr.payload.issuer,
      signature: qr.signature,
      metadata: qr.payload.metadata,
      status: qr.status,
      usedCount: qr.usedCount,
      usageLimit: qr.usageLimit,
      expiresAt: qr.expiresAt,
      createdAt: qr.createdAt,
    };
  }
}
