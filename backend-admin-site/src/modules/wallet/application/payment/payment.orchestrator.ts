import { TransactionEngine } from "../transaction/transaction-engine"

export class PaymentOrchestrator {

  private engine: TransactionEngine

  constructor(engine: TransactionEngine) {
    this.engine = engine
  }

  async transfer(
    fromWalletId: string,
    toWalletId: string,
    amount: number
  ) {

    if (amount <= 0) {
      throw new Error("Invalid payment amount")
    }

    const tx = await this.engine.executeTransfer(
      fromWalletId,
      toWalletId,
      amount
    )

    return {
      status: "SUCCESS",
      transaction: tx
    }

  }

}