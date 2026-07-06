import { LedgerEntry } from "../entities/ledger-entry"

export interface LedgerRepository {
  create(entry: LedgerEntry): Promise<void>
}