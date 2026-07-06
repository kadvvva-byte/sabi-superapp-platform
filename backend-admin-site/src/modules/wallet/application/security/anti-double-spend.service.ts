export class AntiDoubleSpendService {

  private processedTransactions = new Set<string>()

  verify(transactionId: string): void {

    if (this.processedTransactions.has(transactionId)) {
      throw new Error("Double spend detected")
    }

    this.processedTransactions.add(transactionId)
  }

}