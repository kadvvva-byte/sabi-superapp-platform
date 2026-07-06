import { LedgerEntry } from "../ledger/ledger.service"

export class TransactionHistoryService {

  getWalletTransactions(
    walletId: string,
    entries: LedgerEntry[]
  ) {

    return entries
      .filter(e => e.walletId === walletId)
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime()
      })

  }

  getRecentTransactions(
    walletId: string,
    entries: LedgerEntry[],
    limit: number = 10
  ) {

    const tx = this.getWalletTransactions(walletId, entries)

    return tx.slice(0, limit)

  }

}