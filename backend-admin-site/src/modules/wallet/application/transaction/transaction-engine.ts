export class TransactionEngine {

  async executeTransfer(
    fromWalletId: string,
    toWalletId: string,
    amount: number
  ) {

    if (!fromWalletId || !toWalletId) {
      throw new Error("Wallet IDs required")
    }

    if (amount <= 0) {
      throw new Error("Invalid amount")
    }

    const transaction = {
      id: "tx_" + Date.now(),
      from: fromWalletId,
      to: toWalletId,
      amount,
      status: "SUCCESS",
      createdAt: new Date()
    }

    return transaction
  }

}