import { LedgerRepository } from "../repositories/ledger.repository"
import { randomUUID } from "crypto"

export class LedgerEngineService {

  constructor(private ledgerRepo: LedgerRepository) {}

  async createDebit(
    walletId: string,
    transactionId: string,
    amount: number,
    operationType: string
  ): Promise<void> {

    await this.ledgerRepo.create({
      walletId,
      transactionId,
      amount,
      type: "DEBIT",
      operationType,
      uniqueOperationId: randomUUID()
    })

  }

  async createCredit(
    walletId: string,
    transactionId: string,
    amount: number,
    operationType: string
  ): Promise<void> {

    await this.ledgerRepo.create({
      walletId,
      transactionId,
      amount,
      type: "CREDIT",
      operationType,
      uniqueOperationId: randomUUID()
    })

  }

}