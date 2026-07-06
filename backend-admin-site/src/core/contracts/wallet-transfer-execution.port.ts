export type WalletTransferLedgerEntry = {
  walletId: string
  amount: number
  type: "DEBIT" | "CREDIT"
  operationType:
    | "TRANSFER"
    | "P2P_TRANSFER"
    | "INTERNAL_TRANSFER"
    | "QR_TRANSFER"
  uniqueOperationId: string
}

export type WalletTransferExecutionInput = {
  fromWalletId: string
  toWalletId: string
  fromUserId?: string
  toUserId?: string
  amount: number
  currency: string
  idempotencyKey: string
  reference?: string
  source:
    | "p2p"
    | "wallet"
    | "qr"
    | "messenger"
    | "merchant"
    | "system"
  metadata?: Record<string, unknown>
}

export type WalletTransferExecutionResult = {
  ok: true
  transactionId: string
  fromWalletId: string
  toWalletId: string
  reference?: string
  amount: number
  currency: string
  status: "SUCCESS"
  ledgerEntries: WalletTransferLedgerEntry[]
  executedAt: string
  metadata?: Record<string, unknown>
}

export interface WalletTransferExecutionPort {
  executeTransfer(
    input: WalletTransferExecutionInput,
  ): Promise<WalletTransferExecutionResult>
}
