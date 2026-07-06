export type LedgerEntryType = "DEBIT" | "CREDIT"

export interface LedgerEntry {

  accountId: string

  amount: number

  type: LedgerEntryType

  currency: string

}