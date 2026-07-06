import { LedgerEntry } from "./ledger-entry"

export interface LedgerTransaction {

  id: string

  entries: LedgerEntry[]

}