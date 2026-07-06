import { randomUUID } from "crypto"

export type LedgerEntryType = "DEBIT" | "CREDIT"

export interface LedgerEntry {
  walletId: string
  transactionId: string
  amount: number
  type: LedgerEntryType
  operationType: string
  uniqueOperationId: string
}