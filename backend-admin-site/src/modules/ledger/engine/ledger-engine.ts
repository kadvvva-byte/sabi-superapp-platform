import { LedgerTransaction } from "./ledger-transaction"

export class LedgerEngine {

  async commit(transaction: LedgerTransaction) {

    const total = transaction.entries.reduce((sum, e) => {

      if (e.type === "DEBIT") return sum - e.amount
      if (e.type === "CREDIT") return sum + e.amount

      return sum

    }, 0)

    if (total !== 0) {

      throw new Error("Ledger is not balanced")

    }

    console.log("Ledger committed:", transaction)

  }

}