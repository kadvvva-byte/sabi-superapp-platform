import { LedgerRepository } from "../../infrastructure/ledger.repository"

export class LedgerService {

  private ledgerRepo = new LedgerRepository()

  recordTransaction(walletId: string, amount: number, type: "credit" | "debit") {

    return this.ledgerRepo.createEntry({
      from: type === "debit" ? walletId : "system",
      to: type === "credit" ? walletId : "system",
      amount,
      type
    })

  }

}