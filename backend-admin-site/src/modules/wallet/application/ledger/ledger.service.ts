export interface LedgerEntry {
  id: string
  walletId: string
  type: "DEBIT" | "CREDIT"
  amount: number
  reference: string
  createdAt: Date
}

export class LedgerService {

  private entries: LedgerEntry[] = []

  recordDebit(walletId: string, amount: number, reference: string) {

    const entry: LedgerEntry = {
      id: "ledger_" + Date.now() + "_d",
      walletId,
      type: "DEBIT",
      amount,
      reference,
      createdAt: new Date()
    }

    this.entries.push(entry)

    return entry
  }

  recordCredit(walletId: string, amount: number, reference: string) {

    const entry: LedgerEntry = {
      id: "ledger_" + Date.now() + "_c",
      walletId,
      type: "CREDIT",
      amount,
      reference,
      createdAt: new Date()
    }

    this.entries.push(entry)

    return entry
  }

  getWalletHistory(walletId: string) {

    return this.entries.filter(e => e.walletId === walletId)

  }

}