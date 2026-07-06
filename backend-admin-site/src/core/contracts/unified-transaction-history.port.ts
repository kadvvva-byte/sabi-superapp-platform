export type UnifiedTransactionHistoryKind =
  | "deposit"
  | "withdraw"
  | "transfer"
  | "p2p_sent"
  | "p2p_received"
  | "qr_payment"
  | "merchant_payment"
  | "settlement"
  | "refund"
  | "topup"
  | "wallet_operation"

export type UnifiedTransactionHistoryRecord = {
  id: string
  kind: UnifiedTransactionHistoryKind
  status: string
  amount: number
  currency: string
  createdAt: string
  transactionId?: string
  walletId?: string
  reference?: string
  sourceModule: "wallet" | "payments" | "p2p" | "qr" | "wallet-core"
  counterparty?: {
    userId?: string
    walletId?: string
    displayName?: string
  }
  messageId?: string
  metadata?: Record<string, unknown>
}

export type UnifiedTransactionHistoryQuery = {
  userId?: string
  walletId?: string
  kind?: UnifiedTransactionHistoryKind
  status?: string
  cursor?: string
  limit?: number
}

export type UnifiedTransactionHistoryResult = {
  items: UnifiedTransactionHistoryRecord[]
  nextCursor?: string
}

export interface UnifiedTransactionHistoryPort {
  getHistory(
    query: UnifiedTransactionHistoryQuery,
  ): Promise<UnifiedTransactionHistoryResult>
}
