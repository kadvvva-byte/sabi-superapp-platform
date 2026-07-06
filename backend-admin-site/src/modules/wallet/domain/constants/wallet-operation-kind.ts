export const WALLET_OPERATION_KIND = {
  BUSINESS_TRANSFER: "business_transfer",
  MERCHANT_PAYMENT: "merchant_payment",
  MERCHANT_SETTLEMENT: "merchant_settlement",
} as const

export type WalletOperationKind =
  (typeof WALLET_OPERATION_KIND)[keyof typeof WALLET_OPERATION_KIND]

export type WalletOperationStatus =
  | "created"
  | "completed"
  | "failed"
  | "cancelled"