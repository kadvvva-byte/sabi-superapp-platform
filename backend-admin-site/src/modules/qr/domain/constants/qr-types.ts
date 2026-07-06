export type QrRail = "sabi_wallet" | "coin_wallet";

export type QrDomain =
  | "payment"
  | "attendance"
  | "appointment"
  | "verification"
  | "messaging";

export type QrPayloadType =
  | "merchant_payment"
  | "user_transfer"
  | "business_invoice"
  | "business_merchant_payment"
  | "coin_send"
  | "coin_receive";

export type QrOperationStatus =
  | "created"
  | "validated"
  | "authorized"
  | "executed"
  | "failed"
  | "expired"
  | "cancelled";

export type QrRouteResolution =
  | "sabi_merchant_payment"
  | "sabi_user_transfer"
  | "business_invoice"
  | "business_merchant_payment"
  | "coin_send"
  | "coin_receive"
  | "attendance"
  | "appointment"
  | "verification"
  | "messaging";
