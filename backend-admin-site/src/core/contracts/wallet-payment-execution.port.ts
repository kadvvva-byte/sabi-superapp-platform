export type WalletPaymentDirection = "capture" | "refund"

export type WalletPaymentLedgerEntry = {
  walletId: string
  amount: number
  type: "DEBIT" | "CREDIT"
  operationType:
    | "PAYMENT"
    | "REFUND"
    | "MERCHANT_PAYMENT"
    | "TOPUP"
    | "QR_PAYMENT"
  uniqueOperationId: string
}

export type WalletPaymentExecutionInput = {
  paymentId: string
  providerPaymentId: string
  userId: string
  walletId: string
  amount: number
  currency: string
  direction: WalletPaymentDirection
  idempotencyKey: string
  reference?: string
  metadata?: Record<string, unknown>
}

export type WalletPaymentExecutionResult = {
  ok: true
  paymentId: string
  providerPaymentId: string
  walletId: string
  transactionId: string
  reference?: string
  amount: number
  currency: string
  status: "SUCCESS" | "REFUNDED"
  ledgerEntries: WalletPaymentLedgerEntry[]
  executedAt: string
  metadata?: Record<string, unknown>
}

export interface WalletPaymentExecutionPort {
  executePayment(
    input: WalletPaymentExecutionInput,
  ): Promise<WalletPaymentExecutionResult>
}
