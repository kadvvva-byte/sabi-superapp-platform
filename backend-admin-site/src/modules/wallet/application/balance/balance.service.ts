import { LedgerEntry } from "../ledger/ledger.service"

export class BalanceService {
  calculateBalance(walletId: string, entries: LedgerEntry[]) {
    const walletEntries = entries.filter(
      e => e.walletId === walletId
    )

    const credit = walletEntries
      .filter(e => e.type === "CREDIT")
      .reduce((sum, e) => sum + e.amount, 0)

    const debit = walletEntries
      .filter(e => e.type === "DEBIT")
      .reduce((sum, e) => sum + e.amount, 0)

    return credit - debit
  }
}