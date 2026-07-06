import type { Request, Response } from "express";

import {
  normalizeWebhookAmount,
  parseRawWebhookPayload,
  type ProviderWebhookDto,
  type ProviderWebhookStatus,
} from "./provider-webhook.dto";

function normalizeAlipayStatus(value: unknown): ProviderWebhookStatus {
  const status = String(value ?? "").toUpperCase();

  if (status === "TRADE_SUCCESS" || status === "TRADE_FINISHED" || status === "SUCCESS") {
    return "TRADE_SUCCESS";
  }

  if (status === "TRADE_CLOSED" || status === "CANCELLED" || status === "CANCELED") {
    return "TRADE_CANCELLED";
  }

  if (status === "TRADE_FAILED" || status === "FAILED" || status === "FAILURE") {
    return "TRADE_FAILED";
  }

  return "TRADE_PENDING";
}

export function parseAlipayWebhookPayload(payload: unknown): ProviderWebhookDto {
  const raw = parseRawWebhookPayload(payload);
  const providerPaymentId = String(
    raw.trade_no ??
      raw.providerPaymentId ??
      raw.paymentId ??
      raw.out_trade_no ??
      raw.id ??
      "",
  ).trim();

  return {
    providerPaymentId,
    status: normalizeAlipayStatus(raw.trade_status ?? raw.status),
    amount: normalizeWebhookAmount(raw.total_amount ?? raw.amount ?? raw.receipt_amount),
    raw,
  };
}

export function alipayWebhookHandler(req: Request, res: Response): void {
  const dto = parseAlipayWebhookPayload(req.body);

  res.status(200).json({
    ok: true,
    provider: "alipay",
    received: true,
    providerPaymentId: dto.providerPaymentId || null,
    status: dto.status,
  });
}
