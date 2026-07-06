import { LedgerRepository } from "../../domain/repositories/ledger.repository"
import { randomUUID } from "crypto"

export class CreateLedgerEntryUseCase {

  constructor(private ledgerRepository: LedgerRepository) {}

  async execute(input: {
    walletId: string
    transactionId: string
    amount: number
    type: "DEBIT" | "CREDIT"
  }) {

    await this.ledgerRepository.create({
      walletId: input.walletId,
      transactionId: input.transactionId,
      amount: input.amount,
      type: input.type,
      operationType: "MANUAL",
      uniqueOperationId: randomUUID()
    })

  }

}