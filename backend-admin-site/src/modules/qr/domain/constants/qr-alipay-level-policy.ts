export type QrAlipayLevelMode =
  | "merchant_presented_static_entry"
  | "merchant_presented_dynamic_order"
  | "merchant_presented_private_order"
  | "user_presented_dynamic_code";

export type QrAlipayLevelPolicy = {
  mode: QrAlipayLevelMode;
  requiresAuthenticatedActor: boolean;
  requiresServerSignature: boolean;
  requiresIdempotencyKey: boolean;
  requiresFreshExpiry: boolean;
  requiresRiskReviewHook: boolean;
  expiresInSeconds: number;
  note: string;
};

export const QR_ALIPAY_LEVEL_POLICIES: Record<QrAlipayLevelMode, QrAlipayLevelPolicy> = {
  merchant_presented_static_entry: {
    mode: "merchant_presented_static_entry",
    requiresAuthenticatedActor: true,
    requiresServerSignature: true,
    requiresIdempotencyKey: true,
    requiresFreshExpiry: true,
    requiresRiskReviewHook: true,
    expiresInSeconds: 86400,
    note: "Static entry QR identifies merchant/business entry only. Amount and payment execution must be resolved and validated by backend before money movement.",
  },
  merchant_presented_dynamic_order: {
    mode: "merchant_presented_dynamic_order",
    requiresAuthenticatedActor: true,
    requiresServerSignature: true,
    requiresIdempotencyKey: true,
    requiresFreshExpiry: true,
    requiresRiskReviewHook: true,
    expiresInSeconds: 180,
    note: "Dynamic order QR contains order context and must expire quickly. Backend must validate signature, actor, amount, route, and risk before execution.",
  },
  merchant_presented_private_order: {
    mode: "merchant_presented_private_order",
    requiresAuthenticatedActor: true,
    requiresServerSignature: true,
    requiresIdempotencyKey: true,
    requiresFreshExpiry: true,
    requiresRiskReviewHook: true,
    expiresInSeconds: 120,
    note: "Private order QR is high risk and must support admin/risk hooks before execution when triggered by unusual actor/device/amount behavior.",
  },
  user_presented_dynamic_code: {
    mode: "user_presented_dynamic_code",
    requiresAuthenticatedActor: true,
    requiresServerSignature: true,
    requiresIdempotencyKey: true,
    requiresFreshExpiry: true,
    requiresRiskReviewHook: true,
    expiresInSeconds: 60,
    note: "User-presented QR must be short-lived, bound to authenticated user context, and never generated as a fake client-side payment credential.",
  },
};

export function getQrAlipayLevelPolicy(mode: QrAlipayLevelMode) {
  return QR_ALIPAY_LEVEL_POLICIES[mode];
}
