import { TransactionEngineService } from "../../../wallet/application/services/transaction-engine.service"

export class P2PTransferService {

  private engine = new TransactionEngineService()

  async transfer(
    fromWalletId: string,
    toWalletId: string,
    amount: number
  ) {

    const result = await this.engine.transfer(
      fromWalletId,
      toWalletId,
      amount
    )

    return {
      success: true,
      transactionId: result.transaction.id
    }
  }
}